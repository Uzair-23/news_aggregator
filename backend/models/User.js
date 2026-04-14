/**
 * User Model
 * Defines MongoDB schema for user accounts with authentication fields
 */

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never return password by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: null,
    },

    preferences: {
      type: [String],
      default: [],
    },

    bookmarks: {
      type: [String],
      default: [],
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * Hash password before saving to database
 * Uses bcryptjs with salt rounds of 10
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  // Mongoose automatically catches errors in async hooks, so try/catch is not strictly required here
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

/**
 * Method to compare input password with hashed password
 * @param {string} enteredPassword - Password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

/**
 * Method to return user data excluding sensitive fields
 * @returns {Object} User object without password
 */
userSchema.methods.toJSON = function () {
  const { password, ...userWithoutPassword } = this.toObject();
  return userWithoutPassword;
};

module.exports = mongoose.model("User", userSchema);