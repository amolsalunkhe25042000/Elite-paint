import { useEffect, useRef, useState } from "react";
import "./Gallery.css";

const projects = [
  ["Living room refresh", "Interior", "/images/about-apartment.jpg"],
  ["A soft place to rest", "Interior", "/images/service-interior.jpg"],
  ["A welcoming exterior", "Exterior", "/images/gallery-exterior.jpg"],
  ["Texture, up close", "Texture", "/images/service-renovation.jpg"],
  ["Modern Pune apartment", "Interior", "/images/gallery-apartment.jpg"],
  ["Pune commercial space", "Commercial", "/images/service-commercial.jpg"],
];
const choices = ["All", "Interior", "Exterior", "Texture", "Commercial"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);
  const visible = filter === "All" ? projects : projects.filter((project) => project[1] === filter);

  useEffect(() => {
    if (!active) return undefined;
    previousFocus.current = document.activeElement;
    closeRef.current?.focus();
    const closeOnEscape = (event) => event.key === "Escape" && setActive(null);
    document.body.classList.add("modal-is-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-is-open");
      window.removeEventListener("keydown", closeOnEscape);
      previousFocus.current?.focus();
    };
  }, [active]);

  return <main><section className="page-hero"><div className="container"><p className="eyebrow">Our recent work</p><h1>Spaces with<br />a new story.</h1><p>A collection of homes and places transformed by colour.</p></div></section>
    <section className="gallery-wrap"><div className="container"><div className="gallery-top"><div><p className="eyebrow">Selected projects</p><h2 className="section-heading">Made to be lived in.</h2></div><div className="gallery-filters" aria-label="Filter projects">{choices.map((choice) => <button type="button" aria-pressed={filter === choice} onClick={() => setFilter(choice)} className={filter === choice ? "selected" : ""} key={choice}>{choice}</button>)}</div></div>
      <div className="gallery-grid-new">{visible.map((project, index) => <button type="button" className={`project-card project-${index}`} onClick={() => setActive(project)} key={project[0]}><img src={project[2]} alt={project[0]} /><span className="project-category">{project[1]}</span><div><h3>{project[0]}</h3><b>View project ↗</b></div></button>)}</div>
    </div></section>
    {active && <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.target === event.currentTarget && setActive(null)}><div><button ref={closeRef} type="button" aria-label="Close project" className="modal-close" onClick={() => setActive(null)}>×</button><img src={active[2]} alt={active[0]} /><p>{active[1]}</p><h2 id="project-title">{active[0]}</h2></div></div>}
  </main>;
}
