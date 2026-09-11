import {
  buildBlockAriaDescription,
  buildCategoryValues,
  buildGoalSeries,
  buildPieAriaDescription,
  buildUndatedTotal,
  collectAllDates,
  hasDatedValues,
} from '../indicator-charts-utility';

type Indicator = Parameters<typeof buildGoalSeries>[0];

const goal = (
  id: string,
  date: string,
  value: number,
  scenario: { id: string; name: string } | null = null
) => ({ __typename: 'IndicatorGoal' as const, id, date, value, scenario });

const indicator = (goals: ReturnType<typeof goal>[]) =>
  ({
    goals: goals.map((g) => ({
      ...g,
      scenario: g.scenario && { __typename: 'Scenario', ...g.scenario },
    })),
  }) as unknown as Indicator;

describe('buildGoalSeries', () => {
  const colors = ['#111', '#222'];

  it('groups goals by scenario with the scenario name and its own color', () => {
    const series = buildGoalSeries(
      indicator([
        goal('1', '2030-01-01', 10, { id: 'a', name: 'Ambitious' }),
        goal('2', '2025-01-01', 5, { id: 'a', name: 'Ambitious' }),
        goal('3', '2030-01-01', 20, { id: 'b', name: 'Baseline' }),
      ]),
      'kt',
      colors,
      'Goal',
      'YEAR'
    );
    expect(series.map((s) => s.name)).toEqual(['Ambitious', 'Baseline']);
    expect(series.map((s) => s.itemStyle.color)).toEqual(['#111', '#222']);
    // Chronological within a scenario
    expect(series[0].data).toEqual([
      ['2025', 5],
      ['2030', 10],
    ]);
  });

  it('labels goals without a scenario with the generic label', () => {
    const series = buildGoalSeries(indicator([goal('1', '2030-01-01', 10)]), 'kt', colors, 'Goal');
    expect(series).toHaveLength(1);
    expect(series[0].name).toBe('Goal');
  });

  it('skips goals without a date', () => {
    const series = buildGoalSeries(
      indicator([goal('1', null as unknown as string, 10)]),
      'kt',
      colors
    );
    expect(series).toEqual([]);
  });

  it('formats the tooltip value with the given formatter and unit', () => {
    const [series] = buildGoalSeries(
      indicator([goal('1', '2030-01-01', 1234.5678)]),
      'kt',
      colors,
      'Goal',
      'YEAR',
      (v) => v.toFixed(1)
    );
    expect(series.tooltip.formatter({ value: ['2030', 1234.5678] })).toBe('Goal: 1234.6 kt');
  });
});

describe('tooltip HTML escaping', () => {
  it('escapes scenario names and units in goal tooltips', () => {
    const [series] = buildGoalSeries(
      indicator([goal('1', '2030-01-01', 10, { id: 'a', name: '<img src=x onerror=alert(1)>' })]),
      '<u>kt</u>',
      ['#111']
    );
    const text = series.tooltip.formatter({ value: ['2030', 10] });
    expect(text).toBe('&lt;img src=x onerror=alert(1)&gt;: 10 &lt;u&gt;kt&lt;/u&gt;');
  });
});

