import { buildGoalSeries } from '../indicator-charts-utility';

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
