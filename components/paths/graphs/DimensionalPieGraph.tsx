import { useEffect, useMemo, useState } from 'react';

import type { DimensionalNodeMetricFragment } from 'common/__generated__/paths/graphql';
import { isEqual } from 'lodash';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import darken from 'polished/lib/color/darken';
import styled, { useTheme } from 'styled-components';

import { activeGoalVar } from '@/context/paths/cache';
//import type { InstanceGoal } from 'common/instance';
import { DimensionalMetric, type SliceConfig } from '@/utils/paths/metric';
import { useReactiveVar } from '@apollo/client';

const PlotsContainer = styled.div`
  display: flex;
`;

const Subplot = styled.div`
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.tertiary};
`;

const Plot = dynamic(() => import('components/graphs/Plot'), { ssr: false });

function getDefaultSliceConfig(
  cube: DimensionalMetric,
  activeGoal: InstanceGoal | null
) {
  /**
   * By default, we group by the first dimension `metric` has, whatever it is.
   * @todo Is there a better way to select the default?
   *
   * If the currently selected goal has category selections for this metric,
   * we might choose another dimension.
   *
   * NOTE: This is just the default -- the actually active filtering and
   * grouping is controlled by the `sliceConfig` state below.
   */
  const defaultConfig: SliceConfig = {
    dimensionId: cube.dimensions[0]?.id,
    categories: {},
  };

  if (!activeGoal) return defaultConfig;

  const cubeDefault = cube.getChoicesForGoal(activeGoal);
  if (!cubeDefault) return defaultConfig;
  defaultConfig.categories = cubeDefault;
  /**
   * Check if our default dimension to slice by is affected by the
   * goal-based default filters. If so, we should choose another
   * dimension.
   */
  if (
    defaultConfig.dimensionId &&
    cubeDefault.hasOwnProperty(defaultConfig.dimensionId)
  ) {
    const firstPossible = cube.dimensions.find(
      (dim) => !cubeDefault.hasOwnProperty(dim.id)
    );
    defaultConfig.dimensionId = firstPossible?.id;
  }
  return defaultConfig;
}

type DimensionalPieGraphProps = {
  metric: NonNullable<DimensionalNodeMetricFragment['metricDim']>;
  endYear: number;
  color?: string | null;
};

