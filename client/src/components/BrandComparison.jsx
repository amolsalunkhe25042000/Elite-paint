import React from 'react';
import './BrandComparison.css';

// Brand comparison data
const brandFeatures = {
  "elite-paint": {
    name: "Elite Paint",
    logo: "E",
    primaryColor: "#193738",
    features: [
      "✓ Premium interior/exterior paints",
      "✓ 12-month interior warranty",
      "✓ 24-month exterior warranty",
      "✓ Professional studio experience",
      "✓ Customizable paint types",
      "✓ Flexible payment terms"
    ],
    paymentTerm: "40% + 80% + 100%",
    paintTypes: 5,
    warranty: "12-24 months"
  },
  "asian-paints": {
    name: "Asian Paints",
    logo: "AP",
    primaryColor: "#003366",
    features: [
      "✓ Royale premium range",
      "✓ Apex professional series",
      "✓ Established brand trust",
      "✓ Wide paint selection",
      "✓ Standardized quality",
      "✓ Color matching service"
    ],
    paymentTerm: "50% + 50%",
    paintTypes: 5,
    warranty: "Manufacturer backed"
  },
  "berger-paints": {
    name: "Berger Paints",
    logo: "BP",
    primaryColor: "#1a3a52",
    features: [
      "✓ WeatherCoat durability",
      "✓ Luxol premium quality",
      "✓ Weather-resistant guarantee",
      "✓ Professional application",
      "✓ Full warranty coverage",
      "✓ Certified professionals"
    ],
    paymentTerm: "60% + 40%",
    paintTypes: 5,
    warranty: "Full warranty"
  },
  "birla-paint": {
    name: "Birla Paint",
    logo: "BP",
    primaryColor: "#1e5a96",
    features: [
      "✓ Opus signature collection",
      "✓ Luxe interior range",
      "✓ Milestone payment flexibility",
      "✓ Quality assurance",
      "✓ Professional application",
      "✓ Comprehensive warranty"
    ],
    paymentTerm: "45% + 45% + 10%",
    paintTypes: 5,
    warranty: "Quality backed"
  }
};

// System features comparison
const systemFeatures = [
  { feature: "Multi-company support", elite: "✓", asian: "✓", berger: "✓", birla: "✓" },
  { feature: "Customizable branding", elite: "✓", asian: "✓", berger: "✓", birla: "✓" },
  { feature: "Editable T&C", elite: "✓", asian: "✓", berger: "✓", birla: "✓" },
  { feature: "Quote generation", elite: "✓", asian: "✓", berger: "✓", birla: "✓" },
  { feature: "Invoice creation", elite: "✓", asian: "✓", berger: "✓", birla: "✓" },
  { feature: "Milestone tracking", elite: "✓", asian: "—", berger: "✓", birla: "✓" },
  { feature: "PDF export", elite: "✓", asian: "✓", berger: "✓", birla: "✓" },
  { feature: "Local storage", elite: "✓", asian: "✓", berger: "✓", birla: "✓" },
  { feature: "Professional preview", elite: "✓", asian: "✓", berger: "✓", birla: "✓" }
];

export default function BrandComparison() {
  return (
    <div className="brand-comparison">
      <section className="comparison-header">
        <h1>Paint Brand Quote Builder - Feature Comparison</h1>
        <p>Professional quotation and invoice system supporting multiple paint companies</p>
      </section>

      <section className="brand-cards">
        <div className="brands-grid">
          {Object.entries(brandFeatures).map(([key, brand]) => (
            <div key={key} className="brand-card">
              <div className="brand-header" style={{ background: brand.primaryColor }}>
                <span className="brand-logo">{brand.logo}</span>
              </div>
              <div className="brand-content">
                <h3>{brand.name}</h3>
                <div className="brand-meta">
                  <div className="meta-item">
                    <span className="meta-label">Payment Terms</span>
                    <span className="meta-value">{brand.paymentTerm}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Paint Types</span>
                    <span className="meta-value">{brand.paintTypes}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Warranty</span>
                    <span className="meta-value">{brand.warranty}</span>
                  </div>
                </div>
                <ul className="features-list">
                  {brand.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="system-features">
        <h2>System Capabilities</h2>
        <div className="features-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Elite Paint</th>
                <th>Asian Paints</th>
                <th>Berger Paints</th>
                <th>Birla Paint</th>
              </tr>
            </thead>
            <tbody>
              {systemFeatures.map((row, idx) => (
                <tr key={idx}>
                  <td className="feature-name">{row.feature}</td>
                  <td>{row.elite}</td>
                  <td>{row.asian}</td>
                  <td>{row.berger}</td>
                  <td>{row.birla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="advantages">
        <h2>Why Use This System?</h2>
        <div className="advantages-grid">
          <div className="advantage">
            <h4>🎨 Professional Branding</h4>
            <p>Customize colors, logos, and company details for each brand</p>
          </div>
          <div className="advantage">
            <h4>📝 Flexible Terms</h4>
            <p>Edit and customize terms & conditions per company or document</p>
          </div>
          <div className="advantage">
            <h4>🧮 Accurate Calculations</h4>
            <p>Auto-calculated subtotals, discounts, and payment milestones</p>
          </div>
          <div className="advantage">
            <h4>💾 Local Storage</h4>
            <p>All documents saved securely in browser, no cloud required</p>
          </div>
          <div className="advantage">
            <h4>📄 PDF Ready</h4>
            <p>Print-optimized layouts that convert beautifully to PDF</p>
          </div>
          <div className="advantage">
            <h4>⚡ Fast & Responsive</h4>
            <p>Works on desktop, tablet, and mobile devices seamlessly</p>
          </div>
        </div>
      </section>

      <section className="getting-started">
        <h2>Getting Started</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <div>
              <h4>Select Company</h4>
              <p>Choose which paint brand from the dropdown</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <div>
              <h4>Choose Document Type</h4>
              <p>Quotation or Invoice with optional milestones</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <div>
              <h4>Fill Details</h4>
              <p>Customer info, items, rates, and discount</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <div>
              <h4>Save & Export</h4>
              <p>Save locally and export as professional PDF</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
