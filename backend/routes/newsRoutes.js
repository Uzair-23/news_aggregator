/**
 * News Routes
 * Defines public API endpoints for fetching news from NewsAPI
 */

const express = require("express");
const {
  getLatestNews,
  searchNews,
  getNewsByCategory,
} = require("../controllers/newsController");

const router = express.Router();

/**
 * Public Routes (no authentication required)
 */

/**
 * GET /api/news/latest
 * Fetch top headline news in English
 */
router.get("/latest", getLatestNews);

/**
 * GET /api/news/search?q=query
 * Search for news articles by query string
 * Query: q (required) - search query term
 */
router.get("/search", searchNews);

/**
 * GET /api/news/category/:category
 * Fetch news by category
 * Categories: business, entertainment, general, health, science, sports, technology
 */
router.get("/category/:category", getNewsByCategory);

module.exports = router;
