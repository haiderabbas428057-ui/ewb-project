// ============================================
// Product Model - Mongoose Schema
// ============================================
// This file defines the structure of the
// "Product" document in MongoDB
// ============================================

const mongoose = require("mongoose");

// Define the Product Schema
const productSchema = new mongoose.Schema({
  // Name of the dry fruit (required)
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  // Price in PKR/USD (required)
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  // Available quantity in stock (required)
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
    min: [0, "Quantity cannot be negative"],
  },
  // Image URL (optional - has a default placeholder)
  image: {
    type: String,
    default: "https://via.placeholder.com/300x200?text=Dry+Fruit",
  },
  // Automatically store creation date
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
// "Product" will become "products" collection in MongoDB
module.exports = mongoose.model("Product", productSchema);
