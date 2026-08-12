import { Link } from "react-router-dom";
import "./Services.css";
const services = [
  [
    "Interior painting",
    "Fresh, refined interiors that work beautifully with your natural light and furniture.",
    "https://digipaces.com/storage/Osian-Almanova-Internal-Living-Room.jpg",
  ],
  [
    "Exterior painting",
    "Protective, weather-ready colour that gives your home instant kerb appeal.",
    "https://www.drishtiarchitects.com/wp-content/uploads/2020/11/6065-Bungalow_View015-min-758x520.jpg",
  ],
  [
    "Textures & effects",
    "Subtle layers, feature walls and designer finishes with real depth.",
    "https://assets.architecturaldigest.in/photos/6008438733ca0d53ee20781a/master/w_1600%2Cc_limit/Pune-home-interior-design-2-2.jpg",
  ],
  [
    "Waterproofing",
    "Smart moisture protection that keeps paintwork looking beautiful for longer.",
    "https://images.homify.com/v1457602607/p/photo/image/1392328/Raj_Bhansali_resi_03.jpg",
  ],
  [
    "Repainting & renovation",
    "A careful reset for well-loved homes, handled from preparation to polish.",
    "https://www.buildofy.com/blog/content/images/2025/10/DSCF7176-HDR.jpg",
  ],
  [
    "Commercial spaces",
    "Professional, low-disruption painting for offices, studios and retail spaces.",
    "https://taoarchitecture.com/img/corporate/pbap-credai-office/pbap-credai-office-bg.jpg",
  ],
];
export default function Services() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our craft</p>
          <h1>
            Painting with
            <br />
            purpose.
          </h1>
          <p>Practical expertise, beautiful finishes, no loose ends.</p>
        </div>
      </section>
      <section className="services-list">
        <div className="container">
          <div className="services-intro">
            <div>
              <p className="eyebrow">Made for every space</p>
              <h2 className="section-heading">
                The right finish
                <br />
                for the way you live.
              </h2>
            </div>
            <p className="section-copy">
              Whether you're refreshing one room or reimagining an entire
              property, we tailor our approach, materials and schedule to you.
            </p>
          </div>
          <div className="service-list-grid">
            {services.map((s, i) => (
              <article className="service-full-card" key={s[0]}>
                <div className="service-photo">
                  <img src={s[2]} alt={s[0]} />
                  <span>0{i + 1}</span>
                </div>
                <div>
                  <h3>{s[0]}</h3>
                  <p>{s[1]}</p>
                  <Link to="/contact">
                    Ask for a quote <b>→</b>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="service-banner">
        <div className="container">
          <p className="eyebrow">Not sure where to begin?</p>
          <h2>
            We'll help you find
            <br />
            your perfect colour.
          </h2>
          <Link to="/contact" className="btn btn-light">
            Book a free consultation <b>→</b>
          </Link>
        </div>
      </section>
    </main>
  );
}
