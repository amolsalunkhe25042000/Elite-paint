export function calculateLineAmount(qty, rate) {
  return Number(qty || 0) * Number(rate || 0);
}

export function calculateTotals(rows) {
  const subtotal = rows.reduce((sum, row) => {
    return sum + calculateLineAmount(row.qty, row.rate);
  }, 0);

  return {
    subtotal,
    total: subtotal,
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}
