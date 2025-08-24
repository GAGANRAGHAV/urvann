/**
 * Application configuration
 * Contains environment-specific settings
 */

// Backend API configuration
export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://urvann-24q6.onrender.com/api",
  
  // Timeout for API requests in milliseconds
  TIMEOUT: 10000,
  
  // Admin routes configuration
  ADMIN: {
    KEY_NAME: "x-admin-key",
  },
};

// Frontend configuration
export const APP_CONFIG = {
  // Application name
  NAME: "Urvaan Plant Shop",
  
  // Items per page for pagination
  ITEMS_PER_PAGE: 12,
  
  // Default image paths
  DEFAULT_IMAGES: {
    PLANT: "/placeholder.svg",
    LOGO: "/placeholder-logo.svg",
    USER: "/placeholder-user.jpg",
  },
};
