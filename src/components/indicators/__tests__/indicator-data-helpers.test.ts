import { calculateBounds, padAndRoundBounds } from '../indicator-data-helpers';

describe('calculateBounds', () => {
  it('returns null for an empty array', () => {
    expect(calculateBounds([])).toBeNull();
  });

  it('returns the min and max of the values', () => {
    expect(calculateBounds([5, -2, 17, 0])).toEqual({ min: -2, max: 17 });
  });
});

describe('padAndRoundBounds', () => {
  it('snaps padded bounds to the tick interval ECharts derives', () => {
    // Employment-rate regression (#4223): data 3..92 with ticksCount 10.
    // Snapping to a finer step than the axis interval (10) left the max
    // between nice ticks, so the boundary label duplicated "100".
    const result = padAndRoundBounds({ min: 3, max: 92 }, 10);
    expect(result).toEqual({ min: 0, max: 110 });
  });

  it('does not extend below zero when the data is non-negative', () => {
    // Electricity-production regression (#588): explicit min 0, derived max
    // from the trend endpoint appeared verbatim as an axis label (22,567.568).
    const result = padAndRoundBounds({ min: 0, max: 22567.568 }, 5);
    expect(result).toEqual({ min: 0, max: 25000 });
  });

  it('does not extend above zero when the data is non-positive', () => {
    const result = padAndRoundBounds({ min: -92, max: -3 }, 10);
    expect(result.max).toBe(0);
    expect(result.min).toBeLessThanOrEqual(-100.9);
  });

  it('produces a range around flat data', () => {
    const result = padAndRoundBounds({ min: 5, max: 5 }, 5);
    expect(result.min).toBeLessThan(5);
    expect(result.max).toBeGreaterThan(5);
  });

  it('returns bounds untouched when the extent is not finite', () => {
    const bounds = { min: Number.NaN, max: 10 };
    expect(padAndRoundBounds(bounds, 5)).toBe(bounds);
  });

  it('returns bounds without float artifacts', () => {
    const result = padAndRoundBounds({ min: 0, max: 0.55 }, 5);
    // Snapped values are multiples of the step with no 0.6000000000000001-style noise
    expect(String(result.max).length).toBeLessThanOrEqual(6);
    expect(result.max).toBeGreaterThanOrEqual(0.55);
  });
});
