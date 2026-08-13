import { useState } from "react";
import CompanySettings from "../components/CompanySettings";
import { companiesData, newItemTemplate, newCustomerTemplate } from "../data/companiesData";
import "./Admin.css";

const today = () => new Date().toISOString().slice(0, 10);
const money = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value) || 0);

export default function Admin() {
  const [authorised, setAuthorised] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Company Management
  const [selectedCompanyId, setSelectedCompanyId] = useState("elite-paint");
  const [companies, setCompanies] = useState(companiesData);
  const [showSettings, setShowSettings] = useState(false);
  const selectedCompany = companies[selectedCompanyId];

  // Document Management
  const [documentType, setDocumentType] = useState("quotation");
  const [invoiceStage, setInvoiceStage] = useState("40");
  const [details, setDetails] = useState(newCustomerTemplate());
  const [items, setItems] = useState([newItemTemplate()]);
  const [discount, setDiscount] = useState("");
  const [customTerms, setCustomTerms] = useState(selectedCompany?.defaultTerms || []);
  const [editingId, setEditingId] = useState(null);
  const [savedDocuments, setSavedDocuments] = useState(() =>
    JSON.parse(localStorage.getItem("elite-paint-documents") || "[]")
  );

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (Number(item.qty) || 0) * (Number(item.rate) || 0), 0);
  const discountAmount = (subtotal * Math.min(Math.max(Number(discount) || 0, 0), 100)) / 100;
  const total = subtotal - discountAmount;
  const invoiceAmount = documentType === "invoice" ? (total * Number(invoiceStage)) / 100 : total;
  const title = documentType === "quotation" ? "Quotation" : "Tax Invoice";
  const documentNumber = editingId || `${selectedCompanyId.substring(0, 2).toUpperCase()}-${documentType === "quotation" ? "QT" : "INV"}-${details.date.replaceAll("-", "").slice(2) || "DRAFT"}`;

  // Handlers
  const changeDetail = (event) =>
    setDetails((current) => ({ ...current, [event.target.name]: event.target.value }));

  const updateItem = (id, field, value) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const resetDocument = () => {
    setDetails(newCustomerTemplate());
    setItems([newItemTemplate()]);
    setDiscount("");
    setEditingId(null);
    setInvoiceStage("40");
    setCustomTerms(selectedCompany.defaultTerms);
  };

  const handleCompanyChange = (companyId) => {
    setSelectedCompanyId(companyId);
    setCustomTerms(companies[companyId].defaultTerms);
    resetDocument();
  };

  const handleSaveSettings = (updatedCompany) => {
    const newCompanies = { ...companies, [updatedCompany.id]: updatedCompany };
    setCompanies(newCompanies);
    localStorage.setItem("elite-paint-companies", JSON.stringify(newCompanies));
    setShowSettings(false);
  };

  const unlock = (event) => {
    event.preventDefault();
    if (password === "Amol@123") {
      setAuthorised(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const save = () => {
    const record = {
      id: editingId || `${selectedCompanyId.substring(0, 2).toUpperCase()}-${documentType === "quotation" ? "QT" : "INV"}-${Date.now().toString().slice(-7)}`,
      companyId: selectedCompanyId,
      documentType,
      invoiceStage,
      details,
      items,
      discount,
      customTerms,
      updatedAt: new Date().toLocaleString("en-IN"),
    };
    const next = editingId ? savedDocuments.map((doc) => (doc.id === editingId ? record : doc)) : [record, ...savedDocuments];
    localStorage.setItem("elite-paint-documents", JSON.stringify(next));
    setSavedDocuments(next);
    setEditingId(record.id);
  };

  const edit = (record) => {
    setSelectedCompanyId(record.companyId);
    setDocumentType(record.documentType);
    setInvoiceStage(record.invoiceStage);
    setDetails(record.details);
    setItems(record.items);
    setDiscount(record.discount);
    setCustomTerms(record.customTerms);
    setEditingId(record.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = (id) => {
    const next = savedDocuments.filter((doc) => doc.id !== id);
    localStorage.setItem("elite-paint-documents", JSON.stringify(next));
    setSavedDocuments(next);
    if (editingId === id) resetDocument();
  };

  if (!authorised)
    return (
      <main className="admin-login">
        <section className="login-card">
          <div className="admin-lock">E</div>
          <p className="eyebrow">Elite Paint workspace</p>
          <h1>Admin access</h1>
          <p>Sign in to create customer-ready estimates and invoices.</p>
          <form onSubmit={unlock}>
            <label>
              Password
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </label>
            {error && <span className="admin-error">{error}</span>}
            <button className="btn btn-primary" type="submit">
              Open workspace →
            </button>
          </form>
        </section>
      </main>
    );

  return (
    <main className="admin-page">
      <section className="admin-top">
        <div className="container">
          <div>
            <p className="eyebrow">Admin workspace</p>
            <h1>Professional Quote & Invoice Builder</h1>
            <p>Create stunning quotations and invoices for multiple paint brands with customizable branding.</p>
          </div>
          <button className="admin-signout" onClick={() => setAuthorised(false)}>
            Sign out
          </button>
        </div>
      </section>

      <section className="admin-work container">
        <aside className="document-sidebar">
          <div className="company-selector">
            <p className="eyebrow">Select Company</p>
            <select
              value={selectedCompanyId}
              onChange={(e) => handleCompanyChange(e.target.value)}
              className="company-dropdown"
            >
              {Object.entries(companies).map(([id, company]) => (
                <option key={id} value={id}>
                  {company.name}
                </option>
              ))}
            </select>
            <button className="settings-btn" onClick={() => setShowSettings(true)}>
              ⚙ Company Settings
            </button>
          </div>

          <button
            className={documentType === "quotation" ? "selected" : ""}
            onClick={() => {
              resetDocument();
              setDocumentType("quotation");
            }}
          >
            <span>01</span>
            Quotation
            <small>Before work starts</small>
          </button>

          <button
            className={documentType === "invoice" ? "selected" : ""}
            onClick={() => {
              resetDocument();
              setDocumentType("invoice");
            }}
          >
            <span>02</span>
            Invoice
            <small>Milestone payment</small>
          </button>

          <div className="milestone-note">
            <strong>Payment plan</strong>
            <p>
              40% advance
              <br />
              80% work completed
              <br />
              100% final completion
            </p>
          </div>
        </aside>

        <div className="document-editor">
          <div className="editor-heading">
            <div>
              <p className="eyebrow">{documentType === "quotation" ? "Project estimate" : "Payment request"}</p>
              <h2>{title} details</h2>
            </div>
            <span className="doc-number">{documentNumber}</span>
          </div>

          {documentType === "invoice" && (
            <fieldset className="stage-picker">
              <legend>Invoice milestone</legend>
              {[
                ["40", "40% advance"],
                ["80", "80% completed"],
                ["100", "100% final invoice"],
              ].map(([value, label]) => (
                <label key={value} className={invoiceStage === value ? "active" : ""}>
                  <input
                    type="radio"
                    value={value}
                    checked={invoiceStage === value}
                    onChange={(event) => setInvoiceStage(event.target.value)}
                  />
                  {label}
                </label>
              ))}
            </fieldset>
          )}

          <form className="document-form" onSubmit={(event) => { event.preventDefault(); save(); }}>
            <fieldset className="form-section">
              <legend>Customer information</legend>
              <div className="form-columns">
                <label>
                  Customer name
                  <input
                    required
                    name="customerName"
                    value={details.customerName}
                    onChange={changeDetail}
                    placeholder="Customer full name"
                  />
                </label>
                <label>
                  Contact number
                  <input
                    required
                    name="contact"
                    value={details.contact}
                    onChange={changeDetail}
                    placeholder="Phone / WhatsApp"
                  />
                </label>
              </div>
              <div className="form-columns">
                <label>
                  Document date
                  <input required type="date" name="date" value={details.date} onChange={changeDetail} />
                </label>
                <label>
                  Customer address
                  <textarea
                    required
                    name="address"
                    value={details.address}
                    onChange={changeDetail}
                    rows="3"
                    placeholder="House / building, area, city"
                  />
                </label>
              </div>
            </fieldset>

            <div className="line-items">
              <div className="line-items-title">
                <div>
                  <p className="eyebrow">Work items</p>
                  <h3>Painting scope & pricing</h3>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setItems((current) => [...current, newItemTemplate()])}
                >
                  + Add item
                </button>
              </div>
              {items.map((item, index) => (
                <div className="item-card" key={item.id}>
                  <div className="item-card-top">
                    <div>
                      <strong>Item {index + 1}</strong>
                      <span className="item-rate-display">{money((Number(item.qty) || 0) * (Number(item.rate) || 0))}</span>
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        className="delete-item"
                        onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}
                      >
                        ✕ Delete
                      </button>
                    )}
                  </div>
                  <fieldset className="item-fields">
                    <div className="form-full">
                      <label>
                        Work description
                        <input
                          value={item.description}
                          onChange={(event) => updateItem(item.id, "description", event.target.value)}
                          placeholder="e.g. Ceiling painting"
                        />
                      </label>
                    </div>
                    <div className="form-full">
                      <label>
                        Paint / material
                        <input
                          value={item.paint}
                          onChange={(event) => updateItem(item.id, "paint", event.target.value)}
                          placeholder="e.g. Asian Paints Royale"
                        />
                      </label>
                    </div>
                    <div className="item-numbers">
                      <label>
                        Quantity
                        <input
                          min="0"
                          type="number"
                          value={item.qty}
                          onChange={(event) => updateItem(item.id, "qty", event.target.value)}
                          placeholder="0"
                        />
                      </label>
                      <label>
                        Unit
                        <select value={item.unit} onChange={(event) => updateItem(item.id, "unit", event.target.value)}>
                          {selectedCompany.units.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Rate per unit (₹)
                        <input
                          min="0"
                          type="number"
                          value={item.rate}
                          onChange={(event) => updateItem(item.id, "rate", event.target.value)}
                          placeholder="0"
                        />
                      </label>
                    </div>
                  </fieldset>
                </div>
              ))}
            </div>

            <fieldset className="form-section">
              <legend>Pricing & totals</legend>
              <div className="discount-row">
                <label>
                  Optional discount (%)
                  <input
                    min="0"
                    max="100"
                    type="number"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                    placeholder="0"
                  />
                </label>
              </div>
              <div className="totals-summary">
                <div className="total-line">
                  <span>Subtotal</span>
                  <strong>{money(subtotal)}</strong>
                </div>
                {discountAmount > 0 && (
                  <div className="total-line discount-line">
                    <span>Discount</span>
                    <strong>− {money(discountAmount)}</strong>
                  </div>
                )}
                {documentType === "invoice" && (
                  <div className="total-line">
                    <span>Milestone ({invoiceStage}%)</span>
                    <strong>{money(invoiceAmount)}</strong>
                  </div>
                )}
                <div className="total-line final-total">
                  <span>{documentType === "quotation" ? "Estimated total" : "Amount due"}</span>
                  <strong>{money(documentType === "invoice" ? invoiceAmount : total)}</strong>
                </div>
              </div>
            </fieldset>

            <div className="form-actions">
              <div className="action-buttons">
                <button className="btn btn-primary" type="submit">
                  ✓ {editingId ? "Update" : "Save"} document
                </button>
                <button className="btn btn-success" type="button" onClick={() => window.print()}>
                  ⬇ Print / PDF →
                </button>
              </div>
              <button className="text-button" type="button" onClick={resetDocument}>
                Start new document
              </button>
            </div>

            <section className="saved-documents">
              <div>
                <p className="eyebrow">Local records</p>
                <h3>Saved documents</h3>
              </div>
              {savedDocuments.length === 0 ? (
                <p>No saved quotations or invoices yet.</p>
              ) : (
                savedDocuments.map((doc) => (
                  <div className="saved-document" key={doc.id}>
                    <div>
                      <strong>{doc.id}</strong>
                      <span>
                        {doc.documentType} · {doc.details.customerName || "Unnamed customer"}
                      </span>
                      <small>Updated {doc.updatedAt}</small>
                    </div>
                    <button type="button" onClick={() => edit(doc)}>
                      Edit
                    </button>
                    <button type="button" className="delete-item" onClick={() => remove(doc.id)}>
                      Delete
                    </button>
                  </div>
                ))
              )}
            </section>
          </form>
        </div>

        <article className="document-preview" id="print-document">
          <header style={{ borderColor: selectedCompany.colors.light }}>
            <div className="preview-brand">
              <span style={{ background: selectedCompany.colors.primary, color: selectedCompany.colors.accent }}>
                {selectedCompany.logo}
              </span>
              <div>
                {selectedCompany.name}
                <b style={{ color: selectedCompany.colors.secondary }}>Paint</b>
                <small>PROFESSIONAL STUDIO</small>
              </div>
            </div>
            <div>
              <strong>{title.toUpperCase()}</strong>
              <p>{documentNumber}</p>
            </div>
          </header>

          <div className="preview-meta">
            <div>
              <span>Billed to</span>
              <strong>{details.customerName || "Customer name"}</strong>
              <p>
                {details.contact || "Contact number"}
                <br />
                {details.address || "Customer address"}
              </p>
            </div>
            <div>
              <span>Date</span>
              <strong>
                {details.date
                  ? new Date(`${details.date}T00:00:00`).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </strong>
              <p>
                {selectedCompany.contact.website}
                <br />
                {selectedCompany.contact.phone}
                <br />
                {selectedCompany.contact.address}
              </p>
            </div>
          </div>

          <div className="preview-table preview-items">
            <div>
              <span>Description & material</span>
              <span>Qty</span>
              <span>Amount</span>
            </div>
            {items.map((item) => (
              <div key={item.id}>
                <p>
                  <b>{item.description || "Painting work"}</b>
                  <small>{item.paint || "Paint / material"}</small>
                </p>
                <span>
                  {item.qty || 0} {item.unit}
                </span>
                <strong>{money((Number(item.qty) || 0) * (Number(item.rate) || 0))}</strong>
              </div>
            ))}
          </div>

          <div className="preview-calculation">
            <p>
              Subtotal <strong>{money(subtotal)}</strong>
            </p>
            {discountAmount > 0 && (
              <p>
                Discount ({discount}%) <strong>− {money(discountAmount)}</strong>
              </p>
            )}
            {documentType === "invoice" && (
              <p>
                Milestone ({invoiceStage}%) <strong>{money(invoiceAmount)}</strong>
              </p>
            )}
          </div>

          <div className="preview-total" style={{ background: selectedCompany.colors.primary }}>
            <span>{documentType === "quotation" ? "Estimated total" : "Amount due"}</span>
            <strong>{money(documentType === "invoice" ? invoiceAmount : total)}</strong>
          </div>

          <footer>
            <strong>Terms & Conditions</strong>
            <ol>
              {customTerms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ol>
          </footer>
        </article>
      </section>

      {showSettings && (
        <CompanySettings
          company={selectedCompany}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </main>
  );
}
