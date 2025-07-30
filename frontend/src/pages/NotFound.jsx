import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link to={ROUTES.HOME} className="btn btn-primary w-full">
            Go Home
          </Link>
          <Link to={ROUTES.BLOG} className="btn btn-outline w-full">
            Browse Blog
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>If you think this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
