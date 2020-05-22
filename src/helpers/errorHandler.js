/**
 * @class HttpError
 * @description Central HTTP error handler
 */
class HttpError {
  static sendErrorResponse({ statusCode, error }, res) {
    return res.status(statusCode).json({
      error,
    });
  }
}

export default HttpError;
