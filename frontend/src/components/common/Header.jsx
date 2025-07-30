import { Link } from "react-router-dom";
import { APP_CONFIG, ROUTES } from "../../utils/constants";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to={ROUTES.HOME} className="text-decoration-none">
              <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                {APP_CONFIG.TITLE}
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to={ROUTES.HOME}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to={ROUTES.BLOG}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Blog
            </Link>
            <Link to={ROUTES.BLOG_CREATE} className="btn btn-primary">
              Write Post
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden border-t border-gray-200 py-4">
          <div className="flex flex-col space-y-2">
            <Link
              to={ROUTES.HOME}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to={ROUTES.BLOG}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Blog
            </Link>
            <Link
              to={ROUTES.BLOG_CREATE}
              className="btn btn-primary w-full justify-center mt-2"
            >
              Write Post
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
