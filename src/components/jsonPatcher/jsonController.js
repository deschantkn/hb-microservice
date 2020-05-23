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
  static applyPatch(req, res) {
    const { json, patch } = req.body;
    const validationErrors = jsonPatch.validate(patch, json);

    if (validationErrors) {
      return HttpError.sendErrorResponse(
        {
          statusCode: 400,
          error: validationErrors,
        },
        req,
        res,
      );
    }

    const patchedObject = jsonPatch.applyPatch(json, patch).newDocument;
    return res.status(200).json({ data: patchedObject });
  }
}

export default JSONPatchController;
