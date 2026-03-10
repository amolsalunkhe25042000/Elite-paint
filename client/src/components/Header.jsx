import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const phoneNumber = '9356535803';

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Elite Home Paint</h1>
        </div>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
          <Link to="/testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </nav>

        <a href={`tel:${phoneNumber}`} className="cta-button">
          Call: {phoneNumber}
        </a>
      </div>
    </header>
  );
}