import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const phoneNumber = '9356535803';
  const whatsappNumber = '919356535803';

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Professional Home Painting Services</h1>
          <p>Transform your home with Elite Home Paint</p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn btn-primary">
              Get Free Quote
            </Link>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in your painting services!`}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
          <p className="phone-display">Call: <strong>{phoneNumber}</strong></p>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Quick Features */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Professional Quality</h3>
              <p>Expert painters with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Satisfaction Guaranteed</h3>
              <p>100% customer satisfaction on every project</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Service</h3>
              <p>Fast turnaround without compromising quality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable Pricing</h3>
              <p>Competitive rates with free quotes</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}