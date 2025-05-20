import React from 'react';
import { useTheme } from 'styled-components';
import { PieChart } from 'echarts/charts';
import type { PieSeriesOption } from 'echarts/charts';
import * as echarts from 'echarts/core';
import Chart, { ECOption } from '@/components/paths/graphs/Chart';
import {
  Indicator,
  DashboardIndicatorPieChartBlock as TDashboardIndicatorPieChartBlock,
  Unit,
} from '@/common/__generated__/graphql';
import { CallbackDataParams } from 'echarts/types/dist/shared';

echarts.use([PieChart]);

interface SeriesData {
  name: string;
  value: number;
}
interface DashboardIndicatorPieChartBlockProps
  extends TDashboardIndicatorPieChartBlock {}

function getLatestYear(
  chartSeries: DashboardIndicatorPieChartBlockProps['chartSeries']
) {
  const lastDate =
    chartSeries?.[0]?.values?.[chartSeries?.[0]?.values.length - 1]?.date;

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
  const valuesSumTo100 =
    values.reduce((acc, curr) => acc + curr.value, 0) === 100;

  if (isPercentage && valuesSumTo100) {
    return false;
  }

  return true;
}

function createTooltipFormatter(
  indicator: Indicator | null,
  seriesData: SeriesData[]
) {
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
        (v): v is NonNullable<typeof v> =>
          v?.date != null && doYearsMatch(assertedYear, v.date)
      )?.value;

      const value = valueForYear ?? 0;

      return [
        ...acc,
        {
          name: categoryName,
          value: value,
        },
      ];
    }, [] as SeriesData[]) ?? [];

  const option: ECOption & { series: PieSeriesOption[] } = {
    tooltip: {
      appendTo: 'body',
      trigger: 'item',
      formatter: createTooltipFormatter(indicator ?? null, seriesData),
    },
    series: [
      {
        type: 'pie',
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 0,
          borderColor: theme.themeColors.white,
          borderWidth: 0,
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        data: seriesData,
      },
    ],
  };

  return <Chart data={option} isLoading={false} height="300px" />;
};

export default DashboardIndicatorPieChartBlock;
