require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import database connection
const connectDB = require('./src/config/db');

// Import routes
const plantRoutes = require('./src/routes/plantRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Security middleware
app.use(helmet()); // Set security headers
app.use(compression()); // Compress responses

// Rate limiter for API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});
app.use('/api', limiter);

// Basic middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logging middleware

// Define API routes
app.use('/api/plants', plantRoutes);
app.use('/api/categories', categoryRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Server Error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// --- Start server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
