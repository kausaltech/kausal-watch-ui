import type { Theme } from '@kausal/themes/types';
import { captureMessage } from '@sentry/nextjs';
import type { LineSeriesOption } from 'echarts';
import { cloneDeep, isEqual } from 'lodash';

import {
  type IndicatorGraphDataQuery,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';
import { capitalizeFirstLetter } from '@/common/utils';

type Indicator = NonNullable<IndicatorGraphDataQuery['indicator']>;
type IndicatorDimension = Indicator['dimensions'][number];
type DimensionCategory = IndicatorDimension['dimension']['categories'][number];
type ValueCategory = IndicatorValue['categories'][number];
type IndicatorValue = Indicator['values'][number];
type DataPoint = { date: string; value: number };
type NestedArray = DataPoint[] | NestedArray[];
type PlanScenario = NonNullable<IndicatorGraphDataQuery['plan']>['scenarios'][number];
type IndicatorGoal = NonNullable<
  NonNullable<IndicatorGraphDataQuery['indicator']>['goals']
>[number];

function calculateBounds(values: (number | undefined)[]): { min: number; max: number } | null {
  const nonNullValues = values.filter((v) => v !== undefined && v !== null);
  return nonNullValues.length === 0
    ? null
    : { min: Math.min(...nonNullValues), max: Math.max(...nonNullValues) };
}

/* 
  Used to add total category to the value if it is not present
*/
function _addTotal(v: IndicatorValue, categoryCount: number): IndicatorValue {
  if (v.categories.length === 0) {
    const newCategories: ValueCategory[] = new Array<ValueCategory>(categoryCount).fill({
      id: 'total',
      __typename: 'DimensionCategory',
    });
    return Object.assign({}, v, {
      categories: [...v.categories, ...newCategories],
    });
  }
  return v;
}

export function combineValues(indicator: Indicator) {
  const categoryCount = 0;
  //const comparisonIndicator = null;
  /*const categoryAxis = indicatorGraphSpecification.axes.filter((a) => a[0] === 'categories');
  if (categoryAxis.length > 0) {
    categoryCount = categoryAxis[0][1];
  }
  */

  //.map((v) => comparisonIndicator == null ? v : addOrganizationCategory(v, indicator.organization.id)
  const indicatorValues: IndicatorValue[] = indicator.values
    .map((v) => _addTotal(v, categoryCount))
    .filter((v) => v.categories.length === categoryCount);

  return indicatorValues;
}

export function getIndicatorDimensions(indicator: Indicator, t: TFunction) {
  const indicators = [indicator];
  let dimensions: IndicatorDimension[] = cloneDeep(indicator.dimensions);

  const dimensionedValues = indicator.values.filter((val) => val.categories.length > 0);
  if (dimensionedValues.length === 0 && dimensions.length !== 0) {
    captureMessage(
      `Data consistency error: indicator ${indicator.id} has dimensions, but the data does not`
    );
    dimensions = [];
  }

  // TODO: Add comparison organization
  // Here we would add comparison indicator to the array of indicators
  // Used to calculate min and max, let's see if used
  /*
  const allValues = indicators
    .map((i) => i.values.map((x) => getNormalizedValue(x, normalizerId)))
    .flat();
  specification.bounds = calculateBounds(allValues);
  */

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
        name: capitalizeFirstLetter(t('total')),
        __typename: 'DimensionCategory',
      });
    });
  }
  return dimensions;
}

export function generateCube(
  dimensions: IndicatorDimension[],
  values: IndicatorValue[],
  path: string[] = []
): NestedArray {
  const dim = dimensions[0].dimension;
  const rest = dimensions.slice(1);

  return dim.categories.map((cat) => {
    const catPath = [...path, cat.id];
    catPath.sort();

    if (rest.length) {
      return generateCube(rest, values, catPath);
    }

    const found = values.filter((val) => {
      const ids = val.categories.map((valCat) => valCat.id).sort();
      return isEqual(ids, catPath);
    });
    return found.map(({ date, value }) => ({ date: date ?? '', value: value ?? 0 }));
  }) as NestedArray;
}

