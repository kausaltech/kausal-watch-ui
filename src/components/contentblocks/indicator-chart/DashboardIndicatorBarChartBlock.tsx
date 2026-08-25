import { useTheme } from '@emotion/react';

import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { useTranslations } from 'next-intl';

import { Chart, type ECOption } from '@common/components/Chart';

import type { BarChartVisualizationFragment } from '@/common/__generated__/graphql';
import useNumberFormatter from '@/common/numbers';

import { getDefaultColors } from './indicator-chart-colors';
import {
  type GraphsTheme,
  buildDimSeries,
  buildTooltipFormatter,
  buildTotalSeries,
  buildYAxisConfig,
  collectAllDates,
  getUnitLabel,
} from './indicator-charts-utility';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = Omit<
  Extract<BarChartVisualizationFragment, { __typename: 'DashboardIndicatorBarChartBlock' }>,
  '__typename'
>;

const DashboardIndicatorBarChartBlock = ({ chartSeries, indicator, dimension, barType }: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const formatValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.valueRounding ?? undefined,
  });
  const formatAxisValue = useNumberFormatter({
    maximumSignificantDigits: indicator?.ticksRounding ?? 100,
  });
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  const unit = getUnitLabel(indicator);
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);
  const timeResolution = indicator?.timeResolution ?? 'YEAR';

  const totalLabel = t('total');

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const dimSeries = dimension
    ? buildDimSeries(chartSeries, palette, timeResolution)
    : [
        buildTotalSeries(
          chartSeries,
          graphsTheme.totalLineColor ?? palette[0],
          totalLabel,
          timeResolution
        ),
      ];

  const { xCategories } = collectAllDates(
    dimSeries.map((d) => d.raw),
    timeResolution
  );

  const seriesDataMap: Record<string, (number | null)[]> = {};
  dimSeries.forEach(({ name, raw }) => {
    const valuesByKey: Record<string, number> = Object.fromEntries(
      raw.map(([key, value]) => [key, value])
    );
    seriesDataMap[name] = xCategories.map((key) => valuesByKey[key] ?? null);
  });

  // An explicit block barType wins over the indicator's own
  // dataCategoriesAreStackable default; without one, the indicator decides.
  const stackBars = barType
    ? barType === 'stacked'
    : (indicator?.dataCategoriesAreStackable ?? false);

  const series = Object.entries(seriesDataMap).map(([name, data]) => ({
    name,
    type: 'bar' as const,
    stack: stackBars ? 'total' : undefined,
    data,
    emphasis: { focus: 'series' as const },
    itemStyle: {
      color: dimSeries.find((d) => d.name === name)?.color,
    },
  }));

  const legendData = dimSeries.map((d) => d.name);

  const option: ECOption = {
    backgroundColor: theme.themeColors.white,
    // Same legend style as the pie chart block
    legend: {
      show: true,
      orient: 'horizontal',
      bottom: 0,
      right: 0,
      // Keep swatches left of their labels (auto flips them for a
      // right-anchored legend)
      align: 'left',
      type: 'plain',
      // Also the gap between wrapped legend rows — ECharts has no separate
      // row-gap setting
      itemGap: 10,
      itemWidth: 18,
      itemHeight: 12,
      textStyle: {
        color: theme.textColor.primary,
      },
    },
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'shadow' },
      formatter: buildTooltipFormatter(
        unit,
        legendData,
        t,
        formatValue,
        dimension ?? undefined,
        timeResolution
      ),
    },
    grid: {
      left: 20,
      right: 20,
      top: 40,
      // Reserve the bottom ~quarter for the wrapping legend (up to ~4
      // rows), like the pie chart block does
      bottom: 100,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xCategories,
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: buildYAxisConfig(unit, formatAxisValue, indicator ?? undefined, theme.textColor.primary),
    series,
  };

  return (
    <div>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="400px" />
    </div>
  );
};

export default DashboardIndicatorBarChartBlock;
