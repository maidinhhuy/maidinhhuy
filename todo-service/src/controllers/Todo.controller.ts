import { NextFunction } from "express";
import { Request, Response } from "express";
import TodoService from "../services/Todo.service";

class TodoController {
    constructor() {

    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.jwtPayload
            res.json(await TodoService.findAllByUserId(userId));
        } catch (err) {
            next(err);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.jwtPayload
            res.json(await TodoService.findOne(parseInt(req.params.id), userId));
        } catch (err) {
            next(err);
        }
    }

    static async post(req: Request, res: Response, next: NextFunction) {
        const { userId } = res.locals.jwtPayload
        let todo = req.body
        todo.userId = userId
        try {
            await TodoService.create(todo)
            res.status(201).send();
        } catch (err) {
            next(err);
        }
    }


    static async put(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.jwtPayload
            let todo = req.body
            todo.userId = userId
            res.json(await TodoService.update(todo));
        } catch (err) {
            next(err);
        }
    }


    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.jwtPayload
            res.json(await TodoService.delete(parseInt(req.params.id), userId));
        } catch (err) {
            next(err);
        }
    }
}

export default TodoController;