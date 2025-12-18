'use client';

import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { captureMessage } from '@sentry/nextjs';
import { isEqual } from 'lodash';
import { useLocale, useTranslations } from 'next-intl';
import { Alert } from 'reactstrap';

import type {
  IndicatorGraphDataQuery,
  IndicatorGraphDataQueryVariables,
} from '@/common/__generated__/graphql';
import { linearRegression } from '@/common/math';
import { capitalizeFirstLetter } from '@/common/utils';
import ContentLoader from '@/components/common/ContentLoader';
import GraphAsTable from '@/components/graphs/GraphAsTable';
import IndicatorGraph from '@/components/graphs/IndicatorGraph';
import LegacyIndicatorGraph from '@/components/graphs/legacy/IndicatorGraph';
import IndicatorComparisonSelect from '@/components/indicators/IndicatorComparisonSelect';
import IndicatorNormalizationSelect from '@/components/indicators/IndicatorNormalizationSelect';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/queries/get-indicator-graph-data';

import RichText from '../common/RichText';

function generateCube(dimensions, values, path) {
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

function generateCubeFromValues(indicator, indicatorGraphSpecification, combinedValues) {
  const values = [...combinedValues]
    .sort((a, b) => a.date - b.date)
    .map((item) => {
      const { date, value, categories } = item;
      // Make yearly value dates YYYY-1-1 so plotly places them correctly on axis
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

function getTraces(dimensions, cube, names, hasTimeDimension, i18n, quantityName) {
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
        y: cube.map((c) => c[0]?.value),
      },
    ];
  }
  let traces = [];

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

const generateTrendTrace = (indicator, traces, goals, i18n) => {
  const hasPotentialScenario = traces.find((goal) => goal.scenario?.identifier === 'potential');
  if (indicator.timeResolution === 'YEAR' && traces[0].y.length >= 5 && !hasPotentialScenario) {
    const values = [...indicator.values]
      .sort((a, b) => a.date - b.date)
      .map((item) => {
        const { date, value, categories } = item;
        // Make yearly value dates YYYY-1-1 so plotly places them correctly on axis
        return { date, value, categories };
      });
    const mainValues = values.filter((item) => !item.categories.length);
    const numberOfYears = Math.min(mainValues.length, 10);
    const regData = mainValues
      .slice(mainValues.length - numberOfYears, mainValues.length)
      .map((item) => [parseInt(item.date, 10), item.value]);
    const model = linearRegression(regData);
    const predictedTrace = {
      x: regData.map((item) => item[0]),
      name: i18n.t('current-trend'),
    };

    const highestDataYear = traces[0].y[traces[0].y.length - 1];
    const highestGoalYear = Math.max(
      ...goals.map((goal) => {
        const goalDate = goal.x[goal.x.length - 1];
        return goalDate ? new Date(goalDate).getFullYear() : NaN;
      })
    );

    if (highestGoalYear && highestGoalYear > highestDataYear) {
      predictedTrace.x.push(highestGoalYear);
    }

    predictedTrace.y = predictedTrace.x.map((year) => model.m * year + model.b);
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

const generateGoalTraces = (indicator, planScenarios, i18n) => {
  // Group goals by scenario
  const traceScenarios = new Map();
  const goalTraces = [];
  (indicator.goals || []).forEach((goal) => {
    const scenarioId = goal.scenario ? goal.scenario.id : null;

    if (!traceScenarios.has(scenarioId)) {
      const scenario = {
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
    traceScenarios.get(scenarioId).goals.push(goal);
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

function calculateBounds(values) {
  if (values.length === 0) {
    return null;
  }
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

function getIndicatorGraphSpecification(indicator, compareOrganization, t, normalizerId) {
  const specification = {};
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
      dimension: { sort: 'last', type: 'organization' },
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
  specification.bounds = calculateBounds(allValues);

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

  const axes = [];
  if (indicator.dimensions.length > 0) {
    axes.push(['categories', indicator.dimensions.length]);
  }
  if (compareOrganization != null) {
    axes.push(['comparison', 1]);
  }
  if (hasTime) {
    axes.push(['time', 1]);
  }

  specification.axes = axes;
  specification.dimensions = dimensions;
  specification.name = indicator.name;

  return specification;
}

function addOrganizationCategory(value, orgId) {
  const newCategories = [...value.categories]; //
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

function combineValues(indicator, comparisonIndicator, indicatorGraphSpecification) {
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

const NORMALIZE_DEFAULT = 'default';
const NORMALIZE_PREFER_ENABLED = 'enabled';
const NORMALIZE_PREFER_DISABLED = 'disabled';

function normalizeByPopulationSetter(callback) {
  return (value) => {
    callback(value ? NORMALIZE_PREFER_ENABLED : NORMALIZE_PREFER_DISABLED);
  };
}

function getNormalizeByPopulation(preferNormalizeByPopulation, comparisonIndicator) {
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

function normalizeValuesByNormalizer(values, normalizerId) {
  return values.map((valueObject) =>
    Object.assign({}, valueObject, {
      value: getNormalizedValue(valueObject, normalizerId),
    })
  );
}

type IndicatorVisualisationProps = {
  indicatorId: string;
  indicatorLink?: string;
  useLegacyGraph?: boolean;
  showReference?: boolean;
};

function IndicatorVisualisation({
  indicatorId,
  indicatorLink,
  useLegacyGraph = true,
  showReference = false,
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
  const [compareTo, setCompareTo] = useState(undefined);
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

  if (loading) return <ContentLoader />;
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
    if (!!comparisonIndicator) {
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

  /// Handle object type indicator name (?)
  let plotTitle = '';
  if (typeof indicator.name === 'object') {
    plotTitle = indicator.name.text;
  } else if (typeof indicator.name === 'string') {
    plotTitle = indicator.name;
  }

  let combinedValues = combineValues(indicator, comparisonIndicator, indicatorGraphSpecification);
  if (normalizeByPopulation) {
    combinedValues = normalizeValuesByNormalizer(
      combinedValues,
      populationNormalizer.normalizer.id
    );
  }
  /// Process data for data traces
  const cube = generateCubeFromValues(indicator, indicatorGraphSpecification, combinedValues);

  indicatorGraphSpecification.cube = cube;
  const hasTimeDimension =
    indicatorGraphSpecification.axes.filter((a) => a[0] === 'time').length > 0;
  const showTotalLine = indicator.showTotalLine;
  const traces = getTraces(
    indicatorGraphSpecification.dimensions,
    cube,
    null,
    hasTimeDimension,
    i18n
  ).filter((t) => t.dataType !== 'total' || showTotalLine);

  const [goalTraces, goalBounds] = normalizeByPopulation
    ? [[], []]
    : generateGoalTraces(indicator, scenarios, i18n);
  const [trendTrace, trendBounds] =
    normalizeByPopulation ||
    !hasTimeDimension ||
    !indicator.showTrendline ||
    !indicator.showTotalLine
      ? [null, null]
      : generateTrendTrace(indicator, traces, goalTraces, i18n);

  // Include trend and goal bounds in the calculation
  let bounds = indicatorGraphSpecification.bounds;
  for (const addBounds of [goalBounds, trendBounds]) {
    if (addBounds) {
      bounds = calculateBounds([
        ...Object.values(bounds),
        ...Object.values(addBounds).filter((b) => b != null && !isNaN(b)),
      ]);
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
      <div aria-hidden="true">
        {useLegacyGraph ? (
          <LegacyIndicatorGraph
            specification={indicatorGraphSpecification}
            yRange={yRange}
            timeResolution={indicator.timeResolution}
            traces={traces}
            goalTraces={goalTraces}
            trendTrace={trendTrace}
            title={plotTitle}
          />
        ) : (
          // TODO: Show title depending on context
          <IndicatorGraph
            specification={indicatorGraphSpecification}
            yRange={yRange}
            timeResolution={indicator.timeResolution}
            traces={traces}
            goalTraces={goalTraces}
            trendTrace={trendTrace}
            title={null}
            desiredTrend={indicator.desiredTrend}
            referenceValue={indicator.referenceValue}
            nonQuantifiedGoal={{
              trend: indicator.nonQuantifiedGoal,
              date: indicator.nonQuantifiedGoalDate,
            }}
          />
        )}
      </div>
      <GraphAsTable
        specification={yRange}
        timeResolution={indicator.timeResolution}
        data={traces}
        goalTraces={goalTraces}
        title={plotTitle}
        language={i18n.language}
      />
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
