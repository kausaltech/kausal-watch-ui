/**
 * Pure data-shaping helpers for IndicatorVisualisation: turning indicator
 * values into graph traces (via an n-dimensional "cube"), deriving goal and
 * trend traces, and computing the y-axis bounds.
 *
 * The types here are structural on purpose: they describe only the fields
 * the pipeline consumes, so the generated GraphQL query types satisfy them
 * without coupling this module to a specific query document.
 *
 * Note: the cube/trace machinery predates the dashboard chart blocks and is
 * expected to retire once the blocks (fed by backend chartSeries) support
 * comparison and normalization. Keep changes here mechanical.
 */
import { captureMessage } from '@sentry/nextjs';
import { isEqual } from 'lodash-es';

import { linearRegression } from '@/common/math';
import { capitalizeFirstLetter } from '@/common/utils';
import { type ChartTrace, niceTickInterval } from '@/components/graphs/indicator-graph.utils';

export type I18n = { t: (key: string) => string; language?: string };

export type PipelineValue = {
  date: string | null;
  value: number | null;
  categories: Array<{ id: string }>;
  normalizedValues?: Array<{ normalizerId: string | null; value: number | null } | null> | null;
};

export type PipelineDimensionCategory = {
  id: string;
  name: string;
  defaultColor?: string | null;
  type?: string;
};

export type PipelineDimension = {
  id?: string;
  name: string;
  sort?: string | null;
  type?: string;
  categories: PipelineDimensionCategory[];
};

type DimensionWrapper = { dimension: PipelineDimension };

export type CubePoint = { date: string | null; value: number | null };
/** Leaf level holds the data points; every enclosing dimension nests one array level. */
export type Cube = CubePoint[] | Cube[];

export type Bounds = { min: number; max: number } | null;

export function generateCube(
  dimensions: PipelineDimension[],
  values: PipelineValue[],
  path?: string[]
): Cube {
  const dim = dimensions[0];
  const rest = dimensions.slice(1);

  const array = dim.categories.map((cat) => {
    const catPath = path ? [...path, cat.id] : [cat.id];
    catPath.sort();

    if (rest.length) return generateCube(rest, values, catPath);

    const found = values.filter((val) => {
      const ids = val.categories.map((valCat) => valCat.id).sort();
      return isEqual(ids, catPath);
    });
    return found.map(({ date, value }) => ({ date, value }));
  });
  return array;
}

export function generateCubeFromValues(
  indicator: { timeResolution?: string | null },
  indicatorGraphSpecification: Pick<IndicatorGraphSpecification, 'dimensions'>,
  combinedValues: PipelineValue[]
): Cube {
  const values = [...combinedValues]
    .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))
    .map((item) => {
      const { date, value, categories } = item;
      // Make yearly value dates YYYY-1-1 so they land correctly on the time
      // axis. The schema permits null dates (category-only indicators);
      // preserve them instead of crashing on the split.
      const newDate =
        indicator.timeResolution === 'YEAR' && date != null ? `${date.split('-')[0]}-1-1` : date;
      return { date: newDate, value, categories };
    });
  if (indicatorGraphSpecification.dimensions.length === 0) {
    return values;
  }
  // The specification holds {dimension} wrappers until the cube is built;
  // this unwraps and sorts them in place (getTraces consumes the result)
  const sortedDimensions = (indicatorGraphSpecification.dimensions as DimensionWrapper[])
    .map((d) => d.dimension)
    .sort((a, b) => {
      if (a.sort === 'last') {
        return 1;
      } else if (b.sort === 'last') {
        return -1;
      }
      return a.categories.length - b.categories.length;
    });
  indicatorGraphSpecification.dimensions = sortedDimensions;
  return generateCube(sortedDimensions, values);
}

