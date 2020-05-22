import jwt from 'jsonwebtoken';

/**
 * @class JWTHelper
 * @description Handles signing and verifying JWT tokens
 */
class JWTHelper {
  /**
   * @param {String} username Arbitrary username
   * @returns {String} signed JSON Web Token
   */
  static signToken(username) {
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  /**
   * @param {String} token JSON Web Token
   * @returns {Object} decoded JWT payload
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

export default JWTHelper;
