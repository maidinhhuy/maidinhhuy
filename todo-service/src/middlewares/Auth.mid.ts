import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import JWT_SECRET from "../configs/auth.config";
import User from "../models/User";
import UserService from "../services/User.service";

class AuthMiddle {
    constructor() {
        
    }

    static verify(req: Request, res: Response, next: NextFunction): void {
        // Get jwt token string from header
        const accessToken = req.headers['authorization'] as string        
        let jwtPayload: JwtPayload;
        try {
            jwtPayload = jwt.verify(accessToken, JWT_SECRET) as JwtPayload;
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            // Token invalid, response with 401 to user
            res.status(401).send();
            return;
        }

        // Token is valid send new token 
        const {userId, username} = jwtPayload;
        const newToken = jwt.sign({userId, username}, JWT_SECRET, {expiresIn: '1h'});
        res.setHeader('authorization', newToken);
        // Next middleware or controller
        next();
    }

    static async checkRole(req: Request, res: Response, next: NextFunction) {
        // Get user id from verify
        const userId = res.locals.jwtPayload.userId;
        const roles = res.locals.jwtPayload.roles as Array<string>;

        // Get role by user
        let user = await UserService.findById(userId);
        if (!!user || roles.indexOf(user.role) !== -1) {
            next();
        } else {
            res.status(401).send();
        }
    }
}

export default AuthMiddle