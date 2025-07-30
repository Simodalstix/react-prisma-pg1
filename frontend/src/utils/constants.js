// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
};

// Application Routes
export const ROUTES = {
  HOME: "/",
  BLOG: "/blog",
  BLOG_POST: "/blog/:id",
  BLOG_CREATE: "/blog/create",
  BLOG_EDIT: "/blog/edit/:id",
  NOT_FOUND: "*",
};

// Application Constants
export const APP_CONFIG = {
  TITLE: "Portfolio Project",
  DESCRIPTION: "A minimal portfolio website with blog functionality",
  VERSION: "1.0.0",
};

// Blog Constants
export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 10,
  EXCERPT_LENGTH: 150,
  DATE_FORMAT: "MMM DD, YYYY",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "Resource not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: "Blog post created successfully!",
  POST_UPDATED: "Blog post updated successfully!",
  POST_DELETED: "Blog post deleted successfully!",
};

// Loading States
export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
