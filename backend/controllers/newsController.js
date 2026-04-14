/**
 * News Controller
 * Handles fetching news articles from NewsAPI external service
 */

const axios = require("axios");
const asyncHandler = require("../utils/asyncHandler");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

/**
 * Get latest top headlines
 * GET /api/news/latest
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with top headlines
 */
const getLatestNews = asyncHandler(async (req, res, next) => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        language: "en",
        apiKey: NEWS_API_KEY,
      },
    });

    return res.status(200).json({
      success: true,
      count: response.data.articles.length,
      articles: response.data.articles,
    });
  } catch (error) {
    // Handle NewsAPI specific errors
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || "NewsAPI error";

      // Handle rate limiting
      if (statusCode === 429) {
        return res.status(429).json({
          success: false,
          message: "API rate limit exceeded. Please try again later.",
        });
      }

      // Handle invalid API key
      if (statusCode === 401) {
        console.error("❌ Invalid NewsAPI key");
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
      });
    }

    // Network error
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news from NewsAPI",
    });
  }
});

/**
 * Search news by query
 * GET /api/news/search?q=technology
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with search results
 */
const searchNews = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  // Validate search query
  if (!q || q.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide a search query parameter: ?q=your_query",
    });
  }

  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: q.trim(),
        language: "en",
        sortBy: "publishedAt",
        apiKey: NEWS_API_KEY,
      },
    });

    return res.status(200).json({
      success: true,
      count: response.data.articles.length,
      articles: response.data.articles,
    });
  } catch (error) {
    // Handle NewsAPI specific errors
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || "NewsAPI error";

      // Handle rate limiting
      if (statusCode === 429) {
        return res.status(429).json({
          success: false,
          message: "API rate limit exceeded. Please try again later.",
        });
      }

      // Handle invalid API key
      if (statusCode === 401) {
        console.error("❌ Invalid NewsAPI key");
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
      });
    }

    // Network error
    return res.status(500).json({
      success: false,
      message: "Failed to search news from NewsAPI",
    });
  }
});

/**
 * Get news by category
 * GET /api/news/category/technology
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with category news
 */
const getNewsByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;

  // Validate category parameter
  const validCategories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  if (!category || !validCategories.includes(category.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Valid categories are: ${validCategories.join(", ")}`,
    });
  }

  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        category: category.toLowerCase(),
        language: "en",
        apiKey: NEWS_API_KEY,
      },
    });

    return res.status(200).json({
      success: true,
      category: category.toLowerCase(),
      count: response.data.articles.length,
      articles: response.data.articles,
    });
  } catch (error) {
    // Handle NewsAPI specific errors
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || "NewsAPI error";

      // Handle rate limiting
      if (statusCode === 429) {
        return res.status(429).json({
          success: false,
          message: "API rate limit exceeded. Please try again later.",
        });
      }

      // Handle invalid API key
      if (statusCode === 401) {
        console.error("❌ Invalid NewsAPI key");
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
      });
    }

    // Network error
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news from NewsAPI",
    });
  }
});

module.exports = {
  getLatestNews,
  searchNews,
  getNewsByCategory,
};
