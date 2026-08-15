import { describe, expect, it } from 'vitest';
import { calculateLineAmount, calculateTotals, formatCurrency } from './quotation';

describe('quotation calculations', () => {
  it('calculates a single line amount correctly', () => {
    expect(calculateLineAmount(12, 280)).toBe(3360);
  });

  it('totals all rows and keeps final total consistent', () => {
    const rows = [
      { id: 1, description: 'Primer', unit: 'Ltr', qty: 10, rate: 220 },
      { id: 2, description: 'Emulsion', unit: 'Ltr', qty: 8, rate: 310 },
    ];

    expect(calculateTotals(rows)).toEqual({
      subtotal: 10 * 220 + 8 * 310,
      total: 10 * 220 + 8 * 310,
    });
  });

  it('formats currency in indian rupees format', () => {
    expect(formatCurrency(15420)).toBe('₹15,420');
  });
});
