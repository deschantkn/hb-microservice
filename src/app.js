import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

import { authApi } from './components/auth';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authApi);

export default app;
