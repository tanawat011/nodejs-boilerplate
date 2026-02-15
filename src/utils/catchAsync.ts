import type { Request, Response, NextFunction } from 'express';

/**
 * Wrap async route handlers to automatically catch errors
 * and forward them to Express error handling middleware.
 */
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
