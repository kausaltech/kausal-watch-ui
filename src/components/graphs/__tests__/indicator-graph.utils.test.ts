import {
  collectChartDates,
  formatDateLabel,
  niceTickInterval,
  normalizeDate,
  tickSignificantDigits,
  wrapTitle,
} from '../indicator-graph.utils';

describe('normalizeDate', () => {
  it('converts bare years to YYYY-1-1', () => {
    expect(normalizeDate(2023, 'YEAR')).toBe('2023-1-1');
    expect(normalizeDate(2023, 'MONTH')).toBe('2023-1-1');
  });

  it('truncates dates to the year for YEAR resolution', () => {
    expect(normalizeDate('2023-12-31', 'YEAR')).toBe('2023-1-1');
  });

  it('keeps full dates for finer resolutions', () => {
    expect(normalizeDate('2023-12-31', 'MONTH')).toBe('2023-12-31');
  });

  it('passes unparseable values through as strings', () => {
    expect(normalizeDate('not a date', 'YEAR')).toBe('not a date');
    expect(normalizeDate(12, 'YEAR')).toBe('12');
  });
});

describe('formatDateLabel', () => {
  it('formats by time resolution', () => {
    expect(formatDateLabel('2023-05-15', 'YEAR')).toBe('2023');
    expect(formatDateLabel('2023-05-15', 'MONTH')).toBe('2023-05');
    expect(formatDateLabel('2023-05-15', undefined)).toBe('2023-05-15');
  });

  it('accepts timestamps', () => {
    expect(formatDateLabel(new Date('2023-05-15').getTime(), 'YEAR')).toBe('2023');
  });

  it('passes unparseable values through', () => {
    expect(formatDateLabel('n/a', 'YEAR')).toBe('n/a');
  });
});

describe('niceTickInterval', () => {
  it('mirrors the ECharts nice() rounding', () => {
    // Employment-rate case: span 120 over 10 ticks → interval 10
    expect(niceTickInterval(120, 10)).toBe(10);
    // Electricity case: span 25000 over 5 ticks → interval 5000
    expect(niceTickInterval(25000, 5)).toBe(5000);
    expect(niceTickInterval(1, 5)).toBe(0.2);
  });
});

describe('tickSignificantDigits', () => {
  it('never rounds a tick label below the interval precision', () => {
    // With ticksRounding 1, the 110 boundary tick must not collapse to "100"
    expect(tickSignificantDigits(110, 1, 10)).toBe(2);
    expect(tickSignificantDigits(100, 1, 10)).toBe(2);
    expect(tickSignificantDigits(90, 1, 10)).toBe(1);
  });

  it('keeps the configured rounding when no interval is known', () => {
    expect(tickSignificantDigits(110, 1, null)).toBe(1);
    expect(tickSignificantDigits(0, 1, 10)).toBe(1);
  });
});

describe('collectChartDates', () => {
  const trace = { name: 'a', x: [2022, '2023-06-30'], y: [1, 2] };
  const goal = { name: 'goal', x: ['2025-12-31'], y: [5] };

  it('collects, normalizes and sorts trace and goal dates', () => {
    expect(
      collectChartDates({
        traces: [trace],
        goalTraces: [goal],
        hasTimeDimension: true,
        timeResolution: 'YEAR',
      })
    ).toEqual(['2022-1-1', '2023-1-1', '2025-1-1']);
  });

  it('extends to the non-quantified goal date', () => {
    expect(
      collectChartDates({
        traces: [trace],
        goalTraces: [],
        hasTimeDimension: true,
        timeResolution: 'YEAR',
        nonQuantifiedGoal: { trend: 'INCREASE' as never, date: '2030-06-30' },
      })
    ).toEqual(['2022-1-1', '2023-1-1', '2030-1-1']);
  });

  it('returns the category values for non-time data', () => {
    expect(
      collectChartDates({
        traces: [{ name: 'a', x: ['Cat A', 'Cat B'], y: [1, 2] }],
        goalTraces: [],
        hasTimeDimension: false,
        timeResolution: 'YEAR',
      })
    ).toEqual(['Cat A', 'Cat B']);
  });
});

describe('wrapTitle', () => {
  it('leaves short titles alone', () => {
    expect(wrapTitle('Short title', 50)).toBe('Short title');
  });

  it('wraps long titles at word boundaries', () => {
    expect(wrapTitle('one two three four', 9)).toBe('one two\nthree\nfour');
  });
});
