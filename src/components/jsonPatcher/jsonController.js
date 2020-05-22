import * as jsonPatch from 'fast-json-patch';

import HttpError from '../../helpers/errorHandler';

/**
 * @class JSONPatchController
 * @description Handles all JSON patching related business logic
 */
class JSONPatchController {
  /**
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Responds with patched JSON object
   */
  static async applyPatch(req, res) {
    const { json, patch } = req.body;

    if (!json || !patch) {
      return HttpError.sendErrorResponse({
        statusCode: 400,
        message: 'JSON object or JSON Patch object missing',
        res,
      });
    }

    const validationErrors = jsonPatch.validate(patch, json);

    if (!validationErrors) {
      const patchedObject = jsonPatch.applyPatch(json, patch).newDocument;
      return res.status(200).json({ data: patchedObject });
    }

    return HttpError.sendErrorResponse(
      {
        statusCode: 400,
        error: validationErrors,
      },
      res,
    );
  }
}

export default JSONPatchController;
