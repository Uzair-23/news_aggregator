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
      default: null,
    },

    url: {
      type: String,
      required: [true, "Article URL is required"],
      trim: true,
    },

    urlToImage: {
      type: String,
      default: null,
    },

    sourceName: {
      type: String,
      trim: true,
      default: null,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * Compound unique index: prevents user from bookmarking the same URL twice
 * user + url combination must be unique
 */
bookmarkSchema.index({ user: 1, url: 1 }, { unique: true });

/**
 * Pre-save middleware to trim all string fields
 */
bookmarkSchema.pre("save", function (next) {
  if (this.title) this.title = this.title.trim();
  if (this.description) this.description = this.description.trim();
  if (this.url) this.url = this.url.trim();
  if (this.sourceName) this.sourceName = this.sourceName.trim();
  next();
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