describe('buildBlockAriaDescription', () => {
  it('describes the block series, goals and trend like the generic graph', () => {
    const text = buildBlockAriaDescription({
      title: 'Emissions',
      series: [
        {
          name: 'Housing',
          raw: [
            ['2020', 60],
            ['2021', 50],
          ],
        },
        {
          name: 'total',
          raw: [
            ['2020', 100],
            ['2021', 95],
          ],
        },
      ],
      goals: [{ name: 'goal', data: [['2030', 40]] }],
      trend: {
        name: 'trend',
        data: [
          ['2020', 100],
          ['2030', 61.234],
        ],
      },
      timeResolution: 'year',
      unit: 'kt',
      valueRounding: 3,
      format: {
        number: (v: number, options?: { maximumSignificantDigits?: number }) =>
          v.toLocaleString('en', options),
      } as unknown as Parameters<typeof buildBlockAriaDescription>[0]['format'],
      t: (key, values) => `[${key}${values ? ' ' + JSON.stringify(values) : ''}]`,
      localePack: { series: { typeNames: { line: 'Line chart', bar: 'Bar chart' } } },
    });
    expect(text).toBe(
      '[chart-aria-time-multi {"title":"Emissions","chartType":"Line chart","count":2,"categories":2,"names":"Housing, total","start":"2020","end":"2021"}] ' +
        '[chart-aria-unit {"unit":"kt"}] ' +
        '[chart-aria-series-values {"name":"Housing","values":"2020: 60; 2021: 50"}] ' +
        '[chart-aria-series-values {"name":"Total","values":"2020: 100; 2021: 95"}] ' +
        '[chart-aria-series-values {"name":"Goal","values":"2030: 40"}] ' +
        '[chart-aria-trend {"startValue":"100","startDate":"2020","endValue":"61.2","endDate":"2030"}]'
    );
  });

  it('names bar blocks with the locale pack bar type even on a time axis', () => {
    const text = buildBlockAriaDescription({
      title: 'Emissions',
      series: [
        {
          name: 'total',
          raw: [
            ['2020', 100],
            ['2021', 95],
          ],
        },
      ],
      timeResolution: 'YEAR',
      unit: '',
      valueRounding: null,
      format: { number: (v: number) => String(v) } as unknown as Parameters<
        typeof buildBlockAriaDescription
      >[0]['format'],
      t: (key, values) => `[${key} ${values?.chartType}]`,
      localePack: {
        aria: { data: { allData: 'Data: ', separator: { middle: ', ', end: '. ' } } },
        series: { typeNames: { line: 'Line chart', bar: 'Bar chart' } },
      },
      chartKind: 'bar',
    });
    expect(text).toBe('[chart-aria-time-single Bar chart] Data: 2020: 100; 2021: 95.');
  });
});

describe('buildPieAriaDescription', () => {
  it('names the pie by the locale pack, states the year, and lists the slices', () => {
    const text = buildPieAriaDescription({
      title: 'Modal split',
      year: 2024,
      slices: [
        { name: 'Car', value: 70.26 },
        { name: 'Bike', value: 29.74 },
      ],
      unit: '%',
      valueRounding: 3,
      format: {
        number: (v: number, options?: { maximumSignificantDigits?: number }) =>
          v.toLocaleString('en', options),
      } as unknown as Parameters<typeof buildPieAriaDescription>[0]['format'],
      t: (key, values) => `[${key}${values ? ' ' + JSON.stringify(values) : ''}]`,
      localePack: {
        aria: { data: { allData: 'Data: ', separator: { middle: ', ', end: '. ' } } },
        series: { typeNames: { line: 'Line chart', bar: 'Bar chart', pie: 'Pie chart' } },
      },
    });
    expect(text).toBe(
      '[chart-aria-pie {"title":"Modal split","chartType":"Pie chart","count":2,"date":"2024"}] ' +
        '[chart-aria-unit {"unit":"%"}] ' +
        'Data: Car: 70.3; Bike: 29.7.'
    );
  });
});

describe('undated (category-only) values', () => {
  type Series = Parameters<typeof hasDatedValues>[0];
  const category = (id: string, name: string, color = '') => ({ id, name, defaultColor: color });
  const undatedSeries = [
    {
      dimensionCategory: category('h', 'Housing', '#abc'),
      values: [{ id: '1', date: null, value: 60 }],
    },
    {
      dimensionCategory: category('t', 'Transport'),
      values: [
        { id: '2', date: null, value: 30 },
        { id: '3', date: null, value: 10 },
      ],
    },
    { dimensionCategory: null, values: [{ id: '4', date: null, value: 100 }] },
  ] as unknown as Series;

  it('detects whether any value is dated', () => {
    expect(hasDatedValues(undatedSeries)).toBe(false);
    expect(
      hasDatedValues([
        { dimensionCategory: null, values: [{ id: '1', date: '2020-01-01', value: 1 }] },
      ] as unknown as Series)
    ).toBe(true);
  });

  it('builds one value per category, summing undated values and coloring from the palette', () => {
    expect(buildCategoryValues(undatedSeries, ['#111', '#222'])).toEqual([
      { name: 'Housing', color: '#abc', value: 60 },
      { name: 'Transport', color: '#222', value: 40 },
    ]);
  });

  it('reads the undated total', () => {
    expect(buildUndatedTotal(undatedSeries)).toBe(100);
    expect(buildUndatedTotal([])).toBeNull();
  });
});

describe('collectAllDates', () => {
  it('extends the axis to additional dates given as year keys and fills the gaps', () => {
    const { xCategories } = collectAllDates(
      [
        [
          ['2020', 1],
          ['2022', 3],
        ],
      ],
      'YEAR',
      ['2025']
    );
    expect(xCategories).toEqual(['2020', '2021', '2022', '2023', '2024', '2025']);
  });
});