export function getTraces(
  dimensions: PipelineDimension[],
  cube: Cube,
  names: Set<string> | null,
  hasTimeDimension: boolean,
  i18n: I18n,
  _quantityName?: string
): ChartTrace[] {
  // TODO: We could use quantity name but we can not tell if it's in the correct language
  // const name = capitalizeFirstLetter(quantityName ?? i18n.t('value'));
  const name = capitalizeFirstLetter(i18n.t('value'));
  if (dimensions.length === 0) {
    const points = cube as CubePoint[];
    return [
      {
        xType: 'time',
        name: name,
        dataType: 'total',
        x: points.map((val) => val.date),
        y: points.map((val) => val.value),
      },
    ];
  }
  const [firstDimension, ...rest] = dimensions;
  if (dimensions.length === 1) {
    const leafCube = cube as CubePoint[][];
    if (hasTimeDimension) {
      return firstDimension.categories.map((cat, idx) => {
        const traceName = Array.from(new Set(names ?? undefined).add(cat.name)).join(', ');
        const points = leafCube[idx];
        return {
          xType: 'time',
          dataType: cat.id === 'total' ? 'total' : null,
          name: traceName,
          _parentName: names ? Array.from(names).join(', ') : null,
          color: cat.defaultColor ?? null,
          x: points.map((val) => val.date),
          y: points.map((val) => val.value),
        };
      });
    }

    // No time dimension, 'x' axis will be categories
    return [
      {
        xType: 'category',
        name: Array.from(new Set(names ?? [firstDimension.name])).join(', '),
        _parentName: names ? Array.from(names).join(', ') : null,
        colors: firstDimension.categories.map((cat) => cat.defaultColor ?? null),
        x: firstDimension.categories.map((cat) => cat.name),
        y: leafCube.map((c) => c[0]?.value ?? null),
      },
    ];
  }
  let traces: ChartTrace[] = [];

  firstDimension.categories.forEach((cat, idx) => {
    const out = getTraces(
      rest,
      (cube as Cube[])[idx],
      new Set(names ?? undefined).add(cat.name),
      hasTimeDimension,
      i18n
    );
    traces = traces.concat(out);
  });
  // Filter out empty traces resulting from
  // unavailable (total, category) combinations
  return traces.filter((t) => t.x.length > 0);
}

export type TrendTrace = { x: string[]; y: number[]; name: string };

export const generateTrendTrace = (
  indicator: { timeResolution?: string | null; values: PipelineValue[] },
  traces: Array<{ y: unknown[]; scenario?: { identifier?: string | null } | null }>,
  goals: Array<{ x: Array<string | number | null> }>,
  i18n: I18n
): [TrendTrace | undefined, Bounds | undefined] => {
  const hasPotentialScenario = traces.find((trace) => trace.scenario?.identifier === 'potential');
  if (indicator.timeResolution === 'YEAR' && traces[0].y.length >= 5 && !hasPotentialScenario) {
    const values = [...indicator.values]
      .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))
      .map((item) => {
        const { date, value, categories } = item;
        return { date, value, categories };
      });
    // Only dated, categoryless values can contribute to the regression
    const mainValues = values.filter(
      (item): item is { date: string; value: number; categories: PipelineValue['categories'] } =>
        !item.categories.length && item.date != null && item.value != null
    );
    const numberOfYears = Math.min(mainValues.length, 10);
    const regData: Array<[number, number]> = mainValues
      .slice(mainValues.length - numberOfYears, mainValues.length)
      .map((item) => [parseInt(item.date, 10), item.value]);
    if (regData.length < 5) {
      return [undefined, undefined];
    }
    const model = linearRegression(regData);
    const predictedTrace: { x: number[]; y: number[]; name: string } = {
      x: regData.map((item) => item[0]),
      y: [],
      name: i18n.t('current-trend'),
    };

    const highestDataYear = regData[regData.length - 1][0];
    const highestGoalYear = Math.max(
      ...goals.map((goal) => {
        const goalDate = goal.x[goal.x.length - 1];
        // Goal dates start with the year — read it textually; Date parsing
        // is timezone-dependent for ISO date-only strings
        return goalDate ? parseInt(String(goalDate), 10) : NaN;
      })
    );

    if (!Number.isNaN(highestGoalYear) && highestGoalYear > highestDataYear) {
      predictedTrace.x.push(highestGoalYear);
    }

    predictedTrace.y = predictedTrace.x.map((year) => model.m * year + model.b);
    // Year format 2019-1-1 so the values land correctly on the time axis
    const formattedTrace = {
      x: predictedTrace.x.map((year) => `${year}-1-1`),
      y: predictedTrace.y,
      name: i18n.t('current-trend'),
    };
    return [formattedTrace, calculateBounds(predictedTrace.y)];
  }
  return [undefined, undefined];
};

