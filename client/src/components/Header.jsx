import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const links = [["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/gallery", "Gallery"], ["/contact", "Contact"], ["/admin", "Admin"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    document.body.classList.toggle("menu-is-open", open);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.classList.remove("menu-is-open"); window.removeEventListener("keydown", closeOnEscape); };
  }, [open]);
  return <header className={`header ${open ? "menu-open" : ""}`}>
    <div className="header-container">
      <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark">E</span><span>Elite<span>Paint</span><small>PAINTING STUDIO</small></span></Link>
      <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span></span><span></span><span></span></button>
      <nav className={`nav ${open ? "open" : ""}`} aria-label="Main navigation">
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <a className="nav-call" href="tel:9356535803" onClick={() => setOpen(false)}>Call us <b>→</b></a>
      </nav>
    </div>
    <button className="menu-backdrop" aria-label="Close navigation" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} />
  </header>;
}
