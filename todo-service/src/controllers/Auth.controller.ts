import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { validate } from "class-validator";

import UserService from "../services/User.service";
import { checkPassword, hashPassword } from "../models/User";
import JWT_SECRET from "../configs/auth.config";

class AuthController {
    constructor() {

    }

    // User login with username and password
    static async login(req: Request, res: Response) {
        const { username, password } = req.body;
        // Check exist name and password
        if (!(username && password)) {
            return res.status(400).send({
                error: 'Username or password is empty'
            })
        }

        let user = await UserService.findByUsername(username);
        // Not found user
        if (!user) {
            return res.status(401).send({
                error: 'Invalid username'
            })
        }

        // Valid password
        if (!(await checkPassword(password, user.password))) {
            return res.status(401).send({
                error: 'Invalid password'
            })
        }

        // Generate accessToken and send to user
        const accessToken = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.send({
            accessToken: accessToken
        })
    }

    // User change password
    static async changePassword(req: Request, res: Response) {
        // Get user id from jwt middleware
        const userId = res.locals.jwtPayload.userId;

        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send({ error: 'Invalid data' })
        }

        // Check existed user
        let user = await UserService.findById(userId);
        if (!user) {
            return res.status(401).send({
                error: 'Unauthorized user'
            });
        }

        // Validate old password
        if (!(await checkPassword(oldPassword, user.password))) {
            return res.status(401).send({ error: 'Invalid old password' });
        }

        // Validate new password
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        // Encrypt password and update to database
        let encryptedPassword = await hashPassword(newPassword);
        UserService.update(userId, { password: encryptedPassword })
            .then(_ => {
                return res.status(204).send();
            });
    }
}

export default AuthController;