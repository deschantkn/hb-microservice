import _ from 'lodash';

import Schemas from '../helpers/validationSchemas';
import HttpError from '../helpers/errorHandler';

/**
 * @class RequestValidator
 * @description Request validation middleware
 */
class RequestValidator {
  static validateBody() {
    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'patch'];

    // Joi validation options
    const _validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    // return the validation middleware
    return (req, res, next) => {
      const route = req.path;
      const method = req.method.toLowerCase();

      if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
        // get schema for the current route
        const _schema = _.get(Schemas, route);

        if (_schema) {
          // Validate req.body using the schema and validation options
          const validated = _schema.validate(req.body, _validationOptions);

          if (validated.error) {
            const joiError = {
              original: validated.error._original,

              // fetch only message and type from each error
              details: _.map(validated.error.details, ({ message, type }) => ({
                message: message.replace(/['"]/g, ''),
                type,
              })),
            };

            return HttpError.sendErrorResponse(
              { statusCode: 400, error: joiError },
              req,
              res,
            );
          }

          req.body = validated.value;
          return next();
        }
      }

      return next();
    };
  }
}

export default RequestValidator;
