import type { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, {
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...('errors' in err && (err as ApiError).errors.length > 0 && { errors: (err as ApiError).errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
