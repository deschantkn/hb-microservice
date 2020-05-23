import winston from '../config/winston';

/**
 * @class HttpError
 * @description Central HTTP error handler
 */
class HttpError {
  static sendErrorResponse({ statusCode, error }, req, res) {
    const code = statusCode || 500;
    winston.error(
      `${code} - ${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    return res.status(code).json({ sucess: false, error });
  }
}

export default HttpError;
