/**
 * Derives everything IndicatorVisualisation renders from the graph-data query
 * result and the user's comparison/normalization choices. Pure, so the whole
 * pipeline is testable without React.
 */
import type { IndicatorGraphDataQuery } from '@/common/__generated__/graphql';
import type { YRange } from '@/components/graphs/indicator-graph.utils';

import {
  type I18n,
  canNormalizeValues,
  combineValues,
  formatUnitLabel,
  generateCubeFromValues,
  generateGoalTraces,
  generateTrendTrace,
  getIndicatorGraphSpecification,
  getNormalizeByPopulation,
  getTraceTimeRange,
  getTraces,
  normalizeValuesByNormalizer,
  resolveYAxisRange,
} from './indicator-data-helpers';

export type GraphDataIndicator = NonNullable<IndicatorGraphDataQuery['indicator']>;
export type GraphDataScenarios = NonNullable<IndicatorGraphDataQuery['plan']>['scenarios'];

export type IndicatorGraphModelInput = {
  indicator: GraphDataIndicator;
  scenarios: GraphDataScenarios;
  /** Organization selected for comparison, if any */
  compareTo: string | undefined;
  /** The user's normalization preference (one of the NORMALIZE_* constants) */
  preferNormalizeByPopulation: string;
  t: I18n['t'];
};

export function deriveIndicatorGraphModel({
  indicator,
  scenarios,
  compareTo,
  preferNormalizeByPopulation,
  t,
}: IndicatorGraphModelInput) {
  const i18n: I18n = { t };

  const comparisonIndicator = indicator.common?.indicators.find(
    (candidate) => candidate.organization.id === compareTo
  );
  const comparisonOrgs =
    indicator.common?.indicators
      .map((common) => common.organization)
      .filter((org) => org.id !== indicator.organization.id) ?? [];

  const populationNormalizer = indicator.common?.normalizations.find(
    (normalization) => normalization.normalizer.identifier === 'population'
  );
  const shownValues = comparisonIndicator
    ? indicator.values.concat(comparisonIndicator.values)
    : indicator.values;
  const canBeNormalized =
    populationNormalizer != null &&
    canNormalizeValues(shownValues, populationNormalizer.normalizer.id);
  // The normalizer in effect: only when normalization is possible and chosen
  const activeNormalizer =
    populationNormalizer != null &&
    canBeNormalized &&
    getNormalizeByPopulation(preferNormalizeByPopulation, comparisonIndicator)
      ? populationNormalizer
      : null;
  const normalizeByPopulation = activeNormalizer != null;

  const specification = getIndicatorGraphSpecification(
    indicator,
    compareTo,
    t,
    activeNormalizer?.normalizer.id ?? null
  );
  const { hasTimeDimension } = specification;

  let combinedValues = combineValues(indicator, comparisonIndicator, specification);
  if (activeNormalizer) {
    combinedValues = normalizeValuesByNormalizer(combinedValues, activeNormalizer.normalizer.id);
  }
  const cube = generateCubeFromValues(indicator, specification, combinedValues);
  const allTraces = getTraces(specification.dimensions, cube, null, hasTimeDimension, i18n);
  // If all traces are "total" (no dimensions), keep them regardless of
  // showTotalLine. Otherwise, filter out the total when showTotalLine is false.
  const hasOnlyTotalTraces = allTraces.every((trace) => trace.dataType === 'total');
  const traces = hasOnlyTotalTraces
    ? allTraces
    : allTraces.filter((trace) => trace.dataType !== 'total' || indicator.showTotalLine);

  // Goal and trend overlays derive solely from the primary indicator, so in
  // comparison mode they would show over both organizations' series without
  // attribution — suppress them like the legacy renderer did. Suppressing at
  // the source also keeps them out of the table and the y-axis bounds.
  const suppressOverlays = normalizeByPopulation || compareTo != null;
  const [goalTraces, goalBounds] = suppressOverlays
    ? [[], null]
    : generateGoalTraces(indicator, scenarios, i18n);
  const [trendTrace, trendBounds] =
    suppressOverlays || !hasTimeDimension || !indicator.showTrendline || !indicator.showTotalLine
      ? [null, null]
      : generateTrendTrace(indicator, traces, goalTraces, i18n);

  const unitLabel = formatUnitLabel((activeNormalizer ?? indicator).unit);
  const yRange: YRange = {
    unit: unitLabel,
    ticksCount: indicator.ticksCount ?? undefined,
    ticksRounding: indicator.ticksRounding ?? undefined,
    valueRounding: indicator.valueRounding ?? undefined,
    // Always set explicitly so ECharts doesn't auto-range (and pull in zero)
    range: resolveYAxisRange(indicator, specification.dataBounds, [goalBounds, trendBounds]),
  };

  // Reference markers must use the same units as the traces: with population
  // normalization active, substitute the reference value's matching per-capita
  // entry, and suppress the marker entirely when none exists — the raw value
  // would land outside (or misplaced within) the per-capita axis.
  const referenceValue = (() => {
    const ref = indicator.referenceValue;
    if (!ref || ref.value == null) return null;
    if (!activeNormalizer) {
      return { date: ref.date, value: ref.value };
    }
    const normalized = ref.normalizedValues?.find(
      (nv) => nv?.normalizerId === activeNormalizer.normalizer.id
    );
    return normalized?.value != null ? { date: ref.date, value: normalized.value } : null;
  })();

  return {
    comparisonOrgs,
    canBeNormalized,
    normalizeByPopulation,
    unitLabel,
    specification,
    hasTimeDimension,
    traces,
    goalTraces,
    trendTrace: trendTrace ?? null,
    yRange,
    // The factor charts share the main chart's x-axis range so charts stacked
    // on top of each other stay aligned; a category axis has no such range
    mainXAxisRange: hasTimeDimension ? getTraceTimeRange(traces) : undefined,
    referenceValue,
  };
}

export type IndicatorGraphModel = ReturnType<typeof deriveIndicatorGraphModel>;
