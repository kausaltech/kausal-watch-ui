import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { useReactiveVar } from '@apollo/client';
import { useTheme } from '@emotion/react';
import { isEqual } from 'lodash';
import { useTranslations } from 'next-intl';

import type { DimensionalNodeMetricFragment } from '@/common/__generated__/paths/graphql';
import { activeGoalVar } from '@/context/paths/cache';
//import type { InstanceGoal } from 'common/instance';
import { DimensionalMetric, type SliceConfig } from '@/utils/paths/metric';

const Plot = dynamic(() => import('@/components/graphs/Plot'), { ssr: false });

function getDefaultSliceConfig(cube: DimensionalMetric, activeGoal: InstanceGoal | null) {
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
  if (defaultConfig.dimensionId && cubeDefault.hasOwnProperty(defaultConfig.dimensionId)) {
    const firstPossible = cube.dimensions.find((dim) => !cubeDefault.hasOwnProperty(dim.id));
    defaultConfig.dimensionId = firstPossible?.id;
  }
  return defaultConfig;
}

type DimensionalBarGraphProps = {
  metric: NonNullable<DimensionalNodeMetricFragment['metricDim']>;
  endYear: number;
  color?: string | null;
};

const DimensionalBarGraph = ({ metric, endYear }: DimensionalBarGraphProps) => {
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

  const plotData: Partial<Plotly.PlotData>[] = [];

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

  let maxTotal = 0;
  yearData.categoryTypes[1].options.forEach((colId, cIdx) => {
    const colTotals = yearData.rows.reduce((acc, row) => {
      return row[cIdx] + acc;
    }, 0);
    // Remember the largest total for scaling the y-axis
    if (Math.abs(colTotals) > maxTotal) {
      maxTotal = Math.abs(colTotals);
    }
    yearData.categoryTypes[0].options.forEach((rowId, rIdx) => {
      const datum = yearData.rows[rIdx][cIdx];
      const portion = datum / colTotals;
      const displayPortions = portion >= 0.01 ? Math.round((datum / colTotals) * 100) : '<1';
      const textTemplate = portion && portion !== 1 && portion !== 0 ? '%{meta[0]}%' : '';
      const dimDetails = yearData.allLabels.find((l) => l.id === rowId);
      plotData.push({
        type: 'bar',
        x: [yearData.allLabels.find((l) => l.id === colId)?.label],
        y: [datum],
        meta: [displayPortions],
        textposition: 'outside',
        texttemplate: textTemplate,
        textangle: 0,
        name: dimDetails?.label,
        base: datum < 0 ? [-datum] : undefined,
        width: 0.5,
        marker: {
          color: dimDetails?.color || theme.graphColors.grey050,
        },
        showlegend: datum !== 0,
      });
    });
  });

  const range = [0, maxTotal * 1.25];

  const layout: Partial<Plotly.Layout> = {
    height: 400,
    hovermode: false,
    barmode: 'stack',
    title: {
      text: endYear + '',
      font: {
        family: theme.fontFamily,
        size: 20,
      },
      xref: 'paper',
      x: 0,
    },
    annotations: [
      // Places y-axis title on top of the y-axis
      {
        xref: 'paper',
        yref: 'paper',
        yshift: 10,
        x: 0,
        xanchor: 'left',
        y: 1,
        yanchor: 'bottom',
        text: longUnit || undefined,
        font: {
          family: theme.fontFamily,
          size: 14,
        },
        showarrow: false,
      },
    ],
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
    yaxis: {
      range: range,
      tickfont: {
        family: theme.fontFamily,
      },
    },
    xaxis: {
      tickfont: {
        family: theme.fontFamily,
      },
    },
    dragmode: false,
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'top',
      y: -0.2,
      xanchor: 'right',
      x: 1,
      itemclick: false,
      itemdoubleclick: false,
    },
  };

  const plotConfig = {
    displaylogo: false,
    responsive: true,
  };

  return (
    <>
      <div className="mt-3">
        <Plot
          data={plotData}
          layout={layout}
          useResizeHandler
          config={plotConfig}
          style={{ minWidth: '300px', maxWidth: '600px' }}
          noValidate
        />
      </div>
    </>
  );
};

export default DimensionalBarGraph;
