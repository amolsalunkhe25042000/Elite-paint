import './About.css';

export default function About() {
  return (
    <main>
      <section className="page-header">
        <h1>About Us</h1>
        <p>Learn about Elite Home Paint</p>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Elite Home Paint</h2>
              <p>
                Elite Home Paint is a professional home painting service dedicated to transforming homes 
                with quality work and exceptional customer service. Founded by Amol Salunkhe, we bring 
                years of expertise and passion for creating beautiful living spaces.
              </p>
              
              <h3>Our Mission</h3>
              <p>
                To provide professional, affordable, and reliable painting services that exceed customer 
                expectations and transform properties into beautiful spaces.
              </p>

              <h3>Why Choose Elite Home Paint?</h3>
              <ul className="features-list">
                <li>✓ Professional and experienced painters</li>
                <li>✓ Premium quality paints and materials</li>
                <li>✓ 100% customer satisfaction guarantee</li>
                <li>✓ Free quotes and transparent pricing</li>
                <li>✓ Quick turnaround times</li>
                <li>✓ Neat and clean work environment</li>
                <li>✓ Warranty on all services</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </div>

            <div className="about-founder">
              <div className="founder-card">
                <div className="founder-avatar">👨‍💼</div>
                <h3>Amol Salunkhe</h3>
                <p className="founder-title">Founder & Owner</p>
                <p className="founder-bio">
                  With years of industry experience, Amol is committed to delivering excellence in every project. 
                  His dedication to quality and customer satisfaction is the foundation of Elite Home Paint.
                </p>
              </div>
            </div>
          </div>

          <section className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3>Quality</h3>
                <p>We never compromise on the quality of our work</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Integrity</h3>
                <p>Honest communication and transparent pricing</p>
              </div>
              <div className="value-card">
                <div className="value-icon">⏰</div>
                <h3>Reliability</h3>
                <p>We meet deadlines and keep our commitments</p>
              </div>
              <div className="value-card">
                <div className="value-icon">😊</div>
                <h3>Customer Focus</h3>
                <p>Your satisfaction is our top priority</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}