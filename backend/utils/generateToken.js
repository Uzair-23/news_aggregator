/**
 * JWT Token Generation Utility
 * Creates JWT tokens for authenticated users
 */

const jwt = require("jsonwebtoken");

/**
 * Generates a JWT token for a user
 * @param {string} userId - User ID to encode in token
 * @returns {string} JWT token valid for 7 days
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
