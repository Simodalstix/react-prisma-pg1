import { Link } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { ROUTES, SUCCESS_MESSAGES } from "../utils/constants";

const Blog = () => {
  const { posts, loading, error, deletePost } = useBlog();

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePost(id);
        alert(SUCCESS_MESSAGES.POST_DELETED);
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
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Posts
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Blog Header */}
        <div className="text-center py-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog Posts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore articles about web development, technology, and more.
          </p>
          <Link to={ROUTES.BLOG_CREATE} className="btn btn-primary btn-lg">
            Write New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Posts Yet
            </h2>
            <p className="text-gray-600 mb-8">
              Be the first to write a blog post!
            </p>
            <Link to={ROUTES.BLOG_CREATE} className="btn btn-primary">
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      <Link
                        to={`/blog/${post.id}`}
                        className="hover:text-blue-600 transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {truncateContent(post.content)}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/blog/${post.id}`}
                      className="btn btn-outline btn-sm flex-1"
                    >
                      Read More
                    </Link>
                    <Link
                      to={`/blog/edit/${post.id}`}
                      className="btn btn-outline btn-sm flex-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="btn btn-danger btn-sm flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
