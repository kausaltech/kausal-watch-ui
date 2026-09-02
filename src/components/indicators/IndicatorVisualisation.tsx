'use client';

import { type ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import { useQuery } from '@apollo/client/react';
import { captureMessage } from '@sentry/nextjs';
import { isEqual } from 'lodash-es';
import { useLocale, useTranslations } from 'next-intl';
import { Alert } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import type {
  IndicatorDetailsQuery,
  IndicatorGraphDataQuery,
  IndicatorGraphDataQueryVariables,
} from '@/common/__generated__/graphql';
import { IndicatorTimeResolution } from '@/common/__generated__/graphql';
import { linearRegression } from '@/common/math';
import { capitalizeFirstLetter } from '@/common/utils';
import GraphAsTable from '@/components/graphs/GraphAsTable';
import IndicatorGraph, {
  type ChartTrace,
  type GoalTrace,
} from '@/components/graphs/IndicatorGraph';
import LegacyIndicatorGraph from '@/components/graphs/legacy/IndicatorGraph';
import IndicatorComparisonSelect from '@/components/indicators/IndicatorComparisonSelect';
import IndicatorNormalizationSelect from '@/components/indicators/IndicatorNormalizationSelect';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/queries/get-indicator-graph-data';

import RichText from '../common/RichText';
import IndicatorVisualizationBlock from './IndicatorVisualizationBlock';

type GraphIndicator = NonNullable<IndicatorGraphDataQuery['indicator']>;
type ComparisonIndicator = NonNullable<GraphIndicator['common']>['indicators'][number];
type GraphValue = {
  date: string | null;
  value: number;
  categories: Array<{ id: string }>;
  normalizedValues: Array<{ normalizerId: string | null; value: number | null }>;
};
type GraphDimension = {
  id: string;
  name: string;
  sort?: string;
  type?: string;
  categories: Array<{ id: string; name: string; defaultColor?: string; type?: string }>;
};
type ProcessedValue = Pick<GraphValue, 'value' | 'categories'> & { date: string };
type CubeLeafValue = Pick<ProcessedValue, 'date' | 'value'>;
type DataCube = CubeLeafValue[] | DataCube[];
type Bounds = { min: number; max: number };
type GraphSpecification = {
  axes: Array<[string, number]>;
  bounds: Bounds;
  dimensions: GraphDimension[];
  name: string;
  cube?: unknown[];
};
type Translator = { t: (key: string) => string };
type Scenario = NonNullable<IndicatorGraphDataQuery['plan']>['scenarios'][number];
type ScenarioGoalTrace = GoalTrace & { scenario?: Scenario | Record<string, never> };

function generateCube(
  dimensions: GraphDimension[],
  values: ProcessedValue[],
  path: string[] = []
): DataCube {
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

function generateCubeFromValues(
  indicator: GraphIndicator,
  indicatorGraphSpecification: GraphSpecification,
  combinedValues: GraphValue[]
): DataCube {
  const values = [...combinedValues]
    .sort((a, b) => Number(a.date) - Number(b.date))
    .map((item) => {
      const { date, value, categories } = item;
      // Make yearly value dates YYYY-1-1 so plotly places them correctly on axis
      const newDate =
        indicator.timeResolution === IndicatorTimeResolution.Year
          ? `${date!.split('-')[0]}-1-1`
          : date!;
      return { date: newDate, value, categories };
    });
  if (indicatorGraphSpecification.dimensions.length === 0) {
    return values;
  }
  indicatorGraphSpecification.dimensions = indicatorGraphSpecification.dimensions.sort((a, b) => {
    if (a.sort === 'last') {
      return 1;
    } else if (b.sort === 'last') {
      return -1;
    }
    const categoryCountDifference = a.categories.length - b.categories.length;
    return categoryCountDifference !== 0 ? categoryCountDifference : Number(a.id) - Number(b.id);
  });
  return generateCube(indicatorGraphSpecification.dimensions, values);
}

function getTraces(
  dimensions: GraphDimension[],
  cube: DataCube,
  names: Set<string> | null,
  hasTimeDimension: boolean,
  i18n: Translator
): ChartTrace[] {
  // TODO: We could use quantity name but we can not tell if it's in the correct language
  // const name = capitalizeFirstLetter(quantityName ?? i18n.t('value'));
  const name = capitalizeFirstLetter(i18n.t('value'));
  if (dimensions.length === 0) {
    const values = cube as CubeLeafValue[];
    return [
      {
        xType: 'time',
        name: name,
        dataType: 'total',
        x: values.map((val) => {
          return val.date;
        }),
        y: values.map((val) => val.value),
      },
    ];
  }
  const [firstDimension, ...rest] = dimensions;
  if (dimensions.length === 1) {
    const dimensionValues = cube as CubeLeafValue[][];
    if (hasTimeDimension) {
      return firstDimension.categories.map((cat, idx) => {
        const traceName = Array.from(new Set(names ?? undefined).add(cat.name)).join(', ');
        let x,
          y,
          _cube = dimensionValues[idx];
        x = _cube.map((val) => val.date);
        y = _cube.map((val) => val.value);
        return {
          xType: 'time',
          dataType: cat.id === 'total' ? 'total' : null,
          name: traceName,
          _parentName: names ? Array.from(names).join(', ') : null,
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
        x: firstDimension.categories.map((cat) => cat.name),
        y: dimensionValues.map((values) => values[0]?.value ?? null),
      },
    ];
  }
  let traces: ChartTrace[] = [];
  const nestedCubes = cube as DataCube[];

  firstDimension.categories.forEach((cat, idx) => {
    const out = getTraces(
      rest,
      nestedCubes[idx],
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

const generateTrendTrace = (
  indicator: GraphIndicator,
  traces: ScenarioGoalTrace[],
  goals: GoalTrace[],
  i18n: Translator
): [GoalTrace | undefined, Bounds | null | undefined] => {
  const hasPotentialScenario = traces.find((goal) => goal.scenario?.identifier === 'potential');
  if (
    indicator.timeResolution === IndicatorTimeResolution.Year &&
    traces[0].y.length >= 5 &&
    !hasPotentialScenario
  ) {
    const values = [...indicator.values]
      .sort((a, b) => Number(a.date) - Number(b.date))
      .map((item) => {
        const { date, value, categories } = item;
        // Make yearly value dates YYYY-1-1 so plotly places them correctly on axis
        return { date: date!, value, categories };
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
    const predictedTrace: GoalTrace = {
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

    predictedTrace.y = predictedTrace.x.map((year) => model.m * Number(year) + model.b);
    // We want the year format 2019-1-1 so plotly places them correctly on axis
    const formattedTrace = {
      x: predictedTrace.x.map((year) => `${year}-1-1`),
      y: predictedTrace.y,
      name: i18n.t('current-trend'),
    };
    return [formattedTrace, calculateBounds(predictedTrace.y)];
  }
  return [undefined, undefined];
};

const generateGoalTraces = (
  indicator: GraphIndicator,
  planScenarios: Scenario[],
  i18n: Translator
): [ScenarioGoalTrace[], Bounds | null] => {
  // Group goals by scenario
  type Goal = NonNullable<NonNullable<GraphIndicator['goals']>[number]>;
  type GoalScenario = { goals: Goal[]; config: Scenario | Record<string, never>; name: string };
  const traceScenarios = new Map<string | null, GoalScenario>();
  const goalTraces: ScenarioGoalTrace[] = [];
  (indicator.goals ?? []).forEach((goal) => {
    if (!goal) return;
    const scenarioId = goal.scenario ? goal.scenario.id : null;

    if (!traceScenarios.has(scenarioId)) {
      const scenario: GoalScenario = {
        goals: [],
        config: planScenarios?.find((sc) => sc.id === scenarioId) ?? {},
        name: i18n.t('goal'),
      };

      if (scenarioId && scenario.config?.name) {
        scenario.name = scenario.config.name;
      } else {
        scenario.name = i18n.t('goal');
      }
      traceScenarios.set(scenarioId, scenario);
    }
    traceScenarios.get(scenarioId)!.goals.push(goal);
  });

  traceScenarios.forEach((scenario) => {
    const goals = [...scenario.goals].sort((a, b) => Number(a.date) - Number(b.date));

    const trace = {
      scenario: scenario.config,
      y: goals.map((item) => item.value),
      x: goals.map((item) => {
        const newDate =
          indicator.timeResolution === IndicatorTimeResolution.Year
            ? `${item.date!.split('-')[0]}-1-1`
            : item.date!;
        return newDate;
      }),
      name: scenario.name,
    };

    goalTraces.push(trace);
  });

  const bounds = calculateBounds(goalTraces.map((t) => t.y).flat());
  return [goalTraces, bounds];
};

function calculateBounds(values: Array<number | null>): Bounds | null {
  if (values.length === 0) {
    return null;
  }
  return {
    min: Math.min(...values.map(Number)),
    max: Math.max(...values.map(Number)),
  };
}

function getIndicatorGraphSpecification(
  indicator: GraphIndicator,
  compareOrganization: string | undefined,
  t: (key: string) => string,
  normalizerId: string | null
): GraphSpecification {
  const indicators: Array<GraphIndicator | ComparisonIndicator> = [indicator];
  let dimensions = JSON.parse(JSON.stringify(indicator.dimensions)) as Array<{
    dimension: GraphDimension;
  }>;

  const dimensionedValues = indicator.values.filter((val) => val.categories.length > 0);
  if (dimensionedValues.length === 0 && dimensions.length !== 0) {
    captureMessage(
      `Data consistency error: indicator ${indicator.id} has dimensions, but the data does not`
    );
    dimensions = [];
  }

  if (compareOrganization) {
    const compareIndicator = indicator.common!.indicators.find(
      (x) => x.organization.id === compareOrganization
    );
    if (compareIndicator) indicators.push(compareIndicator);
    const comparisonDimension: { dimension: GraphDimension } = {
      dimension: {
        id: 'organization',
        name: 'organization',
        sort: 'last',
        type: 'organization',
        categories: [],
      } satisfies GraphDimension,
    };
    comparisonDimension.dimension.categories = indicators.map((i) => ({
      id: `org:${i.organization.id}`,
      name: i.organization.name,
      type: 'organization',
    }));
    dimensions.push(comparisonDimension);
  }

  const allValues = indicators
    .map((i) => i.values.map((x) => getNormalizedValue(x, normalizerId)))
    .flat();
  const bounds = calculateBounds(allValues);

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

  const axes: Array<[string, number]> = [];
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
    axes,
    dimensions: dimensions.map((d) => d.dimension),
    name: indicator.name,
    bounds: bounds!,
  };
}

function addOrganizationCategory(value: GraphValue, orgId: string): GraphValue {
  const newCategories = [...value.categories]; //
  newCategories.push({ id: `org:${orgId}` });
  return Object.assign({}, value, { categories: newCategories });
}

function _addTotal(v: GraphValue, categoryCount: number): GraphValue {
  if (v.categories.length === 0) {
    const newCategories = new Array(categoryCount).fill({ id: 'total' });
    return Object.assign({}, v, {
      categories: [...v.categories, ...newCategories],
    });
  }
  return v;
}

function combineValues(
  indicator: GraphIndicator,
  comparisonIndicator: ComparisonIndicator | undefined,
  indicatorGraphSpecification: GraphSpecification
): GraphValue[] {
  let categoryCount = 0;
  const categoryAxis = indicatorGraphSpecification.axes.filter((a) => a[0] === 'categories');
  if (categoryAxis.length > 0) {
    categoryCount = categoryAxis[0][1];
  }
  const getValues = (indicator: GraphIndicator | ComparisonIndicator) =>
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

const NORMALIZE_DEFAULT = 'default';
const NORMALIZE_PREFER_ENABLED = 'enabled';
const NORMALIZE_PREFER_DISABLED = 'disabled';

function normalizeByPopulationSetter(callback: (value: string) => void) {
  return (value: boolean) => {
    callback(value ? NORMALIZE_PREFER_ENABLED : NORMALIZE_PREFER_DISABLED);
  };
}

function getNormalizeByPopulation(
  preferNormalizeByPopulation: string,
  comparisonIndicator: ComparisonIndicator | undefined
) {
  if (preferNormalizeByPopulation === NORMALIZE_DEFAULT) {
    return comparisonIndicator != null;
  }
  return preferNormalizeByPopulation === NORMALIZE_PREFER_ENABLED;
}

function getNormalizedValue(valueObject: GraphValue, normalizerId: string | null): number {
  if (normalizerId != null) {
    return valueObject.normalizedValues.find((nv) => nv.normalizerId === normalizerId)!.value!;
  }
  return valueObject.value;
}

function normalizeValuesByNormalizer(values: GraphValue[], normalizerId: string): GraphValue[] {
  return values.map((valueObject) =>
    Object.assign({}, valueObject, {
      value: getNormalizedValue(valueObject, normalizerId),
    })
  );
}

type IndicatorDetailsIndicator = NonNullable<IndicatorDetailsQuery['indicator']>;
type DefaultVisualization = IndicatorDetailsIndicator['defaultVisualization'];

export type IndicatorVisualisationProps = {
  indicatorId: string;
  indicatorLink?: string;
  useLegacyGraph?: boolean;
  showReference?: boolean;
  showGraph?: boolean;
  showTable?: boolean;
  showFactorValues?: boolean;
  defaultVisualization?: DefaultVisualization;
};

const FactorChartTitle = styled.div`
  margin-top: ${(props) => props.theme.spaces.s200};
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

type FactorChartsProps = {
  datasets: NonNullable<IndicatorGraphDataQuery['indicator']>['datasets'];
  timeResolution: NonNullable<IndicatorGraphDataQuery['indicator']>['timeResolution'];
  values: NonNullable<IndicatorGraphDataQuery['indicator']>['values'];
  valueRounding?: number | null;
  showGraph: boolean;
  showTable: boolean;
  unitLabel: string;
  mainXAxisRange?: { min: number; max: number };
  language: string;
};

function FactorCharts({
  datasets,
  timeResolution,
  values,
  valueRounding,
  showGraph,
  showTable,
  unitLabel,
  mainXAxisRange,
}: FactorChartsProps) {
  const t = useTranslations();

  const indicatorValueByYear = new Map<string, number | null>();
  values.forEach((v) => {
    if (!v.date) return;
    indicatorValueByYear.set(v.date.split('-')[0], v.value);
  });

  return (
    <>
      {datasets?.flatMap((dataset) => {
        const computedMetrics = dataset.schema?.metrics.filter((m) => m.isComputed) ?? [];
        return computedMetrics.map((metric) => {
          const points = dataset.computedDataPoints
            .filter((p) => p.metric.label === metric.label)
            .sort((a, b) => a.date.localeCompare(b.date));
          if (points.length === 0) return null;

          const factorTrace = {
            xType: 'time' as const,
            name: capitalizeFirstLetter(t('value')),
            dataType: 'total' as const,
            x: points.map((p) =>
              timeResolution === IndicatorTimeResolution.Year
                ? `${p.date.split('-')[0]}-1-1`
                : p.date
            ),
            y: points.map((p) => p.value),
          };

          const factorX: string[] = [];
          const factorY: Array<number | null> = [];
          points.forEach((p) => {
            const yearKey = p.date.split('-')[0];
            const indicatorVal = indicatorValueByYear.get(yearKey) ?? null;
            const dateStr =
              timeResolution === IndicatorTimeResolution.Year ? `${yearKey}-1-1` : p.date;
            factorX.push(dateStr);
            factorY.push(
              p.value !== null && indicatorVal !== null && indicatorVal !== 0
                ? p.value / indicatorVal
                : null
            );
          });
          const factorExtraColumn = {
            header: `Factor (${metric.unit}/${unitLabel})`,
            x: factorX,
            y: factorY,
          };

          const pointValues = points.map((p) => p.value).filter((v): v is number => v !== null);
          const factorBounds = calculateBounds(pointValues) ?? { min: 0, max: 0 };
          const delta = factorBounds.max - factorBounds.min;
          const paddedBounds = {
            min: factorBounds.min - delta * 0.1,
            max: factorBounds.max + delta * 0.1,
          };
          const factorYRange = {
            unit: metric.unit,
            minDigits: 0,
            maxDigits: 0,
            ticksCount: 2,
            ticksRounding: undefined,
            valueRounding: valueRounding ?? undefined,
            includeZero: false,
            range: [paddedBounds.min, paddedBounds.max],
          };
          const factorSpec = { axes: [['time', 1]] as [string, number][] };

          return (
            <div key={`${dataset.uuid}-${metric.label}`}>
              <FactorChartTitle>{metric.label}</FactorChartTitle>
              {showGraph && (
                <div aria-hidden="true">
                  <IndicatorGraph
                    specification={factorSpec}
                    yRange={factorYRange}
                    timeResolution={timeResolution}
                    traces={[factorTrace]}
                    goalTraces={[]}
                    trendTrace={null}
                    title={null}
                    desiredTrend={null}
                    referenceValue={null}
                    nonQuantifiedGoal={{ trend: null, date: null }}
                    height={225}
                    xAxisRange={mainXAxisRange}
                  />
                </div>
              )}
              {showTable && (
                <GraphAsTable
                  specification={factorYRange}
                  timeResolution={timeResolution}
                  data={[factorTrace]}
                  goalTraces={[]}
                  title={metric.label}
                  extraColumns={[factorExtraColumn]}
                  openByDefault={!showGraph}
                />
              )}
            </div>
          );
        });
      })}
    </>
  );
}

function IndicatorVisualisation({
  indicatorId,
  indicatorLink,
  useLegacyGraph = true,
  showReference = false,
  showGraph = true,
  showTable = true,
  showFactorValues = false,
  defaultVisualization,
}: IndicatorVisualisationProps) {
  const plan = usePlan();
  const enableIndicatorComparison = plan.features.enableIndicatorComparison === true;
  const t = useTranslations();
  const locale = useLocale();
  // Legacy support for old code referencing i18n from next-i18next
  const i18n = {
    t,
    language: locale,
  };
  const [compareTo, setCompareTo] = useState<string | undefined>(undefined);
  const [preferNormalizeByPopulation, setPreferNormalizeByPopulation] = useState(NORMALIZE_DEFAULT);

  const { loading, error, data } = useQuery<
    IndicatorGraphDataQuery,
    IndicatorGraphDataQueryVariables
  >(GET_INDICATOR_GRAPH_DATA, {
    variables: {
      id: indicatorId,
      plan: plan.identifier,
    },
  });

  if (loading) return <ContentLoader message={t('loading')} />;
  if (error) return <Alert color="danger">{`${t('error')}: ${error.message}`}</Alert>;
  if (!data || !data.plan) return null;

  const {
    indicator,
    plan: { scenarios },
  } = data;

  if (!indicator) return <Alert color="danger">{t('indicator-not-found')}</Alert>;

  if (indicator.values.length === 0) {
    return null;
  }

  const comparisonIndicator = indicator.common?.indicators.find(
    (indicator) => indicator.organization.id === compareTo
  );
  const populationNormalizer = indicator.common?.normalizations.find(
    (normalization) => normalization.normalizer.identifier === 'population'
  );

  let canBeNormalized = false;
  if (populationNormalizer !== undefined) {
    let values = indicator.values;
    if (comparisonIndicator) {
      values = values.concat(comparisonIndicator.values);
    }
    if (
      values.find(
        // There must be no values which cannot be normalized
        // pre capita
        (v) =>
          v.normalizedValues?.find(
            (nv) => nv?.normalizerId === populationNormalizer.normalizer.id
          ) === undefined
      ) === undefined
    ) {
      canBeNormalized = true;
    }
  }

  const setNormalizeByPopulation = normalizeByPopulationSetter(setPreferNormalizeByPopulation);
  const normalizeByPopulation = canBeNormalized
    ? getNormalizeByPopulation(preferNormalizeByPopulation, comparisonIndicator)
    : false;

  const indicatorGraphSpecification = getIndicatorGraphSpecification(
    indicator,
    compareTo,
    t,
    normalizeByPopulation ? populationNormalizer!.normalizer.id : null
  );

  /// Determine Indicator unit label and y-axis range
  const { unit } = normalizeByPopulation ? populationNormalizer! : indicator;
  const unitHasName = 'name' in unit;
  const unitLabel =
    unitHasName && unit.name === 'no unit' ? '' : unit.shortName || (unitHasName ? unit.name : '');

  const plotTitle = indicator.name;

  let combinedValues = combineValues(indicator, comparisonIndicator, indicatorGraphSpecification);
  if (normalizeByPopulation) {
    combinedValues = normalizeValuesByNormalizer(
      combinedValues,
      populationNormalizer!.normalizer.id
    );
  }
  /// Process data for data traces
  const cube = generateCubeFromValues(indicator, indicatorGraphSpecification, combinedValues);

  indicatorGraphSpecification.cube = cube;
  const hasTimeDimension =
    indicatorGraphSpecification.axes.filter((a) => a[0] === 'time').length > 0;
  const showTotalLine = indicator.showTotalLine;
  const allTraces = getTraces(
    indicatorGraphSpecification.dimensions,
    cube,
    null,
    hasTimeDimension,
    i18n
  );
  // If all traces are "total" (no dimensions), keep them regardless of showTotalLine.
  // Otherwise, filter out the total when showTotalLine is false.
  const hasOnlyTotalTraces = allTraces.every((trace) => trace.dataType === 'total');
  const traces = hasOnlyTotalTraces
    ? allTraces
    : allTraces.filter((t) => t.dataType !== 'total' || showTotalLine);

  const [goalTraces, goalBounds]: [ScenarioGoalTrace[], Bounds | null] = normalizeByPopulation
    ? [[], null]
    : generateGoalTraces(indicator, scenarios, i18n);

  // Get the x-axis date range from the main chart for use by factor charts
  // This keeps axes consistent for charts displayed on top of each other
  const timestamps = traces
    .flatMap((trace) => new Date(String(trace.x)).getTime())
    .filter((trace) => !isNaN(trace));

  const mainXAxisRange =
    timestamps.length === 0
      ? undefined
      : { min: Math.min(...timestamps), max: Math.max(...timestamps) };

  const [trendTrace, trendBounds]: [GoalTrace | null | undefined, Bounds | null | undefined] =
    normalizeByPopulation ||
    !hasTimeDimension ||
    !indicator.showTrendline ||
    !indicator.showTotalLine
      ? [null, null]
      : generateTrendTrace(indicator, traces, goalTraces, i18n);

  // Include trend and goal bounds in the calculation
  let bounds: Bounds = indicatorGraphSpecification.bounds;
  for (const addBounds of [goalBounds, trendBounds]) {
    if (addBounds) {
      bounds = calculateBounds([
        ...Object.values(bounds),
        ...Object.values(addBounds).filter((b) => b != null && !isNaN(b)),
      ])!;
    }
  }

  // Round bounds to avoid overly precise floating point values
  // Use a reasonable precision based on the magnitude of the values
  const roundBounds = (value: number): number => {
    if (value === 0 || !isFinite(value)) return value;
    const absValue = Math.abs(value);
    // Determine appropriate precision based on magnitude
    let precision: number;
    if (absValue >= 1000) {
      precision = 1; // Round to nearest integer for large numbers
    } else if (absValue >= 100) {
      precision = 1; // Round to 1 decimal place
    } else if (absValue >= 10) {
      precision = 2; // Round to 2 decimal places
    } else if (absValue >= 1) {
      precision = 3; // Round to 3 decimal places
    } else {
      // For values < 1, use more precision
      const magnitude = Math.floor(Math.log10(absValue));
      precision = Math.abs(magnitude) + 3;
    }
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  };

  // Only add 10% padding if explicit minValue/maxValue are NOT set
  // If explicit values are provided, use them directly without padding
  if (indicator.minValue == null && indicator.maxValue == null) {
    // Add 10% padding to bounds (adds 10% extra space above and below the data range)
    const delta = bounds.max - bounds.min;
    bounds.max = roundBounds(bounds.max + delta * 0.1);
    bounds.min = roundBounds(bounds.min - delta * 0.1);
  }
  indicatorGraphSpecification.bounds = bounds;

  const yRange = {
    unit: unitLabel,
    minDigits: 0,
    maxDigits: 0,
    ticksCount: indicator.ticksCount ?? undefined,
    ticksRounding: indicator.ticksRounding ?? undefined,
    valueRounding: indicator.valueRounding ?? undefined,
    includeZero: false,
    range: [] as number[],
  };
  // includeZero is kept for backwards compatibility but not used since we always set range
  // Only set to true if explicitly requested via minValue or maxValue
  if (indicator.minValue === 0 || indicator.maxValue === 0) {
    yRange.includeZero = true;
  } else if (indicator?.quantity?.name === 'päästöt' && indicator.minValue == null) {
    yRange.includeZero = true;
  }

  // If explicit minValue/maxValue are set, use them directly without any modification
  // Otherwise, use calculated bounds (but don't force 0 unless explicitly requested)
  let minValue, maxValue;
  if (indicator.minValue != null) {
    // Use explicit minValue exactly as provided
    minValue = indicator.minValue;
  } else {
    minValue = indicatorGraphSpecification.bounds.min;
    // Legacy support: for 'päästöt' quantity, include 0 if no explicit minValue is set
    if (indicator?.quantity?.name === 'päästöt' && minValue > 0) {
      minValue = 0;
    }
  }

  if (indicator.maxValue != null) {
    // Use explicit maxValue exactly as provided
    maxValue = indicator.maxValue;
  } else {
    maxValue = indicatorGraphSpecification.bounds.max;
  }

  // Always set range to prevent ECharts from auto-ranging and including 0
  // When explicit minValue/maxValue are provided, use them exactly without padding
  yRange.range = [minValue, maxValue];

  // Update bounds to match the range when explicit values are set
  // This ensures bounds reflect the actual range being used
  if (indicator.minValue != null || indicator.maxValue != null) {
    indicatorGraphSpecification.bounds = {
      min: minValue,
      max: maxValue,
    };
  }

  const comparisonOrgs = indicator.common?.indicators
    .map((common) => common.organization)
    .filter((org) => org.id !== indicator.organization.id);

  let graphComponent: ReactElement;
  if (useLegacyGraph) {
    /* TODO: All of the features still in use in LegacyIndicatorGraph
       will be incorporated into IndicatorGraph.
     */
    graphComponent = (
      <div aria-hidden="true">
        <LegacyIndicatorGraph
          specification={indicatorGraphSpecification}
          yRange={yRange}
          timeResolution={indicator.timeResolution}
          traces={traces}
          goalTraces={goalTraces}
          trendTrace={trendTrace ?? null}
          title={plotTitle}
        />
      </div>
    );
  } else if (defaultVisualization && !compareTo && !normalizeByPopulation) {
    /* TODO: A generalized IndicatorGraph component
       will be the internal implementation of the
       graph component that IndicatorVisualizationBlock
       dispatches to -- and also of all the
       Indicator Visualization Blocks.

       Currently, the block implementations are in use
       and they do not support normalization or comparison.

       Also, IndicatorVisualizationBlock now only supports the simplified
       one-dimensioned data received straight from the backend.
     */
    graphComponent = (
      <div aria-hidden={showTable}>
        <IndicatorVisualizationBlock block={defaultVisualization} />
      </div>
    );
  } else {
    /* TODO: Generalize graphComponent to be the basis of all graphs. */
    graphComponent = (
      // TODO: Show title depending on context
      <div aria-hidden={showTable}>
        <IndicatorGraph
          specification={indicatorGraphSpecification}
          yRange={yRange}
          timeResolution={indicator.timeResolution}
          traces={traces}
          goalTraces={goalTraces}
          trendTrace={trendTrace ?? null}
          title={null}
          desiredTrend={indicator.desiredTrend}
          referenceValue={indicator.referenceValue}
          nonQuantifiedGoal={{
            trend: indicator.nonQuantifiedGoal,
            date: indicator.nonQuantifiedGoalDate,
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {indicatorLink && (
        <a href={indicatorLink} target="_blank" rel="noreferrer">
          <h2>{plotTitle}</h2>
        </a>
      )}
      {enableIndicatorComparison && comparisonOrgs && comparisonOrgs.length > 0 && (
        <IndicatorComparisonSelect
          handleChange={setCompareTo}
          currentValue={compareTo}
          options={comparisonOrgs}
          defaultOrg={indicator.organization}
        />
      )}
      {canBeNormalized && (
        <IndicatorNormalizationSelect
          handleChange={setNormalizeByPopulation}
          currentValue={normalizeByPopulation}
        />
      )}
      {showGraph && graphComponent}
      {showTable && (
        <GraphAsTable
          specification={yRange}
          timeResolution={indicator.timeResolution}
          data={traces}
          goalTraces={goalTraces}
          title={plotTitle}
          openByDefault={!showGraph}
        />
      )}
      {showFactorValues && indicator.datasets && (
        <FactorCharts
          datasets={indicator.datasets}
          timeResolution={indicator.timeResolution}
          values={indicator.values}
          valueRounding={indicator.valueRounding}
          showGraph={showGraph}
          showTable={showTable}
          unitLabel={unitLabel}
          mainXAxisRange={mainXAxisRange}
          language={i18n.language}
        />
      )}
      {indicator.reference && showReference && (
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '0.5em' }}>{t('reference')}:</span>
          <RichText html={indicator.reference} />
        </div>
      )}
    </div>
  );
}

export default IndicatorVisualisation;
