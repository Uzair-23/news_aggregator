/**
 * News Controller
 * Handles fetching news articles from NewsAPI external service
 * Includes sentiment analysis on article titles and descriptions
 */

const axios = require("axios");
const Sentiment = require("sentiment");
const asyncHandler = require("../utils/asyncHandler");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

// Initialize sentiment analyzer
const sentimentAnalyzer = new Sentiment();

/**
 * Helper function to analyze article sentiment
 * Analyzes both title and description and returns sentiment label
 * @param {string} title - Article title
 * @param {string} description - Article description
 * @returns {string} Sentiment label: "Positive", "Negative", or "Neutral"
 */
const analyzeSentiment = (title, description) => {
  // Combine title and description (handle null description)
  const textToAnalyze = `${title} ${description || ""}`.trim();

  // Analyze sentiment
  const result = sentimentAnalyzer.analyze(textToAnalyze);

  // Determine sentiment label based on score
  if (result.score > 1) {
    return "Positive";
  } else if (result.score < -1) {
    return "Negative";
  } else {
    return "Neutral";
  }
};

/**
 * Helper function to add sentiment label to articles
 * Maps over articles array and adds sentimentLabel property
 * @param {Array} articles - Array of article objects from NewsAPI
 * @returns {Array} Articles with added sentimentLabel property
 */
const addSentimentToArticles = (articles) => {
  return articles.map((article) => ({
    ...article,
    sentimentLabel: analyzeSentiment(article.title, article.description),
  }));
};

/**
 * Get latest top headlines
 * GET /api/news/latest
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with top headlines including sentiment labels
 */
const getLatestNews = asyncHandler(async (req, res, next) => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        language: "en",
        apiKey: NEWS_API_KEY,
      },
    });

    // Add sentiment analysis to articles
    const articlesWithSentiment = addSentimentToArticles(
      response.data.articles
    );

    return res.status(200).json({
      success: true,
      count: articlesWithSentiment.length,
      articles: articlesWithSentiment,
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
 * @returns {Object} JSON response with search results including sentiment labels
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

    // Add sentiment analysis to articles
    const articlesWithSentiment = addSentimentToArticles(
      response.data.articles
    );

    return res.status(200).json({
      success: true,
      count: articlesWithSentiment.length,
      articles: articlesWithSentiment,
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
 * @returns {Object} JSON response with category news including sentiment labels
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

    // Add sentiment analysis to articles
    const articlesWithSentiment = addSentimentToArticles(
      response.data.articles
    );

    return res.status(200).json({
      success: true,
      category: category.toLowerCase(),
      count: articlesWithSentiment.length,
      articles: articlesWithSentiment,
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
