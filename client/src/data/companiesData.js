// Multi-company database with templates and branding
export const companiesData = {
  "elite-paint": {
    id: "elite-paint",
    name: "Elite Paint",
    logo: "E",
    colors: {
      primary: "#193738",
      secondary: "#df7048",
      light: "#eaf1ec",
      accent: "#f5bc73",
    },
    contact: {
      phone: "+91 93565 35803",
      email: "info@elite-paint.com",
      website: "elite-paint.vercel.app",
      address: "Shop 4, Kalewadi Phata Road, Pimple Saudagar, Pune, Maharashtra 411027",
    },
    defaultTerms: [
      "40% advance is due before work begins; 80% is due on substantial completion; the final balance is due after handover.",
      "Interior paint workmanship carries a 12-month service warranty for peeling or flaking caused by application defects. Dampness, leaks, cracks, structural movement and external damage are excluded.",
      "Exterior paint and protective coatings carry a 24-month warranty against color fade and chalk resistance under normal exposure conditions.",
    ],
    paintTypes: [
      "Premium Emulsion Paint",
      "Weather Guard Exterior",
      "Glossy Enamel",
      "Matte Finish",
      "Silk Paint",
    ],
    units: ["Room", "Sq. ft.", "Sq. m.", "Wall", "Coat", "Job"],
  },
  "asian-paints": {
    id: "asian-paints",
    name: "Asian Paints",
    logo: "AP",
    colors: {
      primary: "#003366",
      secondary: "#ff6b35",
      light: "#f0f5f9",
      accent: "#ffd700",
    },
    contact: {
      phone: "+91 1800-121-7777",
      email: "info@asianpaints.com",
      website: "asianpaints.com",
      address: "Asian Paints India Ltd",
    },
    defaultTerms: [
      "50% advance payment required at the time of order placement.",
      "Remaining 50% payment due before final delivery and installation.",
      "All Asian Paints products come with manufacturer's warranty as per product specification.",
      "Color shade may vary from sample swatch due to lighting and surface conditions.",
    ],
    paintTypes: [
      "Asian Paints Royale",
      "Asian Paints Apex",
      "Asian Paints Premium",
      "Asian Paints Exterior",
      "Asian Paints Lustre",
    ],
    units: ["Room", "Sq. ft.", "Sq. m.", "Wall", "Coat", "Ltr."],
  },
  "berger-paints": {
    id: "berger-paints",
    name: "Berger Paints",
    logo: "BP",
    colors: {
      primary: "#1a3a52",
      secondary: "#d4522f",
      light: "#eff4f7",
      accent: "#ffb81c",
    },
    contact: {
      phone: "+91 1800-208-8888",
      email: "info@bergerpaints.com",
      website: "bergerpaints.com",
      address: "Berger Paints India Limited",
    },
    defaultTerms: [
      "60% advance payment required to commence work.",
      "Remaining 40% payment on project completion.",
      "All work carried out by certified Berger professionals with full warranty coverage.",
      "Weather-resistant guarantee for all exterior applications.",
    ],
    paintTypes: [
      "Berger WeatherCoat",
      "Berger Luxol",
      "Berger Duco",
      "Berger Premium",
      "Berger Interior",
    ],
    units: ["Room", "Sq. ft.", "Sq. m.", "Wall", "Coat", "Ltr."],
  },
  "birla-paint": {
    id: "birla-paint",
    name: "Birla Paint",
    logo: "BP",
    colors: {
      primary: "#1e5a96",
      secondary: "#e8531b",
      light: "#f2f6f9",
      accent: "#ffc000",
    },
    contact: {
      phone: "+91 1800-425-7525",
      email: "info@birlainterpaint.com",
      website: "birlainterpaint.com",
      address: "Birla Paint India Pvt Ltd",
    },
    defaultTerms: [
      "45% deposit required at project initiation.",
      "45% payment on 50% work completion.",
      "Final 10% payment upon project completion.",
      "All Birla paints backed by comprehensive quality warranty.",
    ],
    paintTypes: [
      "Birla Opus",
      "Birla Luxe Interior",
      "Birla Sandas",
      "Birla Premium Exterior",
      "Birla Signature",
    ],
    units: ["Room", "Sq. ft.", "Sq. m.", "Wall", "Coat", "Ltr."],
  },
};

// Default new item template
export const newItemTemplate = () => ({
  id: crypto.randomUUID(),
  description: "Interior wall painting",
  paint: "Premium emulsion paint",
  qty: 1,
  unit: "Room",
  rate: "",
});

// Default customer details template
export const newCustomerTemplate = () => ({
  customerName: "",
  contact: "",
  address: "",
  date: new Date().toISOString().slice(0, 10),
});

// Quote/Invoice number generator
export const generateDocumentNumber = (type, company, date) => {
  const companyCode = company.id.substring(0, 2).toUpperCase();
  const dateCode = date.replaceAll("-", "").slice(2);
  const docType = type === "quotation" ? "QT" : "INV";
  return `${companyCode}-${docType}-${dateCode}`;
};
