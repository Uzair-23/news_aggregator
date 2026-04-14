/**
 * Bookmark Controller
 * Handles user bookmark operations (add, retrieve, delete)
 */

const Bookmark = require("../models/Bookmark");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Add article to user's bookmarks
 * POST /api/bookmarks
 * Protected route - requires authentication
 * @param {Object} req - Express request object (with user attached by protect middleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with created bookmark
 */
const addBookmark = asyncHandler(async (req, res, next) => {
  const { title, description, url, urlToImage, sourceName, publishedAt } =
    req.body;
  const userId = req.user._id;

  // Validation
  if (!title || !url) {
    return res.status(400).json({
      success: false,
      message: "Please provide article title and URL",
    });
  }

  try {
    // Create bookmark with user ID
    const bookmark = await Bookmark.create({
      user: userId,
      title,
      description,
      url,
      urlToImage,
      sourceName,
      publishedAt,
    });

    return res.status(201).json({
      success: true,
      message: "Article bookmarked successfully",
      bookmark,
    });
  } catch (error) {
    // Handle duplicate key error (same URL already bookmarked by user)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This article is already bookmarked",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // Log unexpected errors and respond
    console.error("Bookmark creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create bookmark",
    });
  }
});

/**
 * Get all bookmarks for the current user
 * GET /api/bookmarks
 * Protected route - requires authentication
 * @param {Object} req - Express request object (with user attached by protect middleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with user's bookmarks
 */
const getBookmarks = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  try {
    // Find all bookmarks for the user, sorted by creation date (newest first)
    const bookmarks = await Bookmark.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    console.error("Fetch bookmarks error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookmarks",
    });
  }
});

/**
 * Remove bookmark by ID
 * DELETE /api/bookmarks/:id
 * Protected route - requires authentication
 * @param {Object} req - Express request object (with user attached by protect middleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with deletion status
 */
const removeBookmark = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Validate bookmark ID format
  if (!id || id.length !== 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid bookmark ID",
    });
  }

  try {
    // Find and verify bookmark belongs to current user before deleting
    const bookmark = await Bookmark.findById(id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    // Verify ownership
    if (bookmark.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this bookmark",
      });
    }

    // Delete the bookmark
    await Bookmark.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    console.error("Delete bookmark error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete bookmark",
    });
  }
});

/**
 * Check if article is bookmarked by current user
 * GET /api/bookmarks/check/:url (query param or URL encoded)
 * Protected route - requires authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with bookmark status
 */
const checkBookmark = asyncHandler(async (req, res, next) => {
  const { url } = req.query;
  const userId = req.user._id;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Please provide article URL as query parameter",
    });
  }

  try {
    const bookmark = await Bookmark.findOne({ user: userId, url });

    return res.status(200).json({
      success: true,
      isBookmarked: !!bookmark,
      bookmarkId: bookmark?._id || null,
    });
  } catch (error) {
    console.error("Check bookmark error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to check bookmark status",
    });
  }
});

module.exports = {
  addBookmark,
  getBookmarks,
  removeBookmark,
  checkBookmark,
};
