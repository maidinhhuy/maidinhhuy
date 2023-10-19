import express, { Express, Request, Response } from 'express';
const router = express.Router();

import UserController from '../controllers/User.controller';
import AuthMiddle from '../middlewares/Auth.mid';

router.get('/', UserController.getAll);

router.get('/:id', UserController.getOneById);

router.post('/register', UserController.create);

router.put('/', AuthMiddle.verify, UserController.update);

router.delete('/', AuthMiddle.verify, UserController.delete);


export default router;
