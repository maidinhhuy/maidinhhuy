import { Request, Response } from "express";
import UserService from "../services/User.service";
import { validate } from "class-validator";
import { checkPassword, hashPassword } from "../models/User";

export default class UserController {
    constructor() {

    }

    static async getAll(req: Request, res: Response) {
        UserService.findAll()
            .then(result => {
                res.send(result)
            });
    }

    static async getOneById(req: Request, res: Response) {
        UserService.findById(parseInt(req.params.id))
            .then(result => {
                result.password = undefined
                res.send(result)
            })
    }

    static async create(req: Request, res: Response) {
        let user = req.body
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        user.password = await hashPassword(user.password);

        UserService.create(user)
            .then(result => {
                if (result) {
                    res.status(201).send({ message: 'Created user' });
                } else {
                    res.status(400).send({ error: 'Username existed' });
                }
            })
    }

    static async update(req: Request, res: Response) {
        const userId = res.locals.jwtPayload.userId;

        const { firstName, lastName } = req.body;
        const user = await UserService.findById(userId);

        if (!user) {
            res.status(401).send();
            return;
        }

        user.firstName = firstName;
        user.lastName = lastName;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        UserService.update(user.id, { firstName, lastName })
            .then(result => {
                res.status(204).send();
            });
    }

    static async delete(req: Request, res: Response) {
        const { password } = req.body;
        const {username} = res.locals.jwtPayload
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

        // Remove user
        UserService.delete(user.id)
            .then(_ => {
                return res.status(204).send()
            })
    }
}