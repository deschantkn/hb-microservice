import HttpError from '../helpers/errorHandler';
import JWTHelper from '../helpers/jwtHelper';

/**
 * @class TokenValidator
 * @description Token validation related middleware
 */
class TokenValidator {
  /**
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Function|HttpError} next calls the next middleware in the route or an HTTP error
   */
  static async withToken(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = JWTHelper.verifyToken(token);
        next();
      } catch (error) {
        return HttpError.sendErrorResponse(
          { statusCode: 401, message: 'Token is invalid' },
          res,
        );
      }
    }

    return HttpError.sendErrorResponse(
      { statusCode: 401, message: 'Token is missing' },
      res,
    );
  }
}

export default TokenValidator;
