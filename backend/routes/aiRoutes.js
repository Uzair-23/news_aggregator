/**
 * AI Routes
 * Defines protected API endpoints for AI-powered features
 * All routes require authentication via JWT token
 */

const express = require("express");
const { summarizeArticle } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * All AI routes are protected - require valid JWT token
 * Authorization: Bearer <token>
 */
router.use(protect);

/**
 * POST /api/ai/summarize
 * Generate AI-powered summary of a news article using Gemini
 * Body: { title, content (or description) }
 */
router.post("/summarize", summarizeArticle);

module.exports = router;
