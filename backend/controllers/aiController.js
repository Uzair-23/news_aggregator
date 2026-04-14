/**
 * AI Controller
 * Handles AI-powered tasks using Google Gemini API
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require("../utils/asyncHandler");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Summarize article using Gemini AI
 * POST /api/ai/summarize
 * Protected route - requires authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with article summary
 */
const summarizeArticle = asyncHandler(async (req, res, next) => {
  const { title, content, description } = req.body;

  // Validation
  if (!title || (!content && !description)) {
    return res.status(400).json({
      success: false,
      message: "Please provide article title and content (or description)",
    });
  }

  // Use content if provided, otherwise use description
  const articleText = content || description;

  try {
    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create the prompt for summarization
    const prompt = `Act as an expert news editor. Summarize the following news article comprehensively but concisely in 3-4 bullet points. Retain the full meaning and core facts.

Title: ${title}
Content: ${articleText}

Provide the summary in a clear, well-formatted bullet point list.`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return res.status(200).json({
      success: true,
      message: "Article summarized successfully",
      summary,
      title,
    });
  } catch (error) {
    // Handle API errors
    if (error.message.includes("API")) {
      console.error("Gemini API Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to generate summary. Please try again later.",
      });
    }

    // Handle quota or rate limit errors
    if (
      error.message.includes("quota") ||
      error.message.includes("rate limit")
    ) {
      return res.status(429).json({
        success: false,
        message: "AI service rate limit exceeded. Please try again later.",
      });
    }

    console.error("Summarization error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to summarize article",
    });
  }
});

module.exports = {
  summarizeArticle,
};
