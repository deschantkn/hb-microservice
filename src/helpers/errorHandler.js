/**
 * @class HttpError
 * @description Central HTTP error handler
 */
class HttpError {
  static sendErrorResponse({ statusCode, message }, res) {
    const code = statusCode || 500;

    return res.status(code).json({
      success: false,
      message,
    });
  }
}

export default HttpError;
