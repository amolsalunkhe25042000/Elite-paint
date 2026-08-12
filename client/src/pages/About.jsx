import { Link } from "react-router-dom";
import "./About.css";

const spaces = [
  [
    "Apartment interiors",
    "/images/about-apartment.jpg",
    "Pune apartment living room interior",
  ],
  [
    "Bungalow exteriors",
    "/images/about-bungalow.jpg",
    "Bungalow exterior in Viman Nagar Pune",
  ],
  [
    "Signature spaces",
    "/images/about-signature.jpg",
    "Wanzare bungalow interior in Pune",
  ],
];

export default function About() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">The people behind the paint</p>
          <h1>
            Built on care,
            <br />
            made for home.
          </h1>
          <p>We believe a great finish starts with listening.</p>
        </div>
      </section>
      <section className="about-story">
        <div className="container story-grid">
          <div className="story-image">
            <img
              src="/images/about-story.jpg"
              alt="Modern private residence in Sopan Baug, Pune"
            />
            <span>
              Since
              <br />
              <b>2017</b>
            </span>
          </div>
          <div>
            <p className="eyebrow">A better way to paint</p>
            <h2 className="section-heading">
              Your space deserves more than a quick coat.
            </h2>
            <p className="section-copy">
              Elite Paint brings skilled craftsmanship and a considered eye to
              every project. From first colour conversation to the final
              clean-up, we make the process simple, precise, and genuinely
              enjoyable.
            </p>
            <p className="section-copy">
              Founded by Amol Salunkhe, our team has earned the trust of
              homeowners through honest advice, tidy workspaces and finishes
              that last.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Tell us about your space <b>-&gt;</b>
            </Link>
          </div>
        </div>
      </section>
      <section className="local-spaces">
        <div className="container">
          <div>
            <p className="eyebrow">Homes we understand</p>
            <h2 className="section-heading">Made for Pune living.</h2>
          </div>
          <p className="section-copy">
            From a sunlit apartment in Baner to a family bungalow in Koregaon
            Park, we select finishes that suit the way Maharashtra homes are
            built and lived in.
          </p>
          <div className="local-spaces-grid">
            {spaces.map(([label, image, alt], index) => (
              <figure key={label}>
                <img src={image} alt={alt} />
                <figcaption>
                  <span>0{index + 1}</span>
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="about-values">
        <div className="container">
          <p className="eyebrow">How we work</p>
          <h2 className="section-heading">The details make the difference.</h2>
          <div className="values-grid">
            {[
              [
                "01",
                "Listen first",
                "We start with your vision, light, lifestyle and budget.",
              ],
              [
                "02",
                "Prepare properly",
                "Careful surface prep is our quiet secret to a lasting finish.",
              ],
              [
                "03",
                "Paint beautifully",
                "Experienced hands, premium materials and an exacting eye.",
              ],
              [
                "04",
                "Leave it lovely",
                "A final walkthrough and a clean space ready to enjoy.",
              ],
            ].map((v) => (
              <article key={v[0]}>
                <span>{v[0]}</span>
                <h3>{v[1]}</h3>
                <p>{v[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-quote">
        <div className="container">
          <span>&ldquo;</span>
          <blockquote>
            We don't simply paint walls. We help create the feeling you want to
            come home to.
          </blockquote>
          <p>AMOL SALUNKHE &middot; FOUNDER, ELITE PAINT</p>
        </div>
      </section>
    </main>
  );
}
