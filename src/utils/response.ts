import type { Response } from 'express';

interface SuccessResponseBody {
  success: true;
  message: string;
  data: unknown;
}

interface PaginatedResponseBody {
  success: true;
  data: unknown[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Send a success response
 */
export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown,
): void => {
  const body: SuccessResponseBody = { success: true, message, data };
  res.status(statusCode).json(body);
};

/**
 * Send a paginated response
 */
export const paginatedResponse = (
  res: Response,
  data: unknown[],
  page: number,
  limit: number,
  total: number,
): void => {
  const totalPages = Math.ceil(total / limit);
  const body: PaginatedResponseBody = {
    success: true,
    data,
    meta: { page, limit, total, totalPages },
  };
  res.status(200).json(body);
};
