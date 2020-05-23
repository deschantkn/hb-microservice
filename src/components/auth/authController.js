import JWTHelper from '../../helpers/jwtHelper';
import HttpError from '../../helpers/errorHandler';

/**
 * @class AuthController
 * @description Handles all auth related business logic
 */
class AuthContoller {
  /**
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Responds with JWT auth token
   */
  static login(req, res) {
    const { username, password } = req.body;

    if (!username && !password) {
      return HttpError.sendErrorResponse(
        { statusCode: 400, error: 'username and password reqired' },
        req,
        res,
      );
    }

    const token = JWTHelper.signToken(username);
    return res.status(200).json({ data: { token } });
  }
}

export default AuthContoller;
