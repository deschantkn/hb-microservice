import path from 'path';
import Jimp from 'jimp';
import HttpError from '../../helpers/errorHandler';

/**
 * @class JSONPatchController
 * @description Handles all JSON patching related business logic
 */
class ThumbnailController {
  /**
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Responds with patched JSON object
   */
  static async generateThumbnail(req, res) {
    const { imgUrl } = req.body;

    try {
      const originalImage = await Jimp.read(imgUrl);

      return originalImage
        .resize(50, 50)
        .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          res.set('Content-Type', Jimp.MIME_JPEG);
          res.send(buffer);
        });
    } catch (e) {
      return HttpError.sendErrorResponse(
        { statusCode: 400, error: e },
        req,
        res,
      );
    }
  }
}

export default ThumbnailController;
