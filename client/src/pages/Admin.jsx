import { useState } from "react";
import "./Admin.css";
import { calculateTotals, formatCurrency } from "../utils/quotation";

const companyProfile = {
  name: "ElitePaint",
  tagline: "Premium Painting Services in Pune",
  address: "12 Laxmi Colony, Near City Center, Pune, Maharashtra",
  phone: "+91 98765 43210",
  email: "hello@elitepaint.in",
  website: "www.elitepaint.in",
};

const createBlankRow = (id) => ({
  id,
  description: "",
  unit: "",
  qty: 1,
  rate: 0,
});

const defaultRows = [
  {
    id: 1,
    description: "Wall primer and surface preparation",
    unit: "Room",
    qty: 2,
    rate: 2400,
  },
  {
    id: 2,
    description: "Premium emulsion paint application",
    unit: "SQFT",
    qty: 800,
    rate: 18,
  },
  {
    id: 3,
    description: "Ceiling and trim finishing",
    unit: "Job",
    qty: 1,
    rate: 4200,
  },
];

const getReferenceNumber = (type, index = 1) => {
  const prefix = type === "quotation" ? "QT" : "INV";
  return `${prefix}-ELITE-${String(index).padStart(3, "0")}`;
};

function Admin() {
  const today = new Date().toISOString().slice(0, 10);
  const [docType, setDocType] = useState("quotation");
  const [formData, setFormData] = useState({
    referenceNo: getReferenceNumber("quotation"),
    customerName: "",
    contactNo: "",
    date: today,
    siteAddress: "",
    validFor: "15 days",
    scopeOfWork: "Interior wall painting, ceiling touch-up, and surface preparation for the specified area.",
  });
  const [rows, setRows] = useState(defaultRows);
  const [statusMessage, setStatusMessage] = useState("Ready to generate a quotation.");
  const [savedDocs, setSavedDocs] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const stored = window.localStorage.getItem("elite-paint-documents");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const totals = calculateTotals(rows);

  const handleDocTypeChange = (type) => {
    setDocType(type);
    setFormData((prev) => ({
      ...prev,
      referenceNo: getReferenceNumber(type, savedDocs.length + 1),
    }));
    setStatusMessage(
      type === "quotation"
        ? "Quotation mode selected."
        : "Invoice mode selected."
    );
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowChange = (id, field, rawValue) => {
    const value =
      field === "qty" || field === "rate"
        ? Number(rawValue || 0)
        : rawValue;

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const addRow = () => {
    setRows((prevRows) => [...prevRows, createBlankRow(Date.now() + Math.random())]);
  };

  const removeRow = (id) => {
    setRows((prevRows) => {
      if (prevRows.length === 1) return prevRows;
      return prevRows.filter((row) => row.id !== id);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDocument = {
      id: Date.now(),
      type: docType,
      ...formData,
      rows,
      subtotal: totals.subtotal,
      total: totals.total,
      createdAt: new Date().toISOString(),
    };

    const nextDocs = [newDocument, ...savedDocs].slice(0, 8);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "elite-paint-documents",
        JSON.stringify(nextDocs)
      );
    }

    setSavedDocs(nextDocs);
    setStatusMessage(
      `${docType === "quotation" ? "Quotation" : "Invoice"} saved successfully.`
    );
  };

  const handlePrint = () => {
    setStatusMessage("Print dialog opened.");
    window.print();
  };

  const resetForm = () => {
    setRows(defaultRows);
    setFormData({
      referenceNo: getReferenceNumber(docType),
      customerName: "",
      contactNo: "",
      date: today,
      siteAddress: "",
      validFor: "15 days",
      scopeOfWork:
        "Interior wall painting, ceiling touch-up, and surface preparation for the specified area.",
    });
    setStatusMessage("Form reset successfully.");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Quotation & Invoice Management</h1>
        </div>
        <div className="admin-header-actions">
          <button
            type="button"
            className={`toggle-btn ${docType === "quotation" ? "active" : ""}`}
            onClick={() => handleDocTypeChange("quotation")}
          >
            Quotation
          </button>
          <button
            type="button"
            className={`toggle-btn ${docType === "invoice" ? "active" : ""}`}
            onClick={() => handleDocTypeChange("invoice")}
          >
            Invoice
          </button>
        </div>
      </div>

      <div className="admin-layout">
        <aside className="admin-panel">
          <div className="panel-card">
            <h3>Customer details</h3>
            <form onSubmit={handleSubmit} className="quote-form">
              <div className="field-row two-col">
                <label>
                  <span>{docType === "quotation" ? "Quotation No." : "Invoice No."}</span>
                  <input
                    type="text"
                    name="referenceNo"
                    value={formData.referenceNo}
                    onChange={handleFieldChange}
                  />
                </label>
                <label>
                  <span>Date</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFieldChange}
                  />
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  <span>Customer Name</span>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter customer name"
                    value={formData.customerName}
                    onChange={handleFieldChange}
                  />
                </label>
                <label>
                  <span>Contact</span>
                  <input
                    type="text"
                    name="contactNo"
                    placeholder="Mobile / phone"
                    value={formData.contactNo}
                    onChange={handleFieldChange}
                  />
                </label>
              </div>

              <label>
                <span>Site Address</span>
                <textarea
                  name="siteAddress"
                  rows="3"
                  placeholder="Site address"
                  value={formData.siteAddress}
                  onChange={handleFieldChange}
                />
              </label>

              <label>
                <span>Scope of Work</span>
                <textarea
                  name="scopeOfWork"
                  rows="4"
                  value={formData.scopeOfWork}
                  onChange={handleFieldChange}
                />
              </label>

              <label>
                <span>Valid For</span>
                <input
                  type="text"
                  name="validFor"
                  value={formData.validFor}
                  onChange={handleFieldChange}
                />
              </label>

              <div className="item-table-header">
                <h4>Quotation Details</h4>
                <button type="button" className="btn btn-dark" onClick={addRow}>
                  + Add Row
                </button>
              </div>

              <div className="line-items">
                {rows.map((row, index) => (
                  <div className="line-item" key={row.id}>
                    <span className="serial-no">{index + 1}</span>
                    <input
                      type="text"
                      placeholder="Description"
                      value={row.description}
                      onChange={(event) =>
                        handleRowChange(row.id, "description", event.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={row.unit}
                      onChange={(event) =>
                        handleRowChange(row.id, "unit", event.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Qty"
                      value={row.qty}
                      onChange={(event) =>
                        handleRowChange(row.id, "qty", event.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Rate"
                      value={row.rate}
                      onChange={(event) =>
                        handleRowChange(row.id, "rate", event.target.value)
                      }
                    />
                    <div className="amount-box">
                      {formatCurrency(row.qty * row.rate)}
                    </div>
                    <button
                      type="button"
                      className="remove-row"
                      onClick={() => removeRow(row.id)}
                      aria-label="Remove row"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="summary-box">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatCurrency(totals.subtotal)}</strong>
                </div>
                <div>
                  <span>Total</span>
                  <strong>{formatCurrency(totals.total)}</strong>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-light" onClick={resetForm}>
                  Reset
                </button>
                <button type="button" className="btn btn-outline" onClick={handlePrint}>
                  Print
                </button>
                <button type="submit" className="btn btn-primary">
                  Save {docType === "quotation" ? "Quotation" : "Invoice"}
                </button>
              </div>
            </form>
          </div>
        </aside>

        <main className="document-preview area">
          <div className="status-pill">{statusMessage}</div>

          <div className="document-sheet">
            <header className="sheet-header">
              <div className="brand-box">
                <div className="brand-mark">EP</div>
                <div>
                  <h2>{companyProfile.name}</h2>
                  <p>{companyProfile.tagline}</p>
                </div>
              </div>

              <div className="sheet-meta">
                <p className="meta-label">
                  {docType === "quotation" ? "Quotation" : "Invoice"}
                </p>
                <p>{formData.referenceNo}</p>
                <p>Date: {formData.date}</p>
                <p>Valid for: {formData.validFor}</p>
              </div>
            </header>

            <div className="company-contact">
              <div>
                <strong>Address</strong>
                <span>{companyProfile.address}</span>
              </div>
              <div>
                <strong>Contact</strong>
                <span>{companyProfile.phone}</span>
              </div>
              <div>
                <strong>Email</strong>
                <span>{companyProfile.email}</span>
              </div>
            </div>

            <section className="customer-block">
              <div>
                <span className="field-label">Customer Name</span>
                <strong>{formData.customerName || "Customer Name"}</strong>
              </div>
              <div>
                <span className="field-label">Contact</span>
                <strong>{formData.contactNo || "Customer contact"}</strong>
              </div>
              <div>
                <span className="field-label">Site Address</span>
                <strong>{formData.siteAddress || "Site address"}</strong>
              </div>
            </section>

            <section className="scope-block">
              <h4>Scope of Work</h4>
              <p>{formData.scopeOfWork}</p>
            </section>

            <table className="quote-table">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Qty</th>
                  <th>Rate (₹)</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.description || "-"}</td>
                    <td>{row.unit || "-"}</td>
                    <td>{row.qty || 0}</td>
                    <td>{formatCurrency(row.rate)}</td>
                    <td>{formatCurrency(row.qty * row.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="totals-panel">
              <div>
                <span>Subtotal</span>
                <strong>{formatCurrency(totals.subtotal)}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>{formatCurrency(totals.total)}</strong>
              </div>
            </div>

            <section className="terms-box">
              <h4>Terms & Conditions</h4>
              <ol>
                <li>
                  <strong>Timely Delivery:</strong> We complete the work on the agreed schedule. If the delay is due to our fault, no extra labor charges will be applied.
                </li>
                <li>
                  <strong>Payment Terms:</strong> 40% advance at booking, 40% when 90% of the work is completed, and the remaining 20% after final completion.
                </li>
                <li>
                  <strong>5-Year Workmanship Warranty:</strong> We provide a 5-year warranty for painting workmanship. The warranty does not cover wall cracks, water leakage, seepage, dampness, structural damage, or damage caused by external factors.
                </li>
                <li>
                  <strong>No Hidden Charges:</strong> The quoted price is fixed. Any additional work requested by the customer will be charged only after prior approval.
                </li>
              </ol>
            </section>
          </div>

          <div className="recent-docs">
            <h3>Recent saved records</h3>
            {savedDocs.length === 0 ? (
              <p>No saved quotations or invoices yet.</p>
            ) : (
              <ul>
                {savedDocs.map((doc) => (
                  <li key={doc.id}>
                    <span>{doc.type === "quotation" ? "Quotation" : "Invoice"}</span>
                    <strong>{doc.referenceNo}</strong>
                    <small>{doc.customerName || "Customer"}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