type IndicatorGoal = {
  date?: string | null;
  value?: number | null;
  categories?: unknown;
  scenario?: { id: string } | null;
} | null;

type DatedGoal = NonNullable<IndicatorGoal> & { date: string };

export type PlanScenario = { id: string; identifier?: string | null; name?: string | null };

type GoalTraceScenario = {
  goals: DatedGoal[];
  config: PlanScenario | null;
  name?: string;
};

export type GeneratedGoalTrace = {
  scenario: PlanScenario | null;
  name: string;
  x: string[];
  y: Array<number | null>;
};

export const generateGoalTraces = (
  indicator: { timeResolution?: string | null; goals?: IndicatorGoal[] | null },
  planScenarios: PlanScenario[] | null | undefined,
  i18n: I18n
): [GeneratedGoalTrace[], Bounds] => {
  // Group goals by scenario
  const traceScenarios = new Map<string | null, GoalTraceScenario>();
  const goalTraces: GeneratedGoalTrace[] = [];
  // The schema permits goals without a target date; they can't be placed on
  // the time axis, so skip them instead of crashing on date parsing below
  const datedGoals = (indicator.goals ?? []).filter(
    (goal): goal is DatedGoal => goal?.date != null
  );
  datedGoals.forEach((goal) => {
    const scenarioId = goal.scenario ? goal.scenario.id : null;

    if (!traceScenarios.has(scenarioId)) {
      const config = planScenarios?.find((sc) => sc.id === scenarioId) ?? null;
      const scenario: GoalTraceScenario = { goals: [], config };

      if (scenarioId && config?.name) {
        scenario.name = config.name;
      } else {
        scenario.name = i18n.t('goal');
      }
      traceScenarios.set(scenarioId, scenario);
    }
    traceScenarios.get(scenarioId)?.goals.push(goal);
  });

  // Sort chronologically (ISO date strings compare lexicographically)
  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;
    scenario.goals = goals
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item) => {
        const { date, value, categories } = item;
        const newDate = indicator.timeResolution === 'YEAR' ? `${date.split('-')[0]}-1-1` : date;
        return { date: newDate, value, categories };
      });
  });

  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;

    const trace: GeneratedGoalTrace = {
      scenario: scenario.config,
      y: goals.map((item) => item.value ?? null),
      x: goals.map((item) => {
        const newDate =
          indicator.timeResolution === 'YEAR' ? `${item.date.split('-')[0]}-1-1` : item.date;
        return newDate;
      }),
      name: scenario.name ?? i18n.t('goal'),
    };

    goalTraces.push(trace);
  });

  const bounds = calculateBounds(goalTraces.map((t) => t.y).flat());
  return [goalTraces, bounds];
};

export function calculateBounds(values: Array<number | null | undefined>): Bounds {
  // Nulls carry no extent information; Math.min/max would coerce them to 0
  // and silently drag the bounds to zero
  const numbers = values.filter((v): v is number => v != null);
  if (numbers.length === 0) {
    return null;
  }
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}

/**
 * Pad a data extent by 10% on each side, then round the bounds outward to a
 * "nice" step so the axis min/max land on round numbers matching the tick
 * interval ECharts derives from the extent.
 */
export function padAndRoundBounds(
  bounds: { min: number; max: number },
  tickCount: number
): { min: number; max: number } {
  const delta = bounds.max - bounds.min;
  if (!Number.isFinite(delta)) {
    return bounds;
  }
  // Flat data has no extent to pad or derive a step from; use the value itself
  const span = delta > 0 ? delta : Math.abs(bounds.max) || 1;
  let min = bounds.min - span * 0.1;
  let max = bounds.max + span * 0.1;

  // Snap the bounds to the tick interval ECharts will pick for the axis.
  // Snapping to multiples of anything finer leaves the axis min/max between
  // nice ticks, and ECharts labels those boundary values too — after tick
  // rounding the boundary label can duplicate the neighboring nice tick
  // (e.g. "100" printed twice). Snapping also widens the extent, which can
  // change the interval ECharts derives from it; iterate until stable.
  for (let i = 0; i < 3; i++) {
    const step = niceTickInterval(max - min, tickCount);
    const snappedMin = Math.floor(min / step) * step;
    const snappedMax = Math.ceil(max / step) * step;
    if (snappedMin === min && snappedMax === max) break;
    min = snappedMin;
    max = snappedMax;
  }
  // Padding must not make the axis cross zero when the data doesn't; the
  // opposite-end checks keep flat-at-zero data from collapsing the range
  if (bounds.min >= 0 && min < 0 && max > 0) min = 0;
  if (bounds.max <= 0 && max > 0 && min < 0) max = 0;
  // toPrecision trims float artifacts like 0.6000000000000001 from the
  // step multiplication
  return {
    min: Number(min.toPrecision(12)),
    max: Number(max.toPrecision(12)),
  };
}

export type IndicatorGraphSpecification = {
  bounds: { min: number; max: number };
  axes: [string, number][];
  /**
   * Starts as {dimension} wrappers; generateCubeFromValues unwraps and sorts
   * them in place, after which the array holds bare dimensions (the shape
   * getTraces consumes).
   */
  dimensions: DimensionWrapper[] | PipelineDimension[];
  name: string;
  cube?: Cube;
};

export type SpecificationIndicator = {
  id: string;
  name: string;
  organization: { id: string; name: string };
  values: PipelineValue[];
  dimensions: Array<{ dimension: PipelineDimension }>;
  common?: {
    indicators: Array<{ organization: { id: string; name: string }; values: PipelineValue[] }>;
  } | null;
};

export function getIndicatorGraphSpecification(
  indicator: SpecificationIndicator,
  compareOrganization: string | null | undefined,
  t: I18n['t'],
  normalizerId: string | null
): IndicatorGraphSpecification {
  const indicators: Array<{ organization: { id: string; name: string }; values: PipelineValue[] }> =
    [indicator];
  let dimensions = JSON.parse(JSON.stringify(indicator.dimensions)) as DimensionWrapper[];

  const dimensionedValues = indicator.values.filter((val) => val.categories.length > 0);
  if (dimensionedValues.length === 0 && dimensions.length !== 0) {
    captureMessage(
      `Data consistency error: indicator ${indicator.id} has dimensions, but the data does not`
    );
    dimensions = [];
  }

  if (compareOrganization) {
    const compareIndicator = indicator.common?.indicators.find(
      (x) => x.organization.id === compareOrganization
    );
    if (compareIndicator) {
      indicators.push(compareIndicator);
    }
    const comparisonDimension: DimensionWrapper = {
      dimension: {
        sort: 'last',
        type: 'organization',
        name: 'organization',
        categories: indicators.map((i) => ({
          id: `org:${i.organization.id}`,
          name: i.organization.name,
          type: 'organization',
        })),
      },
    };
    dimensions.push(comparisonDimension);
  }

  const allValues = indicators
    .map((i) => i.values.map((x) => getNormalizedValue(x, normalizerId)))
    .flat();
  // Callers guarantee the indicator has values, so bounds are never null
  const bounds = calculateBounds(allValues)!;

  const times = new Set(indicators.map((i) => i.values.map((x) => x.date)).flat());
  const hasTime = times.size > 1;

  if (hasTime) {
    dimensions.forEach((d) => {
      const { categories } = d.dimension;
      categories.unshift({
        id: `total`,
        type: 'aggregate',
        name: capitalizeFirstLetter(t('total')),
      });
    });
  }

  const axes: [string, number][] = [];
  if (indicator.dimensions.length > 0) {
    axes.push(['categories', indicator.dimensions.length]);
  }
  if (compareOrganization != null) {
    axes.push(['comparison', 1]);
  }
  if (hasTime) {
    axes.push(['time', 1]);
  }

  return {
    bounds,
    axes,
    dimensions,
    name: indicator.name,
  };
}

