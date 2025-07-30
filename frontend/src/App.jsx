import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./pages/BlogForm";
import NotFound from "./pages/NotFound";
import { ROUTES } from "./utils/constants";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.BLOG} element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path={ROUTES.BLOG_CREATE} element={<BlogForm />} />
            <Route path="/blog/edit/:id" element={<BlogForm />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
