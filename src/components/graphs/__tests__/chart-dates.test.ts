import {
  compareDates,
  datesSpanSingleYear,
  formatDateLabel,
  normalizeDate,
  parseChartDate,
} from '../chart-dates';

describe('normalizeDate', () => {
  it('converts bare years to YYYY-1-1', () => {
    expect(normalizeDate(2023, 'YEAR')).toBe('2023-01-01');
    expect(normalizeDate(2023, 'MONTH')).toBe('2023-01-01');
  });

  it('truncates dates to the year for YEAR resolution', () => {
    expect(normalizeDate('2023-12-31', 'YEAR')).toBe('2023-01-01');
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

  it('reads year-only strings as text', () => {
    // new Date('2020') is UTC midnight, which is still 2019 in the test
    // timezone (see jest.config.ts)
    expect(formatDateLabel('2020', 'YEAR')).toBe('2020');
    expect(formatDateLabel('2020', 'MONTH')).toBe('2020-01');
  });

  it('passes unparseable values through', () => {
    expect(formatDateLabel('n/a', 'YEAR')).toBe('n/a');
  });
});

describe('parseChartDate', () => {
  it('reads date strings as local midnight, like ECharts', () => {
    expect(parseChartDate('2020-01-01')).toBe(new Date(2020, 0, 1).getTime());
    expect(parseChartDate('2020-1-1')).toBe(new Date(2020, 0, 1).getTime());
    expect(parseChartDate('2020')).toBe(new Date(2020, 0, 1).getTime());
  });

  it('passes timestamps through', () => {
    expect(parseChartDate(1577836800000)).toBe(1577836800000);
  });
});

describe('timezone stability of date handling', () => {
  // These must hold in every timezone (see the TZ-matrix run in CI/dev):
  // ISO date-only strings parse as UTC midnight, the internal non-ISO
  // YYYY-1-1 form parses as local midnight — both must label the same period.
  it('labels ISO date-only values by their calendar parts', () => {
    expect(formatDateLabel('2024-01-01', 'MONTH')).toBe('2024-01');
    expect(formatDateLabel('2024-01-01', 'YEAR')).toBe('2024');
    expect(formatDateLabel('2024-01-05', undefined)).toBe('2024-01-05');
  });

  it('labels the internal non-ISO normalized form by its calendar parts', () => {
    expect(formatDateLabel('2024-1-1', 'YEAR')).toBe('2024');
    expect(formatDateLabel('2024-1-1', 'MONTH')).toBe('2024-01');
  });

  it('normalizes date strings without timezone-dependent parsing', () => {
    expect(normalizeDate('2024-01-01', 'YEAR')).toBe('2024-01-01');
    expect(normalizeDate('2024-1-1', 'YEAR')).toBe('2024-01-01');
    expect(normalizeDate('2024-12-31', 'YEAR')).toBe('2024-01-01');
  });
});

describe('timestamp labels match ECharts date parsing', () => {
  // ECharts parses timezone-less date strings with its OWN parser as LOCAL
  // time (unlike native Date, which reads ISO date-only strings as UTC).
  // Axis tick timestamps and tooltip axisValues therefore sit on local
  // calendar boundaries, and formatDateLabel must read them back with local
  // getters: UTC getters would report the previous period east of UTC.
  // Run under several TZ values (see the TZ-matrix runs) to verify.
  const { time } = require('echarts') as { time: { parse: (v: string) => Date } };

  it('labels an ECharts-parsed date-only value as its own period in any timezone', () => {
    const timestamp = time.parse('2024-01-01').getTime();
    expect(formatDateLabel(timestamp, 'YEAR')).toBe('2024');
    expect(formatDateLabel(timestamp, 'MONTH')).toBe('2024-01');
    expect(formatDateLabel(timestamp, undefined)).toBe('2024-01-01');
  });
});

describe('normalizeDate with null dates', () => {
  it('passes null through as a string instead of the 1970 epoch', () => {
    expect(normalizeDate(null, 'YEAR')).toBe('null');
    expect(normalizeDate(undefined, 'YEAR')).toBe('undefined');
  });
});

describe('compareDates', () => {
  it('orders dates chronologically across formats', () => {
    expect(['2021-01-01', '2020', '2020-6-1'].sort(compareDates)).toEqual([
      '2020',
      '2020-6-1',
      '2021-01-01',
    ]);
  });

  it('falls back to text order for unparseable values', () => {
    expect(['b', 'a'].sort(compareDates)).toEqual(['a', 'b']);
  });
});

describe('datesSpanSingleYear', () => {
  it('ignores non-date values', () => {
    expect(datesSpanSingleYear(['2020-01-01', '2020-12-31', null])).toBe(true);
    expect(datesSpanSingleYear(['2020-01-01', '2021-01-01'])).toBe(false);
  });
});
