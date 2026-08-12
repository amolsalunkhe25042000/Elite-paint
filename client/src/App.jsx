import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className="page-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="loader-content">
        <div className="loader-ring">
          <span>E</span>
        </div>
        <p>
          ELITE <b>PAINT</b>
        </p>
        <small>Preparing your space</small>
      </div>
    </div>
  );
}

function AppContent() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <PageLoader key={pathname} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
