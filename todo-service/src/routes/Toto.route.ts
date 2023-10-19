import express from 'express';
const router = express.Router();

import TodoController from '../controllers/Todo.controller';
import AuthMiddle from '../middlewares/Auth.mid';

router.get('/', AuthMiddle.verify, TodoController.get);

router.get('/:id', TodoController.getById);

router.post('/', AuthMiddle.verify, TodoController.post);

router.put('/', AuthMiddle.verify, TodoController.put);

router.delete('/:id', AuthMiddle.verify, TodoController.delete);

export default router;
