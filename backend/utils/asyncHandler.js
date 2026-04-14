/**
 * Async Handler Utility
 * Wraps async route handlers to catch errors and pass to error middleware
 */

/**
 * Wraps an async function to handle errors automatically
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped function with error handling
 */
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
