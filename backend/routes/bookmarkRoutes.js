/**
 * Bookmark Routes
 * Defines protected API endpoints for managing user bookmarks
 * All routes require authentication via JWT token
 */

const express = require("express");
const {
  addBookmark,
  getBookmarks,
  removeBookmark,
  checkBookmark,
} = require("../controllers/bookmarkController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * All bookmark routes are protected - require valid JWT token
 * Authorization: Bearer <token>
 */
router.use(protect);

/**
 * POST /api/bookmarks
 * Add a new article to user's bookmarks
 * Body: { title, description, url, urlToImage, sourceName, publishedAt }
 */
router.post("/", addBookmark);

/**
 * GET /api/bookmarks
 * Retrieve all bookmarked articles for the current user
 * Sorted by creation date (newest first)
 */
router.get("/", getBookmarks);

/**
 * GET /api/bookmarks/check?url=article_url
 * Check if a specific article is already bookmarked
 * Query: url (required) - article URL to check
 */
router.get("/check", checkBookmark);

/**
 * DELETE /api/bookmarks/:id
 * Remove a bookmark by its ID
 * Params: id (required) - MongoDB bookmark _id
 */
router.delete("/:id", removeBookmark);

module.exports = router;
