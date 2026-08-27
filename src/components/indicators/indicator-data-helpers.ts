/**
 * Pure data-shaping helpers for IndicatorVisualisation: turning indicator
 * values into graph traces (via an n-dimensional "cube"), deriving goal and
 * trend traces, and computing the y-axis bounds.
 *
 * Note: the cube/trace machinery predates the dashboard chart blocks and is
 * expected to retire once the blocks (fed by backend chartSeries) support
 * comparison and normalization. Keep changes here mechanical.
 */
import { captureMessage } from '@sentry/nextjs';
import { isEqual } from 'lodash-es';

import { linearRegression } from '@/common/math';
import { capitalizeFirstLetter } from '@/common/utils';

export function generateCube(dimensions, values, path?) {
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

export function generateCubeFromValues(indicator, indicatorGraphSpecification, combinedValues) {
  const values = [...combinedValues]
    .sort((a, b) => a.date - b.date)
    .map((item) => {
      const { date, value, categories } = item;
      // Make yearly value dates YYYY-1-1 so they land correctly on the time axis
      const newDate = indicator.timeResolution === 'YEAR' ? `${date.split('-')[0]}-1-1` : date;
      return { date: newDate, value, categories };
    });
  if (indicatorGraphSpecification.dimensions.length === 0) {
    return values;
  }
  indicatorGraphSpecification.dimensions = indicatorGraphSpecification.dimensions
    .map((d) => d.dimension)
    .sort((a, b) => {
      if (a.sort === 'last') {
        return 1;
      } else if (b.sort === 'last') {
        return -1;
      }
      return a.categories.length - b.categories.length || a.id - b.id;
    });
  return generateCube(indicatorGraphSpecification.dimensions, values);
}

export function getTraces(dimensions, cube, names, hasTimeDimension, i18n, quantityName?) {
  // TODO: We could use quantity name but we can not tell if it's in the correct language
  // const name = capitalizeFirstLetter(quantityName ?? i18n.t('value'));
  const name = capitalizeFirstLetter(i18n.t('value'));
  if (dimensions.length === 0) {
    return [
      {
        xType: 'time',
        name: name,
        dataType: 'total',
        x: cube.map((val) => {
          return val.date;
        }),
        y: cube.map((val) => val.value),
      },
    ];
  }
  const [firstDimension, ...rest] = dimensions;
  if (dimensions.length === 1) {
    if (hasTimeDimension) {
      return firstDimension.categories.map((cat, idx) => {
        const traceName = Array.from(new Set(names ?? undefined).add(cat.name)).join(', ');
        let x,
          y,
          _cube = cube[idx];
        x = _cube.map((val) => val.date);
        y = _cube.map((val) => val.value);
        return {
          xType: 'time',
          dataType: cat.id === 'total' ? 'total' : null,
          name: traceName,
          _parentName: names ? Array.from(names).join(', ') : null,
          color: cat.defaultColor ?? null,
          x,
          y,
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
        y: cube.map((c) => c[0]?.value),
      },
    ];
  }
  let traces: any[] = [];

  firstDimension.categories.forEach((cat, idx) => {
    const out = getTraces(
      rest,
      cube[idx],
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
type Bounds = { min: number; max: number } | null;

export const generateTrendTrace = (
  indicator,
  traces,
  goals,
  i18n
): [TrendTrace | undefined, Bounds | undefined] => {
  const hasPotentialScenario = traces.find((goal) => goal.scenario?.identifier === 'potential');
  if (indicator.timeResolution === 'YEAR' && traces[0].y.length >= 5 && !hasPotentialScenario) {
    const values = [...indicator.values]
      .sort((a, b) => a.date - b.date)
      .map((item) => {
        const { date, value, categories } = item;
        return { date, value, categories };
      });
    const mainValues = values.filter((item) => !item.categories.length);
    const numberOfYears = Math.min(mainValues.length, 10);
    const regData = mainValues
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
        return goalDate ? new Date(goalDate).getFullYear() : NaN;
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

type GoalTraceScenario = {
  goals: any[];
  config: any;
  name?: string;
};

export const generateGoalTraces = (indicator, planScenarios, i18n): [any[], Bounds] => {
  // Group goals by scenario
  const traceScenarios = new Map<string | null, GoalTraceScenario>();
  const goalTraces: any[] = [];
  (indicator.goals || []).forEach((goal) => {
    const scenarioId = goal.scenario ? goal.scenario.id : null;

    if (!traceScenarios.has(scenarioId)) {
      const scenario: GoalTraceScenario = {
        goals: [],
        config: planScenarios?.find((sc) => sc.id === scenarioId) ?? {},
      };

      if (scenarioId && scenario.config?.name) {
        scenario.name = scenario.config.name;
      } else {
        scenario.name = i18n.t('goal');
      }
      traceScenarios.set(scenarioId, scenario);
    }
    traceScenarios.get(scenarioId)?.goals.push(goal);
  });

  // Sort
  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;
    scenario.goals = goals
      .sort((a, b) => a.date - b.date)
      .map((item) => {
        const { date, value, categories } = item;
        const newDate = indicator.timeResolution === 'YEAR' ? `${date.split('-')[0]}-1-1` : date;
        return { date: newDate, value, categories };
      });
  });

  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;

    const trace = {
      scenario: scenario.config,
      y: goals.map((item) => item.value),
      x: goals.map((item) => {
        const newDate =
          indicator.timeResolution === 'YEAR' ? `${item.date.split('-')[0]}-1-1` : item.date;
        return newDate;
      }),
      name: scenario.name,
    };

    goalTraces.push(trace);
  });

  const bounds = calculateBounds(goalTraces.map((t) => t.y).flat());
  return [goalTraces, bounds];
};

export function calculateBounds(values) {
  if (values.length === 0) {
    return null;
  }
  return {
    min: Math.min(...values),
    max: Math.max(...values),
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

  // The tick interval ECharts will pick for the axis (its nice() rounding
  // with round=true). Snapping the bounds to multiples of anything finer
  // leaves the axis min/max between nice ticks, and ECharts labels those
  // boundary values too — after tick rounding the boundary label can
  // duplicate the neighboring nice tick (e.g. "100" printed twice).
  const niceInterval = (roughStep: number): number => {
    const magnitude = 10 ** Math.floor(Math.log10(roughStep));
    const fraction = roughStep / magnitude;
    const niceFraction =
      fraction < 1.5 ? 1 : fraction < 2.5 ? 2 : fraction < 4 ? 3 : fraction < 7 ? 5 : 10;
    return niceFraction * magnitude;
  };

  // Snapping widens the extent, which can change the interval ECharts
  // derives from it; iterate until the snapped bounds are stable.
  for (let i = 0; i < 3; i++) {
    const step = niceInterval((max - min) / Math.max(tickCount, 1));
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
  // The dimension/cube structures are untyped legacy shapes consumed by the
  // graph components; typing them properly isn't worth it before the planned
  // migration to backend-computed chart series.
  dimensions: any[];
  name: string;
  cube?: unknown;
};

export function getIndicatorGraphSpecification(
  indicator,
  compareOrganization,
  t,
  normalizerId
): IndicatorGraphSpecification {
  const indicators = [indicator];
  let dimensions = JSON.parse(JSON.stringify(indicator.dimensions));

  const dimensionedValues = indicator.values.filter((val) => val.categories.length > 0);
  if (dimensionedValues.length === 0 && dimensions.length !== 0) {
    captureMessage(
      `Data consistency error: indicator ${indicator.id} has dimensions, but the data does not`
    );
    dimensions = [];
  }

  if (compareOrganization) {
    const compareIndicator = indicator.common.indicators.find(
      (x) => x.organization.id === compareOrganization
    );
    indicators.push(compareIndicator);
    const comparisonDimension = {
      dimension: {
        sort: 'last',
        type: 'organization',
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
      const { categories, type } = d.dimension;
      if (type === 'organization') {
        return;
      }
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

function addOrganizationCategory(value, orgId) {
  const newCategories = [...value.categories];
  newCategories.push({ id: `org:${orgId}` });
  return Object.assign({}, value, { categories: newCategories });
}

function _addTotal(v, categoryCount) {
  if (v.categories.length === 0) {
    const newCategories = new Array(categoryCount).fill({ id: 'total' });
    return Object.assign({}, v, {
      categories: [...v.categories, ...newCategories],
    });
  }
  return v;
}

export function combineValues(indicator, comparisonIndicator, indicatorGraphSpecification) {
  let categoryCount = 0;
  const categoryAxis = indicatorGraphSpecification.axes.filter((a) => a[0] === 'categories');
  if (categoryAxis.length > 0) {
    categoryCount = categoryAxis[0][1];
  }
  const getValues = (indicator) =>
    indicator.values
      .map((v) => _addTotal(v, categoryCount))
      .filter((v) => v.categories.length === categoryCount)
      .map((v) =>
        comparisonIndicator == null ? v : addOrganizationCategory(v, indicator.organization.id)
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

export function normalizeByPopulationSetter(callback) {
  return (value) => {
    callback(value ? NORMALIZE_PREFER_ENABLED : NORMALIZE_PREFER_DISABLED);
  };
}

export function getNormalizeByPopulation(preferNormalizeByPopulation, comparisonIndicator) {
  if (preferNormalizeByPopulation === NORMALIZE_DEFAULT) {
    return comparisonIndicator != null;
  }
  return preferNormalizeByPopulation === NORMALIZE_PREFER_ENABLED;
}

function getNormalizedValue(valueObject, normalizerId) {
  if (normalizerId != null) {
    return valueObject.normalizedValues.find((nv) => nv.normalizerId === normalizerId).value;
  }
  return valueObject.value;
}

export function normalizeValuesByNormalizer(values, normalizerId) {
  return values.map((valueObject) =>
    Object.assign({}, valueObject, {
      value: getNormalizedValue(valueObject, normalizerId),
    })
  );
}
