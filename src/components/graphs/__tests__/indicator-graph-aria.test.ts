import { buildAriaDescription } from '../indicator-graph-aria';

describe('buildAriaDescription', () => {
  // Renders a key with its values so tests can assert on what was passed
  const t = (key: string, values?: Record<string, string | number>) =>
    `[${key}${values ? ' ' + JSON.stringify(values) : ''}]`;
  const formatValue = (v: number) => v.toLocaleString('en', { maximumSignificantDigits: 4 });
  const yRange = {
    unit: 'GWh/a',
    ticksCount: undefined,
    ticksRounding: undefined,
    valueRounding: 2,
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
    formatValue,
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

  it('spans the earliest and latest dates across all series, not the first and last series', () => {
    const text = buildAriaDescription({
      ...base,
      title: 'Emissions',
      traces: [
        {
          name: 'A',
          x: ['2020-01-01', '2021-01-01', '2022-01-01', '2023-01-01', '2024-01-01'],
          y: [1, 2, 3, 4, 5],
        },
        // Ends before the first series does
        { name: 'B', x: ['2021-01-01', '2022-01-01'], y: [1, 2] },
      ],
    });
    expect(text).toContain('"start":"2020","end":"2024"');
  });

  it('does not treat a chart as single-dated when an inner series has other dates', () => {
    const text = buildAriaDescription({
      ...base,
      title: 'Emissions',
      traces: [
        { name: 'A', x: ['2020-01-01'], y: [1] },
        { name: 'B', x: ['2020-01-01', '2021-01-01'], y: [1, 2] },
        { name: 'C', x: ['2020-01-01'], y: [1] },
      ],
    });
    expect(text).toContain('chart-aria-time-multi {');
    expect(text).not.toContain('single-date');
    expect(text).toContain('"start":"2020","end":"2021"');
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
  const formatValue = (v: number) => String(v);
  const common = {
    goalTraces: [],
    trendTrace: null,
    timeResolution: 'YEAR' as const,
    yRange: {
      unit: '',
      ticksCount: undefined,
      ticksRounding: undefined,
      valueRounding: 2,
      range: [],
    },
    formatValue,
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
        valueRounding: 2,
        range: [],
      },
      formatValue: (v: number) => String(v),
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
