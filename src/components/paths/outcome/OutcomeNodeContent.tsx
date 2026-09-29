import { memo, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { useReactiveVar } from '@apollo/client/react';
import { useTranslations } from 'next-intl';

import { activeGoalVar } from '@common/apollo/paths-cache';
import DimensionalNodeVisualisation from '@common/components/paths/DimensionalNodeVisualisation';
import DimensionalPieGraph from '@common/components/paths/DimensionalPieGraph';
import { getMetricChange, getMetricValue } from '@common/utils/paths/metric';

import type { OutcomeNodeFieldsFragment } from '@/common/__generated__/paths/graphql';
import { PathsNodeLink } from '@/common/links';
import useNumberFormatter from '@/common/numbers';
import HighlightValue from '@/components/paths/HighlightValue';
import ScenarioBadge from '@/components/paths/ScenarioBadge';
import DataTable from '@/components/paths/graphs/DataTable';
import NodeViewSelector, { type NodeView } from '@/components/paths/outcome/NodeViewSelector';
import OutcomeNodeDetails from '@/components/paths/outcome/OutcomeNodeDetails';
import { usePaths } from '@/context/paths/paths';

const ContentWrapper = styled.div`
  min-height: 300px;
  max-height: 1000px;
  overflow-y: auto;
  padding: 1rem;
  background-color: white;
  color: ${(props) => props.theme.themeColors.black};
  border-radius: 0;
  border: 1px solid ${(props) => props.theme.graphColors.grey010};
  border-top: 0;
  &:focus {
    outline: 2px solid ${(props) => props.theme.graphColors.grey010};
  }
  .x2sstick text,
  .xtick text {
    text-anchor: end !important;
  }
`;

const CardContent = styled.div`
  //background-color: white;
  //padding: 0.5rem;

  .nav-pills {
    //margin-bottom: 0.5rem;
  }

  .nav-pills .nav-link {
    padding: 0.2rem 0.5rem;
    margin-right: 0.5rem;
  }

  .nav-pills .nav-link.active {
    background-color: ${(props) => props.theme.graphColors.grey050};
  }
`;

const ViewSelectorBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CardSetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 0.5rem;

  a {
    color: ${(props) => props.theme.themeColors.dark};
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    flex-direction: row;
  }
`;

const CardSetDescription = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces.s100};
  h4 {
    margin-bottom: ${({ theme }) => theme.spaces.s050};
  }
`;

const CardSetDescriptionDetails = styled.div`
  font-size: 0.9rem;
  line-height: 1.2;
  color: ${(props) => props.theme.graphColors.grey050};
`;

const CardSetSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  .figure {
    margin-left: 1rem;
  }
`;

const GraphDisclaimer = styled.div`
  max-width: 700px;
  text-align: right;
  margin: ${({ theme }) => `${theme.spaces.s050} ${theme.spaces.s100} 0 auto`};
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.textColor.tertiary};
`;

type OutcomeNodeContentProps = {
  node: OutcomeNodeFieldsFragment;
  subNodes: OutcomeNodeFieldsFragment[];
  color?: string | null;
  colorAdjust?: number;
  startYear: number;
  endYear: number;
  activeScenario: string;
  refetching: boolean;
  separateYears: number[] | null;
  chartType?: 'area' | 'line' | 'bar';
};

function OutcomeNodeContent({
  node,
  subNodes,
  color,
  colorAdjust,
  startYear,
  endYear,
  activeScenario,
  refetching,
  chartType = 'bar',
  separateYears,
}: OutcomeNodeContentProps) {
  const t = useTranslations();
  const formatNumber = useNumberFormatter({ scope: 'paths' });
  const [activeTabId, setActiveTabId] = useState<NodeView>('graph');
  const paths = usePaths();

  const activeGoal = useReactiveVar(activeGoalVar);
  // We have a disclaimer for the mobility node for 2023 (hack)
  const hideForecast = separateYears && separateYears.length > 1;

  const instance = paths?.instance;
  const nodeName = node.shortName || node.name;
  const pathsDisclaimers = instance?.outcomeDisclaimers;
  const disclaimer = pathsDisclaimers?.find(
    (disclaimer) => disclaimer.node === node.id && disclaimer.goal === activeGoal?.id
  )?.disclaimer;

  const outcomeGraph = useMemo(() => {
    if (!node.metricDim) {
      return (
        <h5>
          {t('time-series')}, {t('coming-soon')}
        </h5>
      );
    }
    if (!instance) return null;

    return (
      <DimensionalNodeVisualisation
        title={undefined}
        metric={node.metricDim}
        startYear={startYear}
        endYear={endYear}
        color={color}
        colorAdjust={colorAdjust}
        withControls={false}
        withTools={false}
        baselineForecast={node.metric?.baselineForecastValues ?? undefined}
        instance={{
          referenceYear: instance.referenceYear,
          minimumHistoricalYear: instance.minimumHistoricalYear,
          features: instance.features,
        }}
        site={null}
        t={t}
        chartType={chartType}
        separateYears={separateYears}
      />
    );
  }, [node, color, startYear, endYear, instance, nodeName, t]);

  const singleYearGraph = useMemo(() => {
    if (!instance) return null;

    return (
      <div>
        <DimensionalPieGraph
          metric={node.metricDim!}
          endYear={separateYears ? separateYears[separateYears.length - 1] : endYear}
          colorChange={colorAdjust}
          instance={{ features: instance.features }}
          t={t}
        />
      </div>
    );
  }, [node, endYear, separateYears, colorAdjust, instance, t]);

  if (!instance) return null;

  // Display yearly distribution tab only if the node has scopes dimension
  const showDistribution =
    node.metricDim &&
    node.metricDim.dimensions.find((dim) => dim.id === 'net_emissions:dim:emission_scope') &&
    subNodes.length > 1;
  const nodesTotal = getMetricValue(node, endYear);
  const nodesBase = getMetricValue(node, startYear);
  const lastMeasuredYear =
    node?.metric?.historicalValues[node.metric.historicalValues.length - 1]?.year;
  const firstForecastYear = node?.metric?.forecastValues[0]?.year;
  const isForecast = lastMeasuredYear !== undefined && endYear > lastMeasuredYear;
  const outcomeChange = getMetricChange(nodesBase, nodesTotal);
  const unit = node.metric?.unit?.htmlLong || node.metric?.unit?.htmlShort;
  const showNodeDetails =
    !instance.features?.hideNodeDetails && instance.showOutcomeNodeDetails && node.shortDescription;
  const viewLabels: Record<NodeView, string> = {
    year: t('distribution'),
    graph: t('time-series'),
    table: t('table'),
    info: t('details'),
  };
  return (
    <div role="tabpanel" id={`tabpanel-${node.id}`}>
      <CardSetHeader>
        <div>
          <CardSetDescription>
            <h4>{nodeName}</h4>
            {activeGoal?.label && (
              <CardSetDescriptionDetails>
                <ScenarioBadge>{activeGoal?.label}</ScenarioBadge>
              </CardSetDescriptionDetails>
            )}
            {!hideForecast && (
              <CardSetDescriptionDetails>
                {lastMeasuredYear !== undefined && startYear < lastMeasuredYear && (
                  <ScenarioBadge startYear={startYear} endYear={lastMeasuredYear}>
                    {t('table-historical')}
                  </ScenarioBadge>
                )}{' '}
                {typeof firstForecastYear === 'number' && firstForecastYear < endYear && (
                  <ScenarioBadge
                    startYear={Math.max(startYear, firstForecastYear)}
                    endYear={endYear}
                  >
                    {t('table-scenario-forecast')}
                    {activeScenario && ` (${activeScenario})`}
                  </ScenarioBadge>
                )}
              </CardSetDescriptionDetails>
            )}
          </CardSetDescription>
        </div>
        {!hideForecast && (
          <CardSetSummary>
            {nodesTotal && (
              <HighlightValue
                className="figure"
                displayValue={formatNumber(nodesTotal)}
                header={`${
                  isForecast ? t('table-scenario-forecast') : t('table-historical')
                } ${endYear}`}
                unit={unit || ''}
              />
            )}
            <HighlightValue
              className="figure"
              displayValue={outcomeChange ? `${outcomeChange > 0 ? '+' : ''}${outcomeChange}` : '-'}
              header={`${t('change-over-time')} ${startYear}–${endYear}`}
              unit="%"
            />
          </CardSetSummary>
        )}
      </CardSetHeader>
      <CardContent>
        <ViewSelectorBar>
          <NodeViewSelector
            idPrefix={node.id}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            showDistribution={!!showDistribution}
            disableDistribution={subNodes.length < 2}
            showDetails={!!showNodeDetails}
          />
        </ViewSelectorBar>

        <div
          id={`${node.id}-panel-${activeTabId}`}
          role="tabpanel"
          tabIndex={0}
          aria-label={viewLabels[activeTabId]}
        >
          {activeTabId === 'year' && <ContentWrapper>{singleYearGraph}</ContentWrapper>}
          {activeTabId === 'graph' && (
            <ContentWrapper>
              {outcomeGraph}
              <GraphDisclaimer>{disclaimer}</GraphDisclaimer>
            </ContentWrapper>
          )}
          {activeTabId === 'info' && (
            <ContentWrapper>
              <OutcomeNodeDetails node={node} t={t} />
            </ContentWrapper>
          )}
          {activeTabId === 'table' && node.metricDim && (
            <ContentWrapper tabIndex={0}>
              <DataTable
                metric={node.metricDim as Parameters<typeof DataTable>[0]['metric']}
                goalName={activeGoal?.label ?? undefined}
                separateYears={separateYears}
                startYear={startYear}
                endYear={endYear}
                disclaimer={disclaimer}
              />
            </ContentWrapper>
          )}
        </div>
      </CardContent>
    </div>
  );
}

export default memo(OutcomeNodeContent);
