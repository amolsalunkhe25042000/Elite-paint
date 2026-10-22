export const STORAGE_KEY = {
  quotation: "elite-paint-documents-quotation",
  invoice: "elite-paint-documents-invoice",
  customerRequests: "elite-paint-customer-requests",
};

export function getDocumentStorageKey(type = "quotation") {
  return type === "invoice" ? STORAGE_KEY.invoice : STORAGE_KEY.quotation;
}

export function normalizeReference(value = "") {
  return String(value).trim().toUpperCase();
}

export function findDocumentByReference(documents, searchValue = "", type = null) {
  const normalizedSearch = normalizeReference(searchValue);

  if (!normalizedSearch) {
    return null;
  }

  return (
    documents.find((doc) => {
      const sameType = type ? doc?.type === type : true;
      const reference = normalizeReference(doc?.referenceNo || "");
      return sameType && reference === normalizedSearch;
    }) || null
  );
}

export function loadDocuments(type = "quotation") {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(getDocumentStorageKey(type));
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function saveDocuments(documents, type = "quotation") {
  if (typeof window !== "undefined") {
    const filtered = documents.filter((doc) => doc?.type === type);
    window.localStorage.setItem(getDocumentStorageKey(type), JSON.stringify(filtered));
  }

  return documents;
}

export function deleteDocumentById(documents, id) {
  return documents.filter((doc) => doc.id !== id);
}

export function loadCustomerRequests() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY.customerRequests);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function saveCustomerRequests(requests = []) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY.customerRequests, JSON.stringify(requests));
  }

  return requests;
}

export function addCustomerRequest(request) {
  const existingRequests = loadCustomerRequests();
  const nextRequest = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...request,
  };

  const nextRequests = [nextRequest, ...existingRequests];
  saveCustomerRequests(nextRequests);
  return nextRequest;
}

export function deleteCustomerRequestById(requests, id) {
  return requests.filter((request) => request.id !== id);
}
