import type { Request, Response, NextFunction } from 'express';
import type { ObjectSchema } from 'joi';
import { ApiError } from '../utils/apiError.js';

interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validation middleware using Joi schemas
 */
export const validate = (schema: ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors: ValidationError[] = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));

      throw new ApiError(422, 'Validation failed', errors);
    }

    req.body = value;
    next();
  };
};
