import { useState } from "react";
import "./CompanySettings.css";

export default function CompanySettings({ company, onSave, onClose }) {
  const [formData, setFormData] = useState(company);
  const [editingTerms, setEditingTerms] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "object" ? { ...prev[field], ...value } : value,
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleTermChange = (index, value) => {
    const newTerms = [...formData.defaultTerms];
    newTerms[index] = value;
    setFormData((prev) => ({ ...prev, defaultTerms: newTerms }));
  };

  const handleAddTerm = () => {
    setFormData((prev) => ({
      ...prev,
      defaultTerms: [...prev.defaultTerms, ""],
    }));
  };

  const handleRemoveTerm = (index) => {
    setFormData((prev) => ({
      ...prev,
      defaultTerms: prev.defaultTerms.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="company-settings-overlay">
      <div className="company-settings-modal">
        <div className="settings-header">
          <h2>Company Settings</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="settings-form" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="settings-section">
            <h3>Company Information</h3>
            <div className="form-row">
              <label>
                Company Name
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., Elite Paint"
                />
              </label>
              <label>
                Logo / Initials
                <input
                  type="text"
                  maxLength="3"
                  value={formData.logo}
                  onChange={(e) => handleChange("logo", e.target.value)}
                  placeholder="E"
                />
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Contact Details</h3>
            <div className="form-row">
              <label>
                Phone
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  placeholder="info@company.com"
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Website
                <input
                  type="url"
                  value={formData.contact.website}
                  onChange={(e) => handleContactChange("website", e.target.value)}
                  placeholder="company.com"
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  value={formData.contact.address}
                  onChange={(e) => handleContactChange("address", e.target.value)}
                  placeholder="Company address"
                />
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Brand Colors</h3>
            <div className="color-grid">
              {Object.entries(formData.colors).map(([key, value]) => (
                <label key={key} className="color-input">
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <input
                    type="color"
                    value={value}
                    onChange={(e) =>
                      handleChange("colors", { ...formData.colors, [key]: e.target.value })
                    }
                  />
                  <code>{value}</code>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <div className="terms-header">
              <h3>Terms & Conditions</h3>
              {!editingTerms && (
                <button
                  type="button"
                  className="edit-terms-btn"
                  onClick={() => setEditingTerms(true)}
                >
                  ✎ Edit
                </button>
              )}
            </div>

            {editingTerms ? (
              <div className="terms-editor">
                {formData.defaultTerms.map((term, index) => (
                  <div key={index} className="term-input">
                    <textarea
                      value={term}
                      onChange={(e) => handleTermChange(index, e.target.value)}
                      placeholder={`Term ${index + 1}`}
                      rows="2"
                    />
                    {formData.defaultTerms.length > 1 && (
                      <button
                        type="button"
                        className="remove-term-btn"
                        onClick={() => handleRemoveTerm(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add-term-btn"
                  onClick={handleAddTerm}
                >
                  + Add Term
                </button>
              </div>
            ) : (
              <div className="terms-preview">
                <ol>
                  {formData.defaultTerms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="settings-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
