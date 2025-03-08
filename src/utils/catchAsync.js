/**
 * Wrap async route handlers to automatically catch errors
 * and forward them to Express error handling middleware.
 *
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 *
 * @example
 * router.get('/users', catchAsync(async (req, res) => {
 *   const users = await User.findAll();
 *   res.json(users);
 * }));
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
