import { Link } from "react-router-dom";
import { APP_CONFIG, ROUTES } from "../utils/constants";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16 min-h-[60vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to My Portfolio
              </h1>
              <p className="text-xl md:text-2xl font-medium opacity-90">
                A modern fullstack web application built with React, Node.js,
                and PostgreSQL
              </p>
              <p className="text-lg opacity-80 leading-relaxed">
                This portfolio showcases a complete blog system with CRUD
                operations, demonstrating modern web development practices and
                clean architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={ROUTES.BLOG}
                  className="btn btn-lg bg-white text-blue-600 hover:bg-gray-50"
                >
                  View Blog Posts
                </Link>
                <Link
                  to={ROUTES.BLOG_CREATE}
                  className="btn btn-lg bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600"
                >
                  Write a Post
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
                <div className="text-white/80 mb-4">
                  <svg
                    className="w-24 h-24 mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium opacity-90">
                  Portfolio Project
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-blue-600 mb-6 flex justify-center">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 13H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 9H9H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Blog Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create, read, update, and delete blog posts with a clean and
                intuitive interface.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-blue-600 mb-6 flex justify-center">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Modern Tech Stack
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built with React, Node.js, Express, Prisma ORM, and PostgreSQL
                for optimal performance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-blue-600 mb-6 flex justify-center">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Responsive Design
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fully responsive design that works seamlessly across desktop,
                tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Frontend
              </h3>
              <ul className="space-y-3">
                {[
                  "React 18",
                  "React Router",
                  "Axios",
                  "Tailwind CSS",
                  "Vite",
                ].map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center text-gray-700 font-medium"
                  >
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Backend
              </h3>
              <ul className="space-y-3">
                {[
                  "Node.js",
                  "Express.js",
                  "Prisma ORM",
                  "Zod Validation",
                  "Winston Logging",
                ].map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center text-gray-700 font-medium"
                  >
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Database & Deployment
              </h3>
              <ul className="space-y-3">
                {[
                  "PostgreSQL",
                  "AWS S3",
                  "Raspberry Pi",
                  "Docker",
                  "GitHub Actions",
                ].map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center text-gray-700 font-medium"
                  >
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
