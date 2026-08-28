import {
  collectChartDates,
  formatDateLabel,
  niceTickInterval,
  normalizeDate,
  parseGraphSettings,
  tickSignificantDigits,
  wrapTitle,
} from '../indicator-graph.utils';

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
    ).toEqual(['2022-01-01', '2023-01-01', '2025-01-01']);
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
    ).toEqual(['2022-01-01', '2023-01-01', '2030-01-01']);
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

describe('parseGraphSettings', () => {
  it('parses the custom chart background', () => {
    expect(parseGraphSettings({ customBackground: '#f4efe9' }).customBackground).toBe('#f4efe9');
  });

  it('drops non-string values and tolerates missing settings', () => {
    expect(parseGraphSettings({ customBackground: 42 }).customBackground).toBeUndefined();
    expect(parseGraphSettings(undefined).customBackground).toBeUndefined();
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
