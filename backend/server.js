/**
 * Main Express Server File
 * Initializes Express app, connects to MongoDB, and mounts all routes
 */

require("dotenv").config();

// ============================================
// ENVIRONMENT VALIDATION
// ============================================

// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  console.error(
    "❌ FATAL ERROR: JWT_SECRET is not defined in environment variables"
  );
  console.error(
    "Please add JWT_SECRET to your .env file before starting the server"
  );
  process.exit(1);
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import configurations and middleware
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// CORS middleware - allow frontend to communicate with backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running properly",
    timestamp: new Date().toISOString(),
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// Global error handler (must be last)
app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================

/**
 * Connect to MongoDB and start the server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});

module.exports = app;
