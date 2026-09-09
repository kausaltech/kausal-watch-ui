import {
  buildBlockAriaDescription,
  buildGoalSeries,
  buildTooltipFormatter,
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
  const marker = '<span style="background-color:#111"></span>';

  it('escapes scenario names and units in goal tooltips', () => {
    const [series] = buildGoalSeries(
      indicator([goal('1', '2030-01-01', 10, { id: 'a', name: '<img src=x onerror=alert(1)>' })]),
      '<u>kt</u>',
      ['#111']
    );
    const text = series.tooltip.formatter({ value: ['2030', 10] });
    expect(text).toBe('&lt;img src=x onerror=alert(1)&gt;: 10 &lt;u&gt;kt&lt;/u&gt;');
  });

  it('escapes series names, units and the axis label but keeps the ECharts marker', () => {
    const formatter = buildTooltipFormatter(
      '<u>kt</u>',
      ['<img src=x onerror=alert(1)>'],
      (k) => k,
      String,
      undefined,
      'YEAR'
    );
    const text = formatter([
      {
        seriesName: '<img src=x onerror=alert(1)>',
        axisValue: '2020<i>',
        data: ['2020', 5],
        marker,
      },
    ]);
    expect(text).toContain(marker);
    expect(text).toBe(
      `<strong>2020&lt;i&gt;</strong><br/>${marker} &lt;img src=x onerror=alert(1)&gt;: 5 &lt;u&gt;kt&lt;/u&gt;`
    );
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