const DimensionalPieGraph = ({ metric, endYear }: DimensionalPieGraphProps) => {
  const t = useTranslations();
  const theme = useTheme();
  const activeGoal = useReactiveVar(activeGoalVar);
  const cube = useMemo(() => new DimensionalMetric(metric), [metric]);
  const defaultConfig = getDefaultSliceConfig(cube, activeGoal);
  const [sliceConfig, setSliceConfig] = useState<SliceConfig>(defaultConfig);

  useEffect(() => {
    /**
     * If the active goal changes, we will reset the grouping + filtering
     * to be compatible with the new choices (if the new goal has common
     * dimensions with our metric).
     */
    if (!activeGoal) return;
    const newDefault = getDefaultSliceConfig(cube, activeGoal);
    if (!newDefault || isEqual(sliceConfig, newDefault)) return;
    setSliceConfig(newDefault);
  }, [activeGoal, cube]);

  const yearData = cube.getSingleYear(endYear, sliceConfig.categories);

  let longUnit = metric.unit.htmlShort;
  // FIXME: Nasty hack to show 'CO2e' where it might be applicable until
  // the backend gets proper support for unit specifiers.
  if (
    cube.hasDimension('emission_scope') &&
    !cube.hasDimension('greenhouse_gases')
  ) {
    if (metric.unit.short === 't/Einw./a') {
      longUnit = t.raw('tco2-e-inhabitant');
    } else if (metric.unit.short === 'kt/a') {
      longUnit = t.raw('ktco2-e');
    }
  }

  const plotData: Partial<Plotly.PlotData>[] = [];

  let maxTotal = 0;

  // Pie per scope
  yearData.categoryTypes[1].options.forEach((colId, cIdx) => {
    const colTotals = yearData.rows.reduce((acc, row) => {
      return row[cIdx] + acc;
    }, 0);
    // Remember the largest total for scaling the y-axis
    if (Math.abs(colTotals) > maxTotal) {
      maxTotal = Math.abs(colTotals);
    }
    // Pie segment per sector
    const pieSegmentLabels: string[] = [];
    const pieSegmentValues: number[] = [];
    const pieSegmentColors: string[] = [];
    const pieSegmentHovers: string[] = [];
    yearData.categoryTypes[0].options.forEach((rowId, rIdx) => {
      const datum = yearData.rows[rIdx][cIdx];
      const portion = datum / colTotals;
      /*
      const displayPortions =
        portion >= 0.01 ? Math.round((datum / colTotals) * 100) : '<1';
      const textTemplate =
        portion && portion !== 1 && portion !== 0 ? '%{meta[0]}%' : '';
      const dimDetails = yearData.allLabels.find((l) => l.id === rowId);
      */
      if (datum != 0) {
        pieSegmentLabels.push(
          `${yearData.allLabels.find((l) => l.id === rowId)?.label}` || ''
        );
        pieSegmentValues.push(Math.abs(datum));
        pieSegmentColors.push(
          yearData.allLabels.find((l) => l.id === rowId)?.color || '#333'
        );
        pieSegmentHovers.push(
          `${yearData.allLabels.find((l) => l.id === rowId)?.label}, ${Math.abs(
            datum
          )} ${metric.unit.htmlShort}` || ''
        );
      }
    });
    const scalePie = 0.75; // Use this to scale multiple pies relative to each other
    plotData.push({
      type: 'pie',
      hole: 0.5,
      labels: pieSegmentLabels,
      values: pieSegmentValues,
      hovertext: pieSegmentHovers,
      textinfo: 'none',
      hoverinfo: 'text',
      marker: {
        colors: pieSegmentColors,
        pattern: {
          shape: '/',
          bgcolor: pieSegmentColors,
          fgcolor: pieSegmentColors.map((color) => darken(0.2, color)),
          size: 4,
        },
      },
      domain: {
        x: [0.5 - scalePie, 0.5 + scalePie],
        y: [0.5 - scalePie, 0.5 + scalePie],
      },
      name: yearData.allLabels.find((l) => l.id === colId)?.label || '',
    });
  });

  // Calculate total and percentages
  const total = plotData[0].values.reduce((sum, value) => sum + value, 0);
  const percentages = plotData[0].values.map((value) =>
    ((value / total) * 100).toFixed(1)
  );

  // Create new labels with percentages
  const newLabels = plotData[0].labels.map(
    (label, index) => `${label}, ${percentages[index]}%`
  );

  // Update the data with new labels
  plotData[0].labels = newLabels;

  const range = [0, maxTotal * 1.25];

  const layout: Partial<Plotly.Layout> = {
    width: 400,
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
      x: 1,
      y: 0.5,
      xanchor: 'left',
      yanchor: 'middle',
      orientation: 'vertical',
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
    annotations: [
      {
        font: {
          size: 18,
        },
        showarrow: false,
        text: `<b>${total.toFixed(1).toString()}</b>`,
        x: 0.5,
        y: 0.5,
      },
    ],
  };

  const plotConfig = {
    displaylogo: false,
    responsive: true,
  };

  return (
    <>
      <PlotsContainer className="mt-3">
        {plotData.map((plot) => (
          <Subplot key={plot.name}>
            <h5>
              {plot.name} {endYear}
            </h5>
            <span dangerouslySetInnerHTML={{ __html: longUnit }} />
            <Plot
              data={[plot]}
              layout={layout}
              useResizeHandler
              config={plotConfig}
              style={{ minWidth: '300px', maxWidth: '600px' }}
              noValidate
            />
          </Subplot>
        ))}
      </PlotsContainer>
    </>
  );
};

export default DimensionalPieGraph;
