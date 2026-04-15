/**
 * Bookmark Model
 * Stores user bookmarked articles with full metadata for offline access
 */
const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Article title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "No description available",
    },
    url: {
      type: String,
      required: [true, "Article URL is required"],
      trim: true,
    },
    urlToImage: {
      type: String,
      default: "",
    },
    sourceName: {
      type: String,
      trim: true,
      default: "Unknown Source",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/**
 * Compound unique index: prevents user from bookmarking the same URL twice
 * user + url combination must be unique
 */
bookmarkSchema.index({ user: 1, url: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
