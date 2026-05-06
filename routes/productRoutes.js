// ============================================
// Product Routes - API Endpoints
// ============================================
// This file defines all the URL routes for
// product-related API operations
// ============================================

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ─── ROUTE DEFINITIONS ──────────────────────
// Base path: /api/products (set in server.js)

// GET  /api/products      → Get all products
// POST /api/products      → Create new product
router.route("/").get(getAllProducts).post(createProduct);

// GET    /api/products/:id → Get single product
// PUT    /api/products/:id → Update product
// DELETE /api/products/:id → Delete product
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
