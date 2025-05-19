import React from 'react';
import { useTheme } from 'styled-components';
import { PieChart } from 'echarts/charts';
import type { PieSeriesOption } from 'echarts/charts';
import * as echarts from 'echarts/core';
import Chart, { ECOption } from '@/components/paths/graphs/Chart';
import { DashboardIndicatorPieChartBlock as TDashboardIndicatorPieChartBlock } from '@/common/__generated__/graphql';

echarts.use([PieChart]);

interface DashboardIndicatorPieChartBlockProps
  extends TDashboardIndicatorPieChartBlock {}

function getLatestYear(
  chartSeries: DashboardIndicatorPieChartBlockProps['chartSeries']
) {
  return chartSeries?.[0]?.values?.[chartSeries?.[0]?.values.length - 1]?.date;
}

const DashboardIndicatorPieChartBlock = ({
  chartSeries,
  dimension,
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
        (v): v is NonNullable<typeof v> => v !== null && v.date === assertedYear
      )?.value;

      const value = valueForYear ?? 0;

      return [
        ...acc,
        {
          name: categoryName,
          value: value,
        },
      ];
    }, [] as { name: string; value: number }[]) ?? [];

  const option: ECOption & { series: PieSeriesOption[] } = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: theme.themeColors.white,
          borderWidth: 2,
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
