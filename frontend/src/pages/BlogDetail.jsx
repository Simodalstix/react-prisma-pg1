import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlogPost } from "../hooks/useBlog";
import { blogApi } from "../services/api";
import { ROUTES, SUCCESS_MESSAGES } from "../utils/constants";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = useBlogPost(id);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      try {
        await blogApi.deletePost(id);
        alert(SUCCESS_MESSAGES.POST_DELETED);
        navigate(ROUTES.BLOG);
      } catch (err) {
        alert(`Failed to delete post: ${err.message}`);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatContent = (content) => {
    // Simple formatting: convert line breaks to paragraphs
    return content.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-6 last:mb-0">
        {paragraph.split("\n").map((line, lineIndex) => (
          <span key={lineIndex}>
            {line}
            {lineIndex < paragraph.split("\n").length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Post Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              {error || "The blog post you are looking for does not exist."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.BLOG} className="btn btn-primary">
                Back to Blog
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            to={ROUTES.BLOG}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            ← Back to Blog
          </Link>
        </nav>

        {/* Article */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <header className="p-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Published:</span>
                <time
                  className="text-gray-900 font-semibold"
                  dateTime={post.publishDate}
                >
                  {formatDate(post.publishDate)}
                </time>
              </div>
              {post.updatedAt !== post.createdAt && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">Updated:</span>
                  <time
                    className="text-gray-900 font-semibold"
                    dateTime={post.updatedAt}
                  >
                    {formatDate(post.updatedAt)}
                  </time>
                </div>
              )}
            </div>
          </header>

          <div className="p-8 prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-lg">
              {formatContent(post.content)}
            </div>
          </div>

          <footer className="p-8 pt-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/blog/edit/${post.id}`}
                className="btn btn-primary flex-1 sm:flex-none"
              >
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-danger flex-1 sm:flex-none"
              >
                Delete Post
              </button>
            </div>
          </footer>
        </article>

        {/* Related Actions */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            What's Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to={ROUTES.BLOG}
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-500 hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Browse More Posts
              </h4>
              <p className="text-gray-600 text-sm">Explore other blog posts</p>
            </Link>
            <Link
              to={ROUTES.BLOG_CREATE}
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-500 hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-4">✍️</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Write New Post
              </h4>
              <p className="text-gray-600 text-sm">Share your thoughts</p>
            </Link>
            <Link
              to={ROUTES.HOME}
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-500 hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-4">🏠</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Go Home
              </h4>
              <p className="text-gray-600 text-sm">Return to homepage</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
