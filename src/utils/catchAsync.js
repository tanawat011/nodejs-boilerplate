/**
 * Wrap async route handlers to catch errors
 * @param {Function} fn - Async function to wrap
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
