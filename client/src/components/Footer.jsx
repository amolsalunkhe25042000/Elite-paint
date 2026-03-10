import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Elite Home Paint</h3>
            <p>Professional home painting services</p>
            <a href={`tel:9356535803`} className="footer-phone">
              📞 9356535803
            </a>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <Link to="/services">Interior Painting</Link>
            <Link to="/services">Exterior Painting</Link>
            <Link to="/services">Wall Texture</Link>
            <Link to="/services">Waterproofing</Link>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Phone: <a href="tel:9356535803">9356535803</a></p>
            <p>Founder: Amol Salunkhe</p>
            <a 
              href="https://wa.me/919356535803" 
              target="_blank" 
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Elite Home Paint. All rights reserved. | Founded by Amol Salunkhe</p>
        </div>
      </div>
    </footer>
  );
}