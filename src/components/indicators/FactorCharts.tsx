'use client';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import type { IndicatorGraphDataQuery } from '@/common/__generated__/graphql';
import { IndicatorTimeResolution } from '@/common/__generated__/graphql';
import { capitalizeFirstLetter } from '@/common/utils';
import GraphAsTable from '@/components/graphs/GraphAsTable';
import IndicatorGraph from '@/components/graphs/IndicatorGraph';

import { calculateBounds, padAndRoundBounds } from './indicator-data-helpers';

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
          const paddedBounds = padAndRoundBounds(factorBounds, 2);
          const factorYRange = {
            unit: metric.unit,
            minDigits: 0,
            maxDigits: 0,
            ticksCount: 2,
            ticksRounding: undefined,
            valueRounding: valueRounding ?? undefined,
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
                    timeResolution={timeResolution as 'YEAR' | 'MONTH'}
                    traces={[factorTrace]}
                    goalTraces={[]}
                    trendTrace={null}
                    title={null}
                    downloadFilename={metric.label}
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

export default FactorCharts;
