/**
 * Send a success response
 */
export const successResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send a paginated response
 */
export const paginatedResponse = (res, data, page, limit, total) => {
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  });
};
