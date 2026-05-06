// ============================================
// Database Configuration - MongoDB Atlas
// ============================================
// This file handles the connection to MongoDB
// using Mongoose ODM (Object Data Modeling)
// ============================================

const mongoose = require("mongoose");

// connectDB function - connects to MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the process with failure code if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
