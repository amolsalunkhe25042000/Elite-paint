import { describe, expect, it } from 'vitest';
import { calculateLineAmount, calculateTotals, formatCurrency } from './quotation';
import { findDocumentByReference, normalizeReference } from './documentStorage';

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

  it('finds a saved quotation by reference number regardless of case', () => {
    const docs = [
      { id: 1, type: 'quotation', referenceNo: 'QT-ELITE-001', customerName: 'Asha' },
      { id: 2, type: 'invoice', referenceNo: 'INV-ELITE-002', customerName: 'Ravi' },
    ];

    expect(findDocumentByReference(docs, 'qt-elite-001')).toEqual(docs[0]);
  });

  it('normalizes reference numbers to uppercase for matching', () => {
    expect(normalizeReference('inv-elite-005')).toBe('INV-ELITE-005');
  });
});
