import { APP_CONFIG } from "../../utils/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4">
              {APP_CONFIG.TITLE}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {APP_CONFIG.DESCRIPTION}
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/blog/create"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Write Post
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-white mb-4">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            <p>
              &copy; {currentYear} {APP_CONFIG.TITLE}. Built with React and
              Node.js.
            </p>
          </div>
          <div className="flex items-center">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              v{APP_CONFIG.VERSION}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
