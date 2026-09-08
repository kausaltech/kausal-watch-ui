'use client';

import { type ReactElement, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { Alert } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';
import type { IndicatorTimeResolution } from '@/common/__generated__/graphql';
import GraphAsTable from '@/components/graphs/GraphAsTable';
import IndicatorGraph from '@/components/graphs/IndicatorGraph';
import IndicatorComparisonSelect from '@/components/indicators/IndicatorComparisonSelect';
import IndicatorNormalizationSelect from '@/components/indicators/IndicatorNormalizationSelect';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_GRAPH_DATA } from '@/queries/get-indicator-graph-data';

import RichText from '../common/RichText';
import FactorCharts from './FactorCharts';
import IndicatorVisualizationBlock from './IndicatorVisualizationBlock';
import { NORMALIZE_DEFAULT, normalizeByPopulationSetter } from './indicator-data-helpers';
import { deriveIndicatorGraphModel } from './indicator-graph-model';

type IndicatorDetailsIndicator = NonNullable<IndicatorDetailsQuery['indicator']>;
type DefaultVisualization = IndicatorDetailsIndicator['defaultVisualization'];

export type IndicatorVisualisationProps = {
  indicatorId: string;
  indicatorLink?: string;
  /** Render the indicator name as a heading — for callers that don't
   *  provide a heading of their own (e.g. RelatedIndicatorsBlock). */
  showTitle?: boolean;
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
  showTitle = false,
  showReference = false,
  showGraph = true,
  showTable = true,
  showFactorValues = false,
  defaultVisualization,
}: IndicatorVisualisationProps) {
  const plan = usePlan();
  const enableIndicatorComparison = plan.features.enableIndicatorComparison === true;
  const t = useTranslations();
  const [compareTo, setCompareTo] = useState<string | undefined>(undefined);
  const [preferNormalizeByPopulation, setPreferNormalizeByPopulation] = useState(NORMALIZE_DEFAULT);

  const { loading, error, data } = useQuery(GET_INDICATOR_GRAPH_DATA, {
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

  // The generated enum's values are exactly the literal strings the chart
  // layer's TimeResolution uses
  const timeResolution = indicator.timeResolution as `${IndicatorTimeResolution}`;

  const {
    comparisonOrgs,
    canBeNormalized,
    normalizeByPopulation,
    unitLabel,
    specification,
    traces,
    goalTraces,
    trendTrace,
    yRange,
    mainXAxisRange,
    referenceValue,
  } = deriveIndicatorGraphModel({
    indicator,
    scenarios,
    compareTo,
    preferNormalizeByPopulation,
    t,
  });
  const setNormalizeByPopulation = normalizeByPopulationSetter(setPreferNormalizeByPopulation);

  const plotTitle = indicator.name;

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
    // The data table below is an accessible alternative for chart canvases
    // only; a summary block is meaningful text (description, latest value,
    // goal) with no table equivalent, so it must stay visible to AT.
    const isSummaryBlock = effectiveDefaultVisualization.__typename === 'IndicatorDefaultSummary';
    graphComponent = (
      <div aria-hidden={showTable && !isSummaryBlock}>
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
          specification={specification}
          yRange={yRange}
          timeResolution={timeResolution}
          traces={traces}
          goalTraces={goalTraces}
          trendTrace={trendTrace}
          title={null}
          downloadFilename={plotTitle}
          desiredTrend={indicator.desiredTrend}
          referenceValue={referenceValue}
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
      {indicatorLink ? (
        <a href={indicatorLink} target="_blank" rel="noreferrer">
          <h2>{plotTitle}</h2>
        </a>
      ) : (
        showTitle && <h2>{plotTitle}</h2>
      )}
      {enableIndicatorComparison && comparisonOrgs.length > 0 && (
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