export function generateCubeFromValues(
  indicator: IndicatorGraphDataQuery['indicator'],
  graphDimensions: IndicatorDimension[],
  combinedValues: IndicatorValue[]
): NestedArray {
  const values = [...combinedValues]
    .sort(
      (a, b) =>
        (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0)
    )
    .map((item) => {
      const { date, value, categories } = item;
      // Make yearly value dates YYYY-1-1 so plotly places them correctly on axis
      const newDate =
        indicator?.timeResolution === IndicatorTimeResolution.Year
          ? `${date?.split('-')[0]}-1-1`
          : date;
      return { ...item, date: newDate, value, categories };
    });
  if (graphDimensions.length === 0) {
    return values.map(({ date, value }) => ({ date: date ?? '', value: value ?? 0 }));
  }
  /*
  const sortedGraphDimensions = graphDimensions
    .map((d) => d.dimension)
    .sort((a, b) => {
      if (a.sort === 'last') {
        return 1;
      } else if (b.sort === 'last') {
        return -1;
      }
      return a.categories.length - b.categories.length || a.id - b.id;
    });
    */
  return generateCube(graphDimensions, values);
}

export function getEchartTraces(
  dimension: IndicatorDimension['dimension'] | null,
  cube: NestedArray,
  t: TFunction,
  theme: Theme
): LineSeriesOption[] | null {
  // TODO: We could use quantity name but we can not tell if it's in the correct language
  // const name = capitalizeFirstLetter(quantityName ?? i18n.t('value'));
  const name = 'Total'; //capitalizeFirstLetter(t('value'));

  // Simple single trace
  if (dimension === null) {
    return [
      {
        name: name,
        type: 'line',
        data: cube.map((val) => [val.date as string, val.value as number]),
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: theme.graphColors.blue070,
          width: 2,
        },
        z: 2,
      },
    ];
  }

  const categories = dimension?.categories || [];
  return categories.map((cat, idx) => ({
    name: cat.name,
    type: 'line',
    data: cube[idx].map((val) => [val.date as string, val.value as number]),
  }));
}

type TraceScenario = {
  goals: IndicatorGoal[];
  config: PlanScenario | undefined;
  name: string;
};

export const generateGoalTraces = (
  indicator: NonNullable<IndicatorGraphDataQuery['indicator']>,
  planScenarios: PlanScenario[],
  t: TFunction,
  theme: Theme
): [LineSeriesOption[], { min: number; max: number } | null] => {
  // Group goals by scenario
  const traceScenarios = new Map<string, TraceScenario>();
  const goalTraces: LineSeriesOption[] = [];
  (indicator.goals || []).forEach((goal: IndicatorGoal) => {
    if (!goal) return;
    const scenarioId = goal.scenario ? goal.scenario.id : '';

    if (!traceScenarios.has(scenarioId)) {
      const scenario: TraceScenario = {
        goals: [],
        config: planScenarios?.find((sc) => sc.id === scenarioId) ?? undefined,
        name: '',
      };

      if (scenarioId && scenario.config?.name) {
        scenario.name = scenario.config.name;
      } else {
        scenario.name = t('goal');
      }
      traceScenarios.set(scenarioId, scenario);
    }
    traceScenarios.get(scenarioId)?.goals.push(goal);
  });

  // Sort
  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;
    scenario.goals = goals
      .sort(
        (a, b) =>
          (a?.date ? new Date(a.date).getTime() : 0) - (b?.date ? new Date(b.date).getTime() : 0)
      )
      .map((item) => {
        if (!item) return item;
        const newDate =
          indicator.timeResolution === IndicatorTimeResolution.Year
            ? `${item.date?.split('-')[0]}-1-1`
            : item.date;
        return { ...item, date: newDate } as IndicatorGoal;
      });
  });

  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;
    const nonNullGoals = goals.filter((item) => item !== null);
    const values = nonNullGoals.map((item) => item.value);
    const dates = nonNullGoals.map((item) => {
      const newDate =
        indicator.timeResolution === IndicatorTimeResolution.Year
          ? `${item?.date?.split('-')[0]}-1-1`
          : item.date;
      return newDate ?? '';
    });
    const trace: LineSeriesOption = {
      data: dates.map((date, index) => [date, values[index]]),
      name: scenario.name,
      type: 'line',
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        color: theme.graphColors.green030,
      },
      connectNulls: true,
      z: 1,
      lineStyle: {
        color: theme.graphColors.green030,
        type: 'dashed',
        width: 2,
      },
    };

    goalTraces.push(trace);
  });

  const bounds = calculateBounds(goalTraces.map((t) => t.data?.map((d) => d[1] as number)).flat());
  return [goalTraces, bounds];
};
