import { useState, useEffect } from "react";
import { blogApi } from "../services/api";

// Custom hook for managing blog posts
export const useBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.getAllPosts();
      setPosts(response.data || []);
    } catch (err) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Create new post
  const createPost = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.createPost(postData);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update existing post
  const updatePost = async (id, postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.updatePost(id, postData);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? response.data : post))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await blogApi.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh posts
  const refreshPosts = () => {
    fetchPosts();
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refreshPosts,
  };
};

// Custom hook for managing a single blog post
export const useBlogPost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch single post
  const fetchPost = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.getPost(id);
      setPost(response.data);
    } catch (err) {
      setError(err.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch post when ID changes
  useEffect(() => {
    fetchPost();
  }, [id]);

  // Refresh post
  const refreshPost = () => {
    fetchPost();
  };

  return {
    post,
    loading,
    error,
    refreshPost,
  };
};
