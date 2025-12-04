import React, { useEffect, useState } from 'react';

import { PieChart } from 'echarts/charts';
import type { PieSeriesOption } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

import {
  Indicator,
  DashboardIndicatorPieChartBlock as TDashboardIndicatorPieChartBlock,
  Unit,
} from '@/common/__generated__/graphql';

import { getDefaultColors } from './indicator-chart-colors';

echarts.use([PieChart, LegendComponent]);

interface SeriesData {
  name: string;
  value: number;
}
interface DashboardIndicatorPieChartBlockProps extends TDashboardIndicatorPieChartBlock {}

function getLatestYear(chartSeries: DashboardIndicatorPieChartBlockProps['chartSeries']) {
  const lastDate = chartSeries?.[0]?.values?.[chartSeries?.[0]?.values.length - 1]?.date;

  if (!lastDate) {
    return undefined;
  }

  return new Date(lastDate).getFullYear();
}

function doYearsMatch(year: number, date: string) {
  const yearFromDate = new Date(date).getFullYear();

  return yearFromDate === year;
}

/**
 * Determine if we should show the segmented percentage in addition to the value.
 * If the indicator is already a percentage that sums to 100, we don't want to show the segmented percentage.
 */
function showSegmentedPercentage(unit: Unit | undefined, values: SeriesData[]) {
  if (!unit) {
    return true;
  }

  const isPercentage = unit.name === '%';
  const valuesSumTo100 = values.reduce((acc, curr) => acc + curr.value, 0) === 100;

  if (isPercentage && valuesSumTo100) {
    return false;
  }

  return true;
}

function createTooltipFormatter(indicator: Indicator | null, seriesData: SeriesData[]) {
  const showPercentage = showSegmentedPercentage(indicator?.unit, seriesData);

  return (tooltipParams: CallbackDataParams) => {
    const nameAndValue = `${tooltipParams.name}: ${tooltipParams.value}`;

    if (!showPercentage || !tooltipParams.percent) {
      return nameAndValue;
    }

    return `${nameAndValue} (${Math.round(tooltipParams.percent)}%)`;
  };
}

const DashboardIndicatorPieChartBlock = ({
  chartSeries,
  dimension,
  indicator,
  year,
}: DashboardIndicatorPieChartBlockProps) => {
  const theme = useTheme();
  const assertedYear = year ?? getLatestYear(chartSeries);

  if (!assertedYear) {
    return <div>No year provided</div>;
  }

  const seriesData =
    chartSeries?.reduce((acc, series) => {
      if (!series?.dimensionCategory?.name) {
        return acc;
      }

      const categoryName = series.dimensionCategory.name;
      const valueForYear = series.values?.find(
        (v): v is NonNullable<typeof v> => v?.date != null && doYearsMatch(assertedYear, v.date)
      )?.value;

      const value = valueForYear ?? 0;

      return [
        ...acc,
        {
          name: categoryName,
          value: value,
          itemStyle: {
            // An unset defaultColor is returned as an empty string
            color: series.dimensionCategory.defaultColor || undefined,
          },
        },
      ];
    }, [] as SeriesData[]) ?? [];

  //hide legends on smaller screens to prevent overlapping in some cases
  const [isCompactLayout, setIsCompactLayout] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const breakpoint = theme.breakpointXl;
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);

    const update = (event?: MediaQueryList | MediaQueryListEvent) => {
      setIsCompactLayout((event ?? mediaQuery).matches);
    };
    update();

    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [theme.breakpointXl]);

  const option: ECOption & { series: PieSeriesOption[] } = {
    tooltip: {
      appendTo: 'body',
      trigger: 'item',
      formatter: createTooltipFormatter(indicator ?? null, seriesData),
    },
    legend: {
      show: !isCompactLayout,
      orient: 'horizontal',
      bottom: 0,
      left: 'center',
      type: 'plain',
      selectedMode: false,
      itemGap: 20,
      itemWidth: 18,
      itemHeight: 12,
      formatter: (name: string) => `${name}\u00A0\u00A0\u00A0\u00A0`,
      textStyle: {
        color: theme.textColor.primary,
      },
      pageTextStyle: {
        color: theme.textColor.primary,
      },
      pageIconColor: theme.textColor.primary,
      pageIconInactiveColor: theme.textColor.tertiary,
    },
    color: getDefaultColors(theme),
    series: [
      {
        type: 'pie',
        center: ['50%', isCompactLayout ? '50%' : '40%'],
        top: 0,
        bottom: isCompactLayout ? 0 : 20,
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 0,
          borderColor: theme.themeColors.white,
          borderWidth: 0,
        },

        label: {
          show: true,
          formatter: (params: CallbackDataParams) =>
            `${params.name}\n${params.percent ? `${Math.round(params.percent)}%` : ''}`,
        },
        labelLine: {
          show: true,
          length: 0,
          length2: 6,
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold',
          },
        },

        data: seriesData,
      },
    ],
  };

  return (
    <>
      <h5>
        {dimension?.name} ({assertedYear})
      </h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorPieChartBlock;
