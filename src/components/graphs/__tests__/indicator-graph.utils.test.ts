import {
  buildAriaDescription,
  buildTimeTooltipFormatter,
  collectChartDates,
  detectTimeDimension,
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

describe('detectTimeDimension', () => {
  const noTimeSpec = { axes: [['categories', 0]] as Array<[string, number]> };

  it('honors an explicit category axis even when category names look like dates', () => {
    const traces = [{ name: 'Sector', xType: 'category' as const, x: ['2020', '2021'], y: [1, 2] }];
    expect(detectTimeDimension(noTimeSpec, traces, [])).toBe(false);
  });

  it('uses the time axis when a trace declares it', () => {
    const traces = [{ name: 'Value', xType: 'time' as const, x: ['2020-01-01'], y: [1] }];
    expect(detectTimeDimension(noTimeSpec, traces, [])).toBe(true);
  });

  it('infers dates only for traces without a declared axis type', () => {
    const traces = [{ name: 'Value', x: ['2020-01-01'], y: [1] }];
    expect(detectTimeDimension(noTimeSpec, traces, [])).toBe(true);
    expect(detectTimeDimension(noTimeSpec, [{ name: 'Value', x: ['Housing'], y: [1] }], [])).toBe(
      false
    );
  });
});

describe('buildTimeTooltipFormatter', () => {
  const format = { number: (v: number) => String(v) } as unknown as Parameters<
    typeof buildTimeTooltipFormatter
  >[0]['format'];
  const yRange = {
    unit: '<u>kt</u>',
    ticksCount: undefined,
    ticksRounding: undefined,
    valueRounding: undefined,
    range: [0, 10],
  };
  const marker = '<span style="background-color:#111"></span>';

  it('escapes series names and units but keeps the ECharts marker', () => {
    const formatter = buildTimeTooltipFormatter({
      timeResolution: 'YEAR',
      trendName: null,
      yRange,
      format,
    });
    const text = formatter([
      {
        seriesName: '<img src=x onerror=alert(1)>',
        axisValue: '2020-01-01',
        value: ['2020-01-01', 5],
        marker,
      },
    ]);
    expect(text).toBe(
      `2020<br/>${marker} &lt;img src=x onerror=alert(1)&gt;: 5 &lt;u&gt;kt&lt;/u&gt;<br/>`
    );
  });

  it('skips the trend series', () => {
    const formatter = buildTimeTooltipFormatter({
      timeResolution: 'YEAR',
      trendName: 'Trend',
      yRange: { ...yRange, unit: 'kt' },
      format,
    });
    const text = formatter([
      { seriesName: 'Trend', axisValue: '2020-01-01', value: ['2020-01-01', 5], marker },
      { seriesName: 'Value', axisValue: '2020-01-01', value: ['2020-01-01', 7], marker },
    ]);
    expect(text).toBe(`2020<br/>${marker} Value: 7 kt<br/>`);
  });
});

describe('buildAriaDescription', () => {
  // Renders a key with its values so tests can assert on what was passed
  const t = (key: string, values?: Record<string, string | number>) =>
    `[${key}${values ? ' ' + JSON.stringify(values) : ''}]`;
  const format = {
    number: (v: number, options?: { maximumSignificantDigits?: number }) =>
      v.toLocaleString('en', options),
  } as unknown as Parameters<typeof buildAriaDescription>[0]['format'];
  const yRange = {
    unit: 'GWh/a',
    ticksCount: undefined,
    ticksRounding: undefined,
    valueRounding: undefined,
    range: [0, 2000],
  };
  const localePack = {
    aria: { data: { allData: 'The data is as follows: ', separator: { middle: ', ', end: '. ' } } },
    series: { typeNames: { line: 'Line chart', bar: 'Bar chart' } },
  };
  const base = {
    goalTraces: [],
    trendTrace: null,
    hasTimeDimension: true,
    timeResolution: 'YEAR' as const,
    yRange,
    valueRounding: 4,
    format,
    t,
    localePack,
  };

  it('names the indicator, unit and span and lists rounded yearly values', () => {
    const text = buildAriaDescription({
      ...base,
      title: 'Other electricity consumption',
      traces: [
        { name: 'Value', dataType: 'total', x: ['2010-01-01', '2011-01-01'], y: [1221.3, 1195.34] },
      ],
    });
    expect(text).toBe(
      '[chart-aria-time-single {"title":"Other electricity consumption","chartType":"Line chart","count":2,"start":"2010","end":"2011"}] ' +
        '[chart-aria-unit {"unit":"GWh/a"}] ' +
        'The data is as follows: 2010: 1,221; 2011: 1,195.'
    );
  });

  it('describes charts whose values share one date without a span', () => {
    const single = buildAriaDescription({
      ...base,
      title: 'Purchased electricity',
      traces: [{ name: 'Value', x: ['2020-01-01'], y: [1.4] }],
    });
    expect(single).toContain(
      '[chart-aria-time-single-date {"title":"Purchased electricity","chartType":"Line chart","date":"2020"}]'
    );
    expect(single).not.toContain('chart-aria-time-single {');

    const multi = buildAriaDescription({
      ...base,
      title: 'Emissions',
      traces: [
        { name: 'Housing', x: ['2020-01-01'], y: [60] },
        { name: 'Transport', x: ['2020-01-01'], y: [40] },
      ],
    });
    expect(multi).toContain(
      '[chart-aria-time-multi-single-date {"title":"Emissions","chartType":"Line chart","count":2,"date":"2020","names":"Housing, Transport"}]'
    );
  });

  it('lists each category series by name and skips null padding', () => {
    const text = buildAriaDescription({
      ...base,
      title: 'Emissions',
      traces: [
        { name: 'Housing', x: ['2020-01-01', '2021-01-01'], y: [60, null] },
        { name: 'Transport', x: ['2020-01-01', '2021-01-01'], y: [40, 45] },
      ],
    });
    expect(text).toContain(
      '[chart-aria-time-multi {"title":"Emissions","chartType":"Line chart","count":2,"categories":2,"names":"Housing, Transport","start":"2020","end":"2021"}]'
    );
    expect(text).toContain('[chart-aria-series-values {"name":"Housing","values":"2020: 60"}]');
    expect(text).toContain(
      '[chart-aria-series-values {"name":"Transport","values":"2020: 40; 2021: 45"}]'
    );
  });

  it('summarizes long series by range and latest value', () => {
    const x = Array.from({ length: 30 }, (_, i) => `${1995 + i}-01-01`);
    const y = x.map((_, i) => 100 + i);
    y[3] = 5;
    const text = buildAriaDescription({
      ...base,
      title: 'Long',
      traces: [{ name: 'Value', x, y }],
    });
    expect(text).not.toContain('The data is as follows');
    expect(text).toContain(
      '[chart-aria-range {"min":"5","minDate":"1998","max":"129","maxDate":"2024"}]'
    );
    expect(text).toContain('[chart-aria-latest {"value":"129","date":"2024"}]');
  });

  it('describes goals per scenario and the trend by its start and end points', () => {
    const text = buildAriaDescription({
      ...base,
      title: 'Emissions',
      traces: [{ name: 'Value', x: ['2020-01-01'], y: [100] }],
      goalTraces: [{ name: 'goal', x: ['2030-01-01'], y: [40] }],
      trendTrace: { name: 'trend', x: ['2020-01-01', '2030-01-01'], y: [100, 61.23456] },
    });
    // Sentence-leading names are capitalized even when the catalog label is lowercase
    expect(text).toContain('[chart-aria-series-values {"name":"Goal","values":"2030: 40"}]');
    expect(text).toContain(
      '[chart-aria-trend {"startValue":"100","startDate":"2020","endValue":"61.23","endDate":"2030"}]'
    );
  });

  it('describes category bar charts with category labels', () => {
    const text = buildAriaDescription({
      ...base,
      hasTimeDimension: false,
      title: 'Modal split',
      traces: [{ name: 'Sector', xType: 'category', x: ['Car', 'Bike'], y: [70, 30] }],
    });
    expect(text).toBe(
      '[chart-aria-category-single {"title":"Modal split","chartType":"Bar chart","count":2,"start":"Car","end":"Bike"}] ' +
        '[chart-aria-unit {"unit":"GWh/a"}] ' +
        'The data is as follows: Car: 70; Bike: 30.'
    );
  });
});

describe('buildAriaDescription summary detail', () => {
  const t = (key: string, values?: Record<string, string | number>) =>
    `[${key}${values ? ' ' + JSON.stringify(values) : ''}]`;
  const format = {
    number: (v: number) => String(v),
  } as unknown as Parameters<typeof buildAriaDescription>[0]['format'];
  const common = {
    goalTraces: [],
    trendTrace: null,
    timeResolution: 'YEAR' as const,
    yRange: {
      unit: '',
      ticksCount: undefined,
      ticksRounding: undefined,
      valueRounding: undefined,
      range: [],
    },
    valueRounding: undefined,
    format,
    t,
    localePack: {
      aria: { data: { allData: 'Data: ', separator: { middle: ', ', end: '. ' } } },
      series: { typeNames: { line: 'Line chart', bar: 'Bar chart' } },
    },
    detail: 'summary' as const,
  };

  it('gives extremes and latest instead of listing values for time series', () => {
    const text = buildAriaDescription({
      ...common,
      title: 'Emissions',
      hasTimeDimension: true,
      traces: [
        { name: 'Housing', x: ['2020-01-01', '2021-01-01', '2022-01-01'], y: [60, 40, 50] },
        { name: 'Transport', x: ['2022-01-01'], y: [7] },
      ],
    });
    expect(text).not.toContain('Data:');
    expect(text).toContain(
      'Housing: [chart-aria-range {"min":"40","minDate":"2021","max":"60","maxDate":"2020"}] [chart-aria-latest {"value":"50","date":"2022"}]'
    );
    // A single point has no range, only its value
    expect(text).toContain('Transport: [chart-aria-latest {"value":"7","date":"2022"}]');
  });

  it('gives only the extremes for category charts, listing a lone category', () => {
    const text = buildAriaDescription({
      ...common,
      title: 'Split',
      hasTimeDimension: false,
      traces: [{ name: 'Sector', xType: 'category', x: ['Car', 'Bike'], y: [70, 30] }],
    });
    expect(text).toContain(
      '[chart-aria-range {"min":"30","minDate":"Bike","max":"70","maxDate":"Car"}]'
    );
    expect(text).not.toContain('chart-aria-latest');

    const lone = buildAriaDescription({
      ...common,
      title: 'Split',
      hasTimeDimension: false,
      traces: [{ name: 'Sector', xType: 'category', x: ['Car'], y: [70] }],
    });
    expect(lone).toContain('Data: Car: 70.');
  });
});

describe('buildAriaDescription locale pack', () => {
  it('takes the chart-type name and data lead-in from the ECharts locale pack', () => {
    const text = buildAriaDescription({
      title: 'Sähkönkulutus',
      traces: [{ name: 'Value', x: ['2020-01-01'], y: [1] }],
      goalTraces: [],
      trendTrace: null,
      hasTimeDimension: true,
      timeResolution: 'YEAR',
      yRange: {
        unit: '',
        ticksCount: undefined,
        ticksRounding: undefined,
        valueRounding: undefined,
        range: [],
      },
      valueRounding: undefined,
      format: { number: (v: number) => String(v) } as unknown as Parameters<
        typeof buildAriaDescription
      >[0]['format'],
      t: (key, values) => `[${key} ${values?.chartType}]`,
      localePack: {
        aria: {
          data: { allData: 'Tiedot ovat seuraavat: ', separator: { middle: ', ', end: '. ' } },
        },
        series: { typeNames: { line: 'Viivakaavio', bar: 'Pylväsdiagrammi' } },
      },
    });
    expect(text).toBe('[chart-aria-time-single-date Viivakaavio] Tiedot ovat seuraavat: 2020: 1.');
  });
});
