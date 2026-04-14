/**
 * Authentication Routes
 * Defines all auth-related API endpoints
 */

const express = require("express");
const {
  register,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Public routes
 */
// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

/**
 * Protected routes (require authentication)
 */
// Get current user profile
router.get("/me", protect, getMe);

// Update user profile
router.put("/me", protect, updateProfile);

module.exports = router;
