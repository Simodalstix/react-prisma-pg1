import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { blogApi } from "../services/api";
import { useBlogPost } from "../hooks/useBlog";
import { ROUTES, SUCCESS_MESSAGES } from "../utils/constants";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { post, loading: postLoading } = useBlogPost(isEditing ? id : null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Load post data for editing
  useEffect(() => {
    if (isEditing && post) {
      setFormData({
        title: post.title,
        content: post.content,
      });
    }
  }, [isEditing, post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let redirectId;
      if (isEditing) {
        await blogApi.updatePost(id, formData);
        setSuccessMessage(SUCCESS_MESSAGES.POST_UPDATED);
        redirectId = id;
      } else {
        const response = await blogApi.createPost(formData);
        setSuccessMessage(SUCCESS_MESSAGES.POST_CREATED);
        redirectId = response.data.id;
      }

      setTimeout(() => {
        navigate(`/blog/${redirectId}`);
      }, 2000); // Wait 2 seconds before redirecting
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      navigate(`/blog/${id}`);
    } else {
      navigate(ROUTES.BLOG);
    }
  };

  if (isEditing && postLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            to={isEditing ? `/blog/${id}` : ROUTES.BLOG}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            ← {isEditing ? "Back to Post" : "Back to Blog"}
          </Link>
        </nav>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-lg text-gray-600">
            {isEditing
              ? "Update your blog post"
              : "Share your thoughts with the world"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="text-red-600 mr-3">⚠️</div>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="text-green-600 mr-3">✅</div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">
                      Success
                    </h3>
                    <p className="text-sm text-green-700 mt-1">
                      {successMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your post title..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/255 characters
                </p>
              </div>

              {/* Content Field */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                  placeholder="Write your post content here..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.content.length} characters
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 mt-8">
              <button
                type="submit"
                disabled={
                  loading || !formData.title.trim() || !formData.content.trim()
                }
                className="btn btn-primary flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loading-spinner w-4 h-4 mr-2"></div>
                    {isEditing ? "Updating..." : "Creating..."}
                  </span>
                ) : isEditing ? (
                  "Update Post"
                ) : (
                  "Create Post"
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="btn btn-outline flex-1 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Writing Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>
              • Use a clear and descriptive title that captures the essence of
              your post
            </li>
            <li>
              • Break up long paragraphs with line breaks for better readability
            </li>
            <li>• Use double line breaks to create separate paragraphs</li>
            <li>• Keep your content engaging and informative</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
