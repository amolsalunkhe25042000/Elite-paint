import { Link } from "react-router-dom";
import "./Home.css";
const work = [
  [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
    "A calm, modern living room",
  ],
  [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
    "A softly layered bedroom",
  ],
  [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    "A considered dining space",
  ],
];
export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-paint paint-one"></div>
        <div className="hero-paint paint-two"></div>
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Your walls, beautifully considered</p>
            <h1>
              Make room for a <em>fresh</em> point of view.
            </h1>
            <p className="hero-text">
              Premium painting and texture work for homes that deserve a finish
              as personal as the people inside them.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Start your colour story <b>→</b>
              </Link>
              <a
                href="https://wa.me/919356535803"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Chat on WhatsApp <span>↗</span>
              </a>
            </div>
            <div className="hero-trust">
              <div className="avatars">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <span>
                <strong>150+ happy homes</strong>
                <br />
                painted with care
              </span>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
              alt="Elegant freshly painted living room"
            />
            <div className="image-tag">
              <span>01</span>
              <p>
                From wall prep to final brushstroke,
                <br />
                <b>we leave nothing to chance.</b>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="intro-section">
        <div className="container intro-grid">
          <p className="eyebrow">The Elite difference</p>
          <div>
            <h2 className="section-heading">
              Painting is more than colour on a wall.
            </h2>
            <p className="section-copy">
              It is the light that meets you in the morning, the backdrop to the
              moments that matter, and a chance to make your space feel entirely
              new.
            </p>
          </div>
          <Link className="round-link" to="/about">
            Meet the team <span>→</span>
          </Link>
        </div>
      </section>
      <section className="services-preview">
        <div className="container">
          <div className="section-top">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="section-heading">Finish, elevated.</h2>
            </div>
            <Link className="text-link" to="/services">
              Explore all services <span>→</span>
            </Link>
          </div>
          <div className="service-preview-grid">
            {[
              [
                "01",
                "Interior painting",
                "Spaces that feel considered, from a single room to your whole home.",
              ],
              [
                "02",
                "Exterior painting",
                "Long-lasting protection and a welcoming first impression.",
              ],
              [
                "03",
                "Textures & effects",
                "Tactile detail and custom finishes that make walls a feature.",
              ],
            ].map((x) => (
              <article key={x[0]}>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
                <Link to="/services">
                  Discover <b>↗</b>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="work-section">
        <div className="container">
          <div className="section-top">
            <div>
              <p className="eyebrow">Recent transformations</p>
              <h2 className="section-heading">
                A little colour goes a long way.
              </h2>
            </div>
            <Link className="text-link" to="/gallery">
              View the gallery <span>→</span>
            </Link>
          </div>
          <div className="home-work-grid">
            {work.map(([img, alt], i) => (
              <figure key={img} className={`home-work-${i}`}>
                <img src={img} alt={alt} />
                <figcaption>
                  {
                    ["Warm minimalism", "Soft sanctuary", "Naturally refined"][
                      i
                    ]
                  }{" "}
                  <span>↗</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container cta-card">
          <div>
            <p className="eyebrow">Your next chapter starts here</p>
            <h2>
              Ready to come home
              <br />
              to something <em>beautiful?</em>
            </h2>
          </div>
          <Link to="/contact" className="btn btn-light">
            Get a free quote <b>→</b>
          </Link>
        </div>
      </section>
    </main>
  );
}
