/**
 * Authentication Controller
 * Handles all authentication logic for user registration, login, and profile retrieval
 */

const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Register new user
 * POST /api/auth/register
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with user and token
 */
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields: name, email, password",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already registered",
    });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  // Validate email format
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Create user
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
  });

  // Generate token
  const token = generateToken(user._id);

  // Return response without password (toJSON() strips password automatically)
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: user.toJSON(),
  });
});

/**
 * Login user
 * POST /api/auth/login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with user and token
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  // Find user by email and include password field
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  // Check if user exists
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Check password
  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Generate token
  const token = generateToken(user._id);

  // Return response without password (toJSON() strips password automatically)
  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user: user.toJSON(),
  });
});

/**
 * Get current logged-in user profile
 * GET /api/auth/me
 * Protected route - requires valid JWT token
 * @param {Object} req - Express request object (with user attached by authMiddleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with user profile
 */
const getMe = asyncHandler(async (req, res, next) => {
  // req.user is attached by the protect middleware
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user: user.toJSON(),
  });
});

/**
 * Update user profile
 * PUT /api/auth/me
 * Protected route - requires valid JWT token
 * @param {Object} req - Express request object (with user attached by authMiddleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with updated user
 */
const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, avatar, preferences } = req.body;
  const userId = req.user._id;

  // Fetch the user document
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Manually assign updated fields
  // This approach ensures Mongoose pre("save") hooks are triggered (e.g., for password hashing)
  if (name) user.name = name.trim();
  if (avatar !== undefined) user.avatar = avatar;
  if (preferences) user.preferences = preferences;

  // Save to database (triggers pre-save hooks)
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: user.toJSON(),
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
};