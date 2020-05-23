import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import RequestValidator from './middleware/RequestValidator';
import TokenValidator from './middleware/TokenValidator';
import HttpError from './helpers/errorHandler';
import winston from './config/winston';
import swaggerUi from 'swagger-ui-express';
import { authApi } from './components/auth';
import { jsonApi } from './components/jsonPatcher';
import { thumbnailApi } from './components/thumbnail';

dotenv.config();

const app = express();
const validateBody = RequestValidator.validateBody();
const swaggerDocument = require('../swagger.json');

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', validateBody, authApi);
app.use('/api/json', TokenValidator.withToken, validateBody, jsonApi);
app.use('/api/thumbnail', TokenValidator.withToken, validateBody, thumbnailApi);
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);

// Catch all unhandled routes
app.use('*', (req, res) => {
  return HttpError.sendErrorResponse(
    { statusCode: 404, error: 'Not Found' },
    req,
    res,
  );
});

export default app;
