import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

import TokenValidator from './middleware/TokenValidator';
import HttpError from './helpers/errorHandler';
import { authApi } from './components/auth';
import { jsonApi } from './components/jsonPatcher';
import { thumbnailApi } from './components/thumbnail';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authApi);
app.use('/api/json', TokenValidator.withToken, jsonApi);
app.use('/api/thumbnail', TokenValidator.withToken, thumbnailApi);

// Catch all unhandled routes
app.use('*', (_, res) => {
  return HttpError.sendErrorResponse(
    { statusCode: 404, error: 'Not Found' },
    res,
  );
});

export default app;
