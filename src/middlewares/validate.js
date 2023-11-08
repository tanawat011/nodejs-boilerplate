import { ApiError } from '../utils/apiError.js';

/**
 * Validation middleware using Joi schemas
 * @param {Object} schema - Joi validation schema
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));

      throw new ApiError(422, 'Validation failed', errors);
    }

    req.body = value;
    next();
  };
};
