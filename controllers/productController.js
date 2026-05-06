// ============================================
// Product Controller - Business Logic
// ============================================
// This file contains all the logic for
// handling CRUD operations on Products
// ============================================

const Product = require("../models/Product");

// ─── GET ALL PRODUCTS ───────────────────────
// Route:  GET /api/products
// Desc:   Fetch all products from database
const getAllProducts = async (req, res) => {
  try {
    // Find all products, sorted by newest first
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch products",
      error: error.message,
    });
  }
};

// ─── GET SINGLE PRODUCT ─────────────────────
// Route:  GET /api/products/:id
// Desc:   Fetch one product by its ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch product",
      error: error.message,
    });
  }
};

// ─── CREATE NEW PRODUCT ─────────────────────
// Route:  POST /api/products
// Desc:   Add a new product to database
const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, image } = req.body;

    // Basic validation
    if (!name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, price, and quantity",
      });
    }

    // Create product in database
    const product = await Product.create({
      name,
      price,
      quantity,
      image: image || undefined, // Use default if not provided
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not create product",
      error: error.message,
    });
  }
};

// ─── UPDATE PRODUCT ─────────────────────────
// Route:  PUT /api/products/:id
// Desc:   Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // Return the updated document
        runValidators: true,  // Run schema validators on update
      }
    );

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not update product",
      error: error.message,
    });
  }
};

// ─── DELETE PRODUCT ─────────────────────────
// Route:  DELETE /api/products/:id
// Desc:   Remove a product from database
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not delete product",
      error: error.message,
    });
  }
};

// Export all controller functions
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
