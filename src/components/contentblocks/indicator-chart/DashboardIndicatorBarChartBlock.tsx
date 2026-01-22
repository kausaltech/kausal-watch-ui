import React, { useEffect, useRef, useState } from 'react';

import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import { Chart, type ECOption } from '@common/components/Chart';

import { DashboardIndicatorBarChartBlock as TDashboardIndicatorBarChartBlock } from '@/common/__generated__/graphql';

import { getDefaultColors } from './indicator-chart-colors';
import {
  buildDimSeries,
  buildTooltipFormatter,
  buildTotalSeries,
  buildYAxisConfig,
} from './indicator-charts-utility';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent]);

type Props = TDashboardIndicatorBarChartBlock;

// FIX: Watch the card width so we can shrink the legend on small screens
// (e.g. 3 charts per row) and keep more space for the bars—no scroll legend.
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry?.contentRect?.width ?? 0);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

const DashboardIndicatorBarChartBlock = ({ chartSeries, indicator, dimension, barType }: Props) => {
  const theme = useTheme();
  const t = useTranslations();
  const graphsTheme = theme.settings?.graphs ?? {};
  const unit = indicator?.unit?.name ?? '';
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);

  const totalLabel = t('total');

  const { ref: containerRef, width } = useElementWidth<HTMLDivElement>();
  const isCompact = width > 0 && width < 520;

  if (!chartSeries?.length) {
    return <div>{t('data-not-available')}</div>;
  }

  const dimSeries = dimension
    ? buildDimSeries(chartSeries, palette)
    : [buildTotalSeries(chartSeries, graphsTheme.totalLineColor ?? palette[0], totalLabel)];

  const xCategoriesSet = new Set<string>();
  const seriesDataMap: Record<string, (number | null)[]> = {};

  dimSeries.forEach(({ name, raw }) => {
    seriesDataMap[name] = [];
    raw.forEach(([year]) => {
      xCategoriesSet.add(String(year));
    });
  });

  const xCategories = Array.from(xCategoriesSet).sort();

  dimSeries.forEach(({ name, raw }) => {
    const valuesByYear: Record<string, number> = Object.fromEntries(
      raw.map(([year, value]) => [String(year), value])
    );
    seriesDataMap[name] = xCategories.map((year) => valuesByYear[year] ?? null);
  });

  const series = Object.entries(seriesDataMap).map(([name, data]) => ({
    name,
    type: 'bar' as const,
    stack: barType === 'stacked' ? 'total' : undefined,
    data,
    emphasis: { focus: 'series' },
    itemStyle: {
      color: dimSeries.find((d) => d.name === name)?.color,
    },
  }));

  const legendData = dimSeries.map((d) => d.name);

  const buildLegend = (theme: any): ECOption['legend'] => ({
    show: true,
    bottom: isCompact ? 6 : 10,
    left: 'center',
    orient: 'horizontal',
    // Tighter legend layout on compact cards
    itemGap: isCompact ? 10 : 30,
    itemWidth: isCompact ? 12 : 18,
    itemHeight: isCompact ? 8 : 12,
    padding: 0,
    textStyle: {
      color: theme.textColor.secondary,
      fontSize: isCompact ? 11 : 12,
      lineHeight: isCompact ? 12 : 14,
    },
  });

  const option: ECOption = {
    legend: buildLegend(theme),
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'shadow' },
      formatter: buildTooltipFormatter(unit, legendData, t, dimension, indicator?.valueRounding),
    },
    grid: {
      left: 20,
      right: 20,
      top: 40,
      bottom: isCompact ? 80 : 60,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xCategories,
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: buildYAxisConfig(indicator?.unit?.name ?? '', indicator, theme.textColor.primary),
    series,
  };

  return (
    <div ref={containerRef}>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </div>
  );
};

export default DashboardIndicatorBarChartBlock;
