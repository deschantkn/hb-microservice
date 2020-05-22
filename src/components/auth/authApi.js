import { Router } from 'express';
import AuthContoller from './authController';

const router = Router();

router.post('/login', AuthContoller.login);

export default router;
