// ============================================
// Server.js - Main Entry Point
// ============================================
// This is the starting point of our application.
// It sets up Express, connects to MongoDB,
// and starts the server.
// ============================================

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Import database connection function
const connectDB = require("./config/db");

// Import route files
const productRoutes = require("./routes/productRoutes");

// Initialize Express application
const app = express();

// ─── MIDDLEWARE SETUP ────────────────────────
// cors()          → Allows cross-origin requests (needed for API)
// express.json()  → Parses incoming JSON request bodies
// express.static  → Serves static files (CSS, JS, images)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ─── SERVE HTML PAGES ────────────────────────
// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Products page
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "products.html"));
});

// Add product page
app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "add.html"));
});

// Edit product page
app.get("/edit/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "edit.html"));
});

// ─── API ROUTES ──────────────────────────────
// All product API routes start with /api/products
app.use("/api/products", productRoutes);

// ─── START SERVER ────────────────────────────
const PORT = process.env.PORT || 5000;

// Connect to database, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
