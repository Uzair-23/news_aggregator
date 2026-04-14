/**
 * Async Handler Utility
 * Wraps async route handlers to catch errors and pass to error middleware
 * Properly handles Promise rejections and passes control to error handler
 */

/**
 * Wraps an async function to handle errors automatically
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped middleware function with error handling
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;