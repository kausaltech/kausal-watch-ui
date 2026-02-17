import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { useReactiveVar } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import chroma from 'chroma-js';
import { isEqual } from 'lodash';
import { useFormatter, useTranslations } from 'next-intl';

import type { DimensionalNodeMetricFragment } from '@/common/__generated__/paths/graphql';
import { activeGoalVar } from '@/context/paths/cache';
//import type { InstanceGoal } from 'common/instance';
import { DimensionalMetric, type SliceConfig } from '@/utils/paths/metric';

const PlotsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Subplot = styled.div`
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.tertiary};
`;

const Plot = dynamic(() => import('@/components/graphs/Plot'), { ssr: false });

type DimensionalPieGraphProps = {
  metric: NonNullable<DimensionalNodeMetricFragment['metricDim']>;
  endYear: number;
  color?: string | null;
  colorChange?: number;
};

const DimensionalPieGraph = ({
  metric,
  endYear,
  colorChange: colorChangeProp = 0,
}: DimensionalPieGraphProps) => {
  const t = useTranslations();
  const format = useFormatter();
  const theme = useTheme();
  const activeGoal = useReactiveVar(activeGoalVar);
  const cube = useMemo(() => new DimensionalMetric(metric), [metric]);
  const isForecast = cube.isForecastYear(endYear);
  const defaultConfig = cube.getDefaultSliceConfig(activeGoal);
  const [sliceConfig, setSliceConfig] = useState<SliceConfig>(defaultConfig);

  // TODO: Handle this color change more elegantly.
  // Currently isForecast and set colorChange will not be true at the same time
  const colorChange = isForecast ? 1 : colorChangeProp;

  useEffect(() => {
    /**
     * If the active goal changes, we will reset the grouping + filtering
     * to be compatible with the new choices (if the new goal has common
     * dimensions with our metric).
     */
    if (!activeGoal) return;
    const newDefault = cube.getDefaultSliceConfig(activeGoal);
    if (!newDefault || isEqual(sliceConfig, newDefault)) return;
    setSliceConfig(newDefault);
  }, [activeGoal, cube]);

  const yearData = cube.getSingleYear(endYear, sliceConfig.categories);

  let longUnit = metric.unit.htmlShort;
  // FIXME: Nasty hack to show 'CO2e' where it might be applicable until
  // the backend gets proper support for unit specifiers.
  if (cube.hasDimension('emission_scope') && !cube.hasDimension('greenhouse_gases')) {
    if (metric.unit.short === 't/Einw./a') {
      longUnit = t.raw('tco2-e-inhabitant');
    } else if (metric.unit.short === 'kt/a') {
      longUnit = t.raw('ktco2-e');
    }
  }

  const plotData: {
    data: Partial<Plotly.PlotData>;
    layout: Partial<Plotly.Layout>;
    total: 0 | number;
  }[] = [];
  const defaultLayout: Partial<Plotly.Layout> = {
    width: 300,
    modebar: {
      remove: [
        'zoom2d',
        'zoomIn2d',
        'zoomOut2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'autoScale2d',
        'resetScale2d',
      ],
      color: theme.graphColors.grey090,
      bgcolor: theme.graphColors.grey010,
      activecolor: theme.brandDark,
    },
    dragmode: false,
    showlegend: true,
    legend: {
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
      orientation: 'h',
      itemclick: false,
      itemdoubleclick: false,
    },
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4,
    },
    autosize: false,
  };

  let maxTotal = 0;

  // Pie per scope
  yearData.categoryTypes[1].options.forEach((colId, cIdx) => {
    const colTotals = yearData.rows.reduce((acc, row) => {
      return row[cIdx] ? row[cIdx] + acc : acc;
    }, 0);
    // Remember the largest total for scaling the pies
    if (Math.abs(colTotals) > maxTotal) {
      maxTotal = Math.abs(colTotals);
    }
    // Pie segment per sector
    const pieSegmentLabels: string[] = [];
    const pieSegmentValues: (number | null)[] = [];
    const pieSegmentColors: string[] = [];
    const pieSegmentHovers: string[] = [];
    yearData.categoryTypes[0].options.forEach((rowId, rIdx) => {
      const datum = yearData.rows[rIdx][cIdx];
      /*
      const displayPortions =
        portion >= 0.01 ? Math.round((datum / colTotals) * 100) : '<1';
      const textTemplate =
        portion && portion !== 1 && portion !== 0 ? '%{meta[0]}%' : '';
      const dimDetails = yearData.allLabels.find((l) => l.id === rowId);
      */
      if (datum != 0) {
        pieSegmentLabels.push(`${yearData.allLabels.find((l) => l.id === rowId)?.label}` || '');
        pieSegmentValues.push(datum ? Math.abs(datum) : null);
        const segmentColor = yearData.allLabels.find((l) => l.id === rowId)?.color || '#333';
        pieSegmentColors.push(chroma(segmentColor).brighten(colorChange).hex());
        pieSegmentHovers.push(
          `${yearData.allLabels.find((l) => l.id === rowId)?.label}, ${
            datum && format.number(Math.abs(datum), { maximumSignificantDigits: 2 })
          } ${datum && metric.unit.htmlShort}` || ''
        );
      }
    });

    // Calculate total and percentages
    const total =
      pieSegmentValues.reduce((sum, value) => {
        const numSum = sum === null ? 0 : sum;
        const numValue = value === null ? 0 : value;
        return numSum + numValue;
      }, 0) || 0;
    const percentages = pieSegmentValues.map((value) =>
      value ? format.number((value / total) * 100, { maximumSignificantDigits: 2 }) : null
    );

    // Create new labels with percentages
    const newLabels = pieSegmentLabels.map((label, index) => `${label}, ${percentages[index]}%`);

    plotData.push({
      total: total,
      layout: {
        ...defaultLayout,
        annotations: [
          {
            font: {
              size: 18,
              color: theme.graphColors.grey050,
            },
            showarrow: false,
            text: `<b>${format.number(total, {
              maximumSignificantDigits: 2,
            })}</b>`,
            x: 0.5,
            y: 0.5,
          },
        ],
      },
      data: {
        type: 'pie',
        hole: 0.5,
        labels: newLabels,
        values: pieSegmentValues,
        hovertext: pieSegmentHovers,
        textinfo: 'none',
        hoverinfo: 'text',
        marker: {
          colors: pieSegmentColors,
        },
        name: yearData.allLabels.find((l) => l.id === colId)?.label || '',
      },
    });
  });

  plotData.forEach((plot) => {
    const scaleTotal = plot.total / maxTotal;
    const scalePie = 0.95 * scaleTotal; // Use this to scale multiple pies relative to each other
    plot.data.domain = {
      x: [0.5 - scalePie, 0.5 + scalePie],
      y: [0.5 - scalePie, 0.5 + scalePie],
    };
  });

  const plotConfig = {
    displaylogo: false,
    responsive: true,
  };

  return (
    <>
      <PlotsContainer className="mt-3">
        {plotData.map(
          (plot) =>
            plot.total !== 0 && (
              <Subplot key={plot.data.name}>
                <h5>
                  {plot.data.name} {endYear}
                </h5>
                <span dangerouslySetInnerHTML={{ __html: longUnit }} />
                <Plot
                  data={[plot.data]}
                  layout={plot.layout}
                  useResizeHandler
                  config={plotConfig}
                  style={{ minWidth: '300px', maxWidth: '600px' }}
                  noValidate
                />
              </Subplot>
            )
        )}
      </PlotsContainer>
    </>
  );
};

export default DimensionalPieGraph;
