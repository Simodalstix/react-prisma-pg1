import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);

    // Handle common error scenarios
    if (error.response?.status === 404) {
      throw new Error("Resource not found");
    } else if (error.response?.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please check your connection.");
    } else if (!error.response) {
      throw new Error("Network error. Please check your connection.");
    }

    throw error;
  }
);

// Blog API functions
export const blogApi = {
  // Get all posts
  getAllPosts: async () => {
    try {
      const response = await api.get("/posts");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  },

  // Get single post by ID
  getPost: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      const response = await api.post("/posts", postData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  },

  // Update existing post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  },
};

// Health check function
export const healthCheck = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
        "http://localhost:3001"
      }/health`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Health check failed: ${error.message}`);
  }
};

export default api;