function addOrganizationCategory(value: PipelineValue, orgId: string): PipelineValue {
  const newCategories = [...value.categories];
  newCategories.push({ id: `org:${orgId}` });
  return Object.assign({}, value, { categories: newCategories });
}

function _addTotal(v: PipelineValue, categoryCount: number): PipelineValue {
  if (v.categories.length === 0) {
    const newCategories = new Array<{ id: string }>(categoryCount).fill({ id: 'total' });
    return Object.assign({}, v, {
      categories: [...v.categories, ...newCategories],
    });
  }
  return v;
}

type CombinableIndicator = { organization: { id: string }; values: PipelineValue[] };

export function combineValues(
  indicator: CombinableIndicator,
  comparisonIndicator: CombinableIndicator | null | undefined,
  indicatorGraphSpecification: Pick<IndicatorGraphSpecification, 'axes'>
): PipelineValue[] {
  let categoryCount = 0;
  const categoryAxis = indicatorGraphSpecification.axes.filter((a) => a[0] === 'categories');
  if (categoryAxis.length > 0) {
    categoryCount = categoryAxis[0][1];
  }
  const getValues = (ind: CombinableIndicator) =>
    ind.values
      .map((v) => _addTotal(v, categoryCount))
      .filter((v) => v.categories.length === categoryCount)
      .map((v) =>
        comparisonIndicator == null ? v : addOrganizationCategory(v, ind.organization.id)
      );
  const indicatorValues = getValues(indicator);
  if (comparisonIndicator == null) {
    return indicatorValues;
  }

  return indicatorValues.concat(getValues(comparisonIndicator));
}

export const NORMALIZE_DEFAULT = 'default';
const NORMALIZE_PREFER_ENABLED = 'enabled';
const NORMALIZE_PREFER_DISABLED = 'disabled';

export function normalizeByPopulationSetter(callback: (value: string) => void) {
  return (value: boolean) => {
    callback(value ? NORMALIZE_PREFER_ENABLED : NORMALIZE_PREFER_DISABLED);
  };
}

export function getNormalizeByPopulation(
  preferNormalizeByPopulation: string,
  comparisonIndicator: unknown
): boolean {
  if (preferNormalizeByPopulation === NORMALIZE_DEFAULT) {
    return comparisonIndicator != null;
  }
  return preferNormalizeByPopulation === NORMALIZE_PREFER_ENABLED;
}

function getNormalizedValue(
  valueObject: PipelineValue,
  normalizerId: string | null
): number | null {
  if (normalizerId != null) {
    // Callers only pass a normalizer id after checking every value has a
    // matching normalized entry (see canBeNormalized)
    return valueObject.normalizedValues!.find((nv) => nv?.normalizerId === normalizerId)!.value;
  }
  return valueObject.value;
}

export function normalizeValuesByNormalizer(
  values: PipelineValue[],
  normalizerId: string
): PipelineValue[] {
  return values.map((valueObject) =>
    Object.assign({}, valueObject, {
      value: getNormalizedValue(valueObject, normalizerId),
    })
  );
}
