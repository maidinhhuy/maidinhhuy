import express from 'express';
const router = express.Router();

import AuthController from '../controllers/Auth.controller'
import AuthMiddle from '../middlewares/Auth.mid';

router.post('/login', AuthController.login);

router.put('/password', AuthMiddle.verify, AuthController.changePassword);


export default router;
