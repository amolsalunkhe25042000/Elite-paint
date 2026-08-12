import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return <footer className="footer"><div className="footer-container"><div className="footer-top">
    <div><Link className="footer-brand" to="/">Elite<span>Paint</span></Link><p>Thoughtful colour. Impeccable finish.<br />Homes made to feel like yours.</p></div>
    <div><h4>Explore</h4><Link to="/about">Our story</Link><Link to="/services">Services</Link><Link to="/gallery">Recent work</Link></div>
    <div><h4>Get in touch</h4><a href="tel:9356535803">+91 93565 35803</a><a href="https://wa.me/919356535803" target="_blank" rel="noreferrer">WhatsApp us</a><Link to="/contact">Request a quote</Link></div>
    <div className="footer-note"><span>Mon – Sat</span><strong>9:00 AM – 7:00 PM</strong><span>At your service, wherever colour calls.</span></div>
  </div><div className="footer-bottom">© {new Date().getFullYear()} Elite Paint · Crafted with care</div></div></footer>;
}
