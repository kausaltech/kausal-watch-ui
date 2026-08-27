'use client';

import { type ReactElement, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client/react';
import { useLocale, useTranslations } from 'next-intl';
import { Alert } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import type {
  IndicatorDetailsQuery,
  IndicatorGraphDataQuery,
  IndicatorGraphDataQueryVariables,
} from '@/common/__generated__/graphql';
import GraphAsTable from '@/components/graphs/GraphAsTable';
import IndicatorGraph from '@/components/graphs/IndicatorGraph';
import IndicatorComparisonSelect from '@/components/indicators/IndicatorComparisonSelect';
import IndicatorNormalizationSelect from '@/components/indicators/IndicatorNormalizationSelect';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/queries/get-indicator-graph-data';

import RichText from '../common/RichText';
import FactorCharts from './FactorCharts';
import IndicatorVisualizationBlock from './IndicatorVisualizationBlock';
import {
  NORMALIZE_DEFAULT,
  calculateBounds,
  combineValues,
  generateCubeFromValues,
  generateGoalTraces,
  generateTrendTrace,
  getIndicatorGraphSpecification,
  getNormalizeByPopulation,
  getTraces,
  normalizeByPopulationSetter,
  normalizeValuesByNormalizer,
  padAndRoundBounds,
} from './indicator-data-helpers';

type IndicatorDetailsIndicator = NonNullable<IndicatorDetailsQuery['indicator']>;
type DefaultVisualization = IndicatorDetailsIndicator['defaultVisualization'];

export type IndicatorVisualisationProps = {
  indicatorId: string;
  indicatorLink?: string;
  showReference?: boolean;
  showGraph?: boolean;
  showTable?: boolean;
  showFactorValues?: boolean;
  defaultVisualization?: DefaultVisualization;
};

/**
 * The embed page sizes its iframe to the loading placeholder first and
 * re-measures on `indicator_graph_ready`. IndicatorGraph dispatches that
 * event itself, but the configured visualization blocks don't — without it,
 * embeds stay clipped at the placeholder height. Rendered as the last
 * sibling of the block so its mount effect runs after the block subtree's
 * effects (including chart initialization).
 */
function VisualizationReadySignal() {
  useEffect(() => {
    document.dispatchEvent(new Event('indicator_graph_ready'));
  }, []);
  return null;
}

function IndicatorVisualisation({
  indicatorId,
  indicatorLink,
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
  const allTraces = getTraces(
    indicatorGraphSpecification.dimensions,
    cube,
    null,
    hasTimeDimension,
    i18n,
    undefined
  );
  // If all traces are "total" (no dimensions), keep them regardless of showTotalLine.
  // Otherwise, filter out the total when showTotalLine is false.
  const hasOnlyTotalTraces = allTraces.every((trace) => trace.dataType === 'total');
  const traces = hasOnlyTotalTraces
    ? allTraces
    : allTraces.filter((t) => t.dataType !== 'total' || showTotalLine);

  // Goal and trend overlays derive solely from the primary indicator, so in
  // comparison mode they would show over both organizations' series without
  // attribution — suppress them like the legacy renderer did. Suppressing at
  // the source also keeps them out of the table and the y-axis bounds.
  const suppressOverlays = normalizeByPopulation || compareTo != null;

  const [goalTraces, goalBounds] = suppressOverlays
    ? [[], []]
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

  const [rawTrendTrace, trendBounds] =
    suppressOverlays || !hasTimeDimension || !indicator.showTrendline || !indicator.showTotalLine
      ? [null, null]
      : generateTrendTrace(indicator, traces, goalTraces, i18n);
  const trendTrace = rawTrendTrace ?? null;

  // Include trend and goal bounds in the calculation
  let bounds = indicatorGraphSpecification.bounds;
  for (const addBounds of [goalBounds, trendBounds]) {
    if (addBounds) {
      // The input always contains the current bounds, so the result is non-null
      bounds = calculateBounds([
        ...Object.values(bounds),
        ...Object.values(addBounds).filter((b) => b != null && !isNaN(b)),
      ])!;
    }
  }

  // Pad and snap only derived bounds; an explicit minValue/maxValue is used
  // exactly as provided. With a single explicit bound the other side is
  // still derived — without snapping it, the axis boundary tick would show
  // the raw data/trend extreme (e.g. "22,567.568").
  if (indicator.minValue == null || indicator.maxValue == null) {
    const padded = padAndRoundBounds(
      {
        min: indicator.minValue ?? bounds.min,
        max: indicator.maxValue ?? bounds.max,
      },
      indicator.ticksCount ?? 5
    );
    bounds = {
      min: indicator.minValue ?? padded.min,
      max: indicator.maxValue ?? padded.max,
    };
  }
  indicatorGraphSpecification.bounds = bounds;

  const yRange = {
    unit: unitLabel,
    minDigits: 0,
    maxDigits: 0,
    ticksCount: indicator.ticksCount ?? undefined,
    ticksRounding: indicator.ticksRounding ?? undefined,
    valueRounding: indicator.valueRounding ?? undefined,
    range: [] as number[],
  };

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

  // Callers that fetch the indicator's default visualization themselves can
  // pass it as a prop; otherwise fall back to the one from this component's
  // own graph-data query, so callers that only know the indicator id (e.g.
  // IndicatorBlock) still honor the configured default visualization.
  const effectiveDefaultVisualization = defaultVisualization ?? indicator.defaultVisualization;

  let graphComponent: ReactElement;
  if (effectiveDefaultVisualization && !compareTo && !normalizeByPopulation) {
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
        <IndicatorVisualizationBlock block={effectiveDefaultVisualization} />
        <VisualizationReadySignal />
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
          trendTrace={trendTrace}
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
