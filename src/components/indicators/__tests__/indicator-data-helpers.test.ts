import {
  calculateBounds,
  canNormalizeValues,
  generateCubeFromValues,
  generateGoalTraces,
  getIndicatorGraphSpecification,
  getTraceTimeRange,
  padAndRoundBounds,
} from '../indicator-data-helpers';

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

describe('generateGoalTraces', () => {
  const i18n = { t: (key: string) => key };

  it('skips goals without a target date instead of crashing', () => {
    const indicator = {
      timeResolution: 'YEAR',
      goals: [
        { date: '2035-12-31', value: 10, categories: [] },
        { date: null, value: 5, categories: [] },
        null,
        { date: '2030-06-30', value: 20, categories: [] },
      ],
    };
    const [goalTraces, bounds] = generateGoalTraces(indicator, [], i18n);
    expect(goalTraces).toHaveLength(1);
    // Undated goals are skipped; the rest are sorted chronologically
    expect(goalTraces[0].x).toEqual(['2030-1-1', '2035-1-1']);
    expect(goalTraces[0].y).toEqual([20, 10]);
    expect(bounds).toEqual({ min: 10, max: 20 });
  });

  it('returns no traces when no goal has a date', () => {
    const indicator = { timeResolution: 'YEAR', goals: [{ date: null, value: 5 }] };
    const [goalTraces, bounds] = generateGoalTraces(indicator, [], i18n);
    expect(goalTraces).toEqual([]);
    expect(bounds).toBeNull();
  });
});

describe('generateCubeFromValues', () => {
  it('preserves null dates instead of crashing on yearly normalization', () => {
    const indicator = { timeResolution: 'YEAR' };
    const spec = { dimensions: [] };
    const values = [
      { date: '2023-12-31', value: 1, categories: [] },
      { date: null, value: 2, categories: [] },
    ];
    const cube = generateCubeFromValues(indicator, spec, values) as Array<{
      date: string | null;
      value: number;
    }>;
    expect(cube).toHaveLength(2);
    const dates = cube.map((v) => v.date);
    expect(dates).toContain('2023-1-1');
    expect(dates).toContain(null);
  });
});

describe('canNormalizeValues', () => {
  const value = (normalized: number | null, normalizerId = 'pop') => ({
    date: '2020-01-01',
    value: 10,
    categories: [],
    normalizedValues: [{ normalizerId, value: normalized }],
  });

  it('accepts values that all carry a numeric normalized entry', () => {
    expect(canNormalizeValues([value(1), value(2)], 'pop')).toBe(true);
  });

  it('rejects a value without a matching normalized entry', () => {
    expect(canNormalizeValues([value(1), value(2, 'other')], 'pop')).toBe(false);
    expect(canNormalizeValues([value(1), { date: null, value: 3, categories: [] }], 'pop')).toBe(
      false
    );
  });

  it('rejects normalizations whose entries are all null', () => {
    expect(canNormalizeValues([value(null), value(null)], 'pop')).toBe(false);
  });

  it('accepts a normalization with some null entries', () => {
    expect(canNormalizeValues([value(null), value(2)], 'pop')).toBe(true);
  });
});

describe('getIndicatorGraphSpecification', () => {
  it('falls back to a zero extent when no value holds a number', () => {
    const spec = getIndicatorGraphSpecification(
      {
        id: '1',
        name: 'Test',
        organization: { id: 'org', name: 'Org' },
        values: [{ date: '2020-01-01', value: null, categories: [] }],
        dimensions: [],
      },
      null,
      (key) => key,
      null
    );
    expect(spec.bounds).toEqual({ min: 0, max: 0 });
  });
});

describe('getTraceTimeRange', () => {
  it('spans the earliest and latest dates across all traces and points', () => {
    const range = getTraceTimeRange([{ x: ['2021-01-01', '2019-01-01'] }, { x: ['2023-06-01'] }]);
    expect(range).toEqual({
      min: new Date('2019-01-01').getTime(),
      max: new Date('2023-06-01').getTime(),
    });
  });

  it('ignores null dates and non-date values', () => {
    expect(getTraceTimeRange([{ x: [null, 'Housing', '2020-01-01', 2020] }])).toEqual({
      min: new Date('2020-01-01').getTime(),
      max: new Date('2020-01-01').getTime(),
    });
  });

  it('is undefined without any dates', () => {
    expect(getTraceTimeRange([{ x: ['Housing', 'Transport'] }])).toBeUndefined();
    expect(getTraceTimeRange([])).toBeUndefined();
  });
});
