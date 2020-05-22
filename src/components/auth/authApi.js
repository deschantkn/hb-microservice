import express from 'express';
import AuthContoller from './authController';

const router = express.Router();

router.post('/login', AuthContoller.login);

export default router;
