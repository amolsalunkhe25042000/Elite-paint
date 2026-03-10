import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const phoneNumber = '9356535803';
  const whatsappNumber = '919356535803';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create WhatsApp message
    const messageText = `Name: ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${messageText}`, '_blank');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <main>
      <section className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us for a free quote</p>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">💬</div>
                <div>
                  <h3>WhatsApp</h3>
                  <p>
                    <a 
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Message us on WhatsApp
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">👤</div>
                <div>
                  <h3>Founder</h3>
                  <p>Amol Salunkhe</p>
                </div>
              </div>

              <a href={`tel:${phoneNumber}`} className="call-button">
                ☎ Call Now
              </a>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="10-digit phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your painting needs..."
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message via WhatsApp
                </button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="map-container">
            <h2>Find Us</h2>
            <div className="map-placeholder">
              <p>📍 Location information will be displayed here</p>
              <p>Call us for directions and service areas</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}