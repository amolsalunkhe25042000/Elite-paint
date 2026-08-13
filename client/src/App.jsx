import {
  HashRouter as Router,
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
import Admin from "./pages/Admin";
import "./App.css";

let initialLoadCompleted = false;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageLoader({ duration }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      initialLoadCompleted = true;
      setIsVisible(false);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading page">
      <div className="loader-content">
        <div className="loader-ring" aria-hidden="true" />
        <p>Loading<span className="loading-dots">...</span></p>
      </div>
    </div>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const loaderDuration = initialLoadCompleted ? 500 : 2000;

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <PageLoader key={pathname} duration={loaderDuration} />
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
