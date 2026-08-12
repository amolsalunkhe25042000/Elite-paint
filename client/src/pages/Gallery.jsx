import { useState } from "react";
import "./Gallery.css";
const projects = [
  [
    "Living room refresh",
    "Interior",
    "https://i.pinimg.com/originals/30/e8/44/30e8442a5c68d65cfba87fe9eb34bce1.jpg",
  ],
  [
    "A soft place to rest",
    "Interior",
    "https://digipaces.com/storage/Osian-Almanova-Internal-Living-Room.jpg",
  ],
  [
    "A welcoming exterior",
    "Exterior",
    "https://images.homify.com/c_fill%2Cf_auto%2Ch_500%2Cq_auto%2Cw_1280/v1457602589/p/photo/image/1392327/VB01_dayview.jpg",
  ],
  [
    "Texture, up close",
    "Texture",
    "https://www.buildofy.com/blog/content/images/2025/10/DSCF7176-HDR.jpg",
  ],
  [
    "Modern Pune apartment",
    "Interior",
    "https://assets-news.housing.com/news/wp-content/uploads/2020/10/15083854/Trump-Towers-Pune-A-look-inside-Panchshil-Realty%E2%80%99s-project-at-Kalyani-Nagar-image-03-593x400.jpg",
  ],
  [
    "Pune commercial space",
    "Commercial",
    "https://taoarchitecture.com/img/corporate/pbap-credai-office/pbap-credai-office-bg.jpg",
  ],
];
export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const choices = ["All", "Interior", "Exterior", "Texture", "Commercial"];
  const visible =
    filter === "All" ? projects : projects.filter((p) => p[1] === filter);
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our recent work</p>
          <h1>
            Spaces with
            <br />a new story.
          </h1>
          <p>A collection of homes and places transformed by colour.</p>
        </div>
      </section>
      <section className="gallery-wrap">
        <div className="container">
          <div className="gallery-top">
            <div>
              <p className="eyebrow">Selected projects</p>
              <h2 className="section-heading">Made to be lived in.</h2>
            </div>
            <div className="gallery-filters">
              {choices.map((x) => (
                <button
                  onClick={() => setFilter(x)}
                  className={filter === x ? "selected" : ""}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="gallery-grid-new">
            {visible.map((p, i) => (
              <button
                className={`project-card project-${i}`}
                onClick={() => setActive(p)}
                key={p[0]}
              >
                <img src={p[2]} alt={p[0]} />
                <span className="project-category">{p[1]}</span>
                <div>
                  <h3>{p[0]}</h3>
                  <b>View project ↗</b>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {active && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close project"
              className="modal-close"
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <img src={active[2]} alt={active[0]} />
            <p>{active[1]}</p>
            <h2>{active[0]}</h2>
          </div>
        </div>
      )}
    </main>
  );
}
