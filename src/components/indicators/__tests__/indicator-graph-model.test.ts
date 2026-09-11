import { IndicatorTimeResolution } from '@/common/__generated__/graphql';

import {
  NORMALIZE_DEFAULT,
  NORMALIZE_PREFER_DISABLED,
  NORMALIZE_PREFER_ENABLED,
} from '../indicator-data-helpers';
import { type GraphDataIndicator, deriveIndicatorGraphModel } from '../indicator-graph-model';

const t = (key: string) => key;

const value = (date: string, raw: number, perCapita: number | null) => ({
  date,
  value: raw,
  categories: [],
  normalizedValues: [{ normalizerId: 'pop', value: perCapita }],
});

function makeIndicator(overrides: Record<string, unknown> = {}): GraphDataIndicator {
  return {
    __typename: 'Indicator',
    id: '1',
    name: 'Emissions',
    timeResolution: IndicatorTimeResolution.Year,
    showTrendline: false,
    showTotalLine: true,
    desiredTrend: null,
    reference: null,
    minValue: null,
    maxValue: null,
    ticksCount: null,
    ticksRounding: null,
    valueRounding: null,
    dataCategoriesAreStackable: false,
    nonQuantifiedGoal: null,
    nonQuantifiedGoalDate: null,
    organization: { id: 'org', name: 'City' },
    quantity: { id: 'q', name: 'päästöt' },
    values: [value('2020-01-01', 100, 1), value('2021-01-01', 80, 0.8)],
    referenceValue: {
      id: 'ref',
      date: '2019-01-01',
      value: 120,
      normalizedValues: [{ normalizerId: 'pop', value: 1.2 }],
    },
    dimensions: [],
    goals: [{ id: 'g', date: '2030-01-01', value: 40, normalizedValues: [], scenario: null }],
    defaultVisualization: null,
    datasets: [],
    unit: { id: 'u', name: 'kilotonnes', shortName: 'kt' },
    common: {
      id: 'c',
      name: 'Emissions',
      normalizations: [
        {
          unit: { id: 'u2', shortName: 'kt/cap' },
          normalizer: { id: 'pop', identifier: 'population', name: 'Population' },
        },
      ],
      indicators: [
        {
          id: '2',
          organization: { id: 'org2', name: 'Other city' },
          values: [value('2020-01-01', 50, 2), value('2021-01-01', 40, 1.6)],
          goals: [],
        },
      ],
    },
    ...overrides,
  } as unknown as GraphDataIndicator;
}

const base = {
  scenarios: [],
  compareTo: undefined,
  preferNormalizeByPopulation: NORMALIZE_DEFAULT,
  t,
};

describe('deriveIndicatorGraphModel', () => {
  it('builds the plain time-series view by default', () => {
    const model = deriveIndicatorGraphModel({ ...base, indicator: makeIndicator() });
    expect(model.normalizeByPopulation).toBe(false);
    expect(model.canBeNormalized).toBe(true);
    expect(model.unitLabel).toBe('kt');
    expect(model.hasTimeDimension).toBe(true);
    expect(model.traces).toHaveLength(1);
    expect(model.traces[0].y).toEqual([100, 80]);
    expect(model.goalTraces).toHaveLength(1);
    expect(model.referenceValue).toEqual({ date: '2019-01-01', value: 120 });
    expect(model.comparisonOrgs.map((o) => o.id)).toEqual(['org2']);
    // Emission charts include zero unless the editor set a minimum
    expect(model.yRange.range[0]).toBe(0);
    expect(model.mainXAxisRange).toEqual({
      min: new Date('2020-1-1').getTime(),
      max: new Date('2021-1-1').getTime(),
    });
  });

  it('drops dated goals when the data has no time dimension', () => {
    const catValue = (categoryId: string, raw: number) => ({
      date: '2021-01-01',
      value: raw,
      categories: [{ id: categoryId }],
      normalizedValues: [],
    });
    const model = deriveIndicatorGraphModel({
      ...base,
      indicator: makeIndicator({
        dimensions: [
          {
            dimension: {
              id: 'sector',
              name: 'Sector',
              categories: [
                { id: 'housing', name: 'Housing' },
                { id: 'transport', name: 'Transport' },
              ],
            },
          },
        ],
        values: [catValue('housing', 60), catValue('transport', 40)],
      }),
    });
    expect(model.hasTimeDimension).toBe(false);
    expect(model.traces).toHaveLength(1);
    expect(model.traces[0].xType).toBe('category');
    expect(model.goalTraces).toEqual([]);
  });

  it('normalizes and suppresses overlays when a comparison is selected', () => {
    const model = deriveIndicatorGraphModel({
      ...base,
      indicator: makeIndicator(),
      compareTo: 'org2',
    });
    // The default preference normalizes as soon as a comparison is active
    expect(model.normalizeByPopulation).toBe(true);
    expect(model.unitLabel).toBe('kt/cap');
    expect(model.traces.some((trace) => trace.y.includes(1.6))).toBe(true);
    expect(model.goalTraces).toEqual([]);
    expect(model.trendTrace).toBeNull();
    expect(model.referenceValue).toEqual({ date: '2019-01-01', value: 1.2 });
  });

  it('honors an explicit normalization preference without a comparison', () => {
    const model = deriveIndicatorGraphModel({
      ...base,
      indicator: makeIndicator(),
      preferNormalizeByPopulation: NORMALIZE_PREFER_ENABLED,
    });
    expect(model.normalizeByPopulation).toBe(true);
    expect(model.traces[0].y).toEqual([1, 0.8]);
    expect(model.goalTraces).toEqual([]);

    const disabled = deriveIndicatorGraphModel({
      ...base,
      indicator: makeIndicator(),
      compareTo: 'org2',
      preferNormalizeByPopulation: NORMALIZE_PREFER_DISABLED,
    });
    expect(disabled.normalizeByPopulation).toBe(false);
    expect(disabled.unitLabel).toBe('kt');
  });

  it('refuses normalization when no per-capita value is usable', () => {
    const model = deriveIndicatorGraphModel({
      ...base,
      indicator: makeIndicator({
        values: [value('2020-01-01', 100, null), value('2021-01-01', 80, null)],
      }),
      preferNormalizeByPopulation: NORMALIZE_PREFER_ENABLED,
    });
    expect(model.canBeNormalized).toBe(false);
    expect(model.normalizeByPopulation).toBe(false);
    expect(model.referenceValue?.value).toBe(120);
  });
});
