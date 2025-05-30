'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { LineChart, ScatterChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import Chart, { ECOption } from '@/components/paths/graphs/Chart';
import { DashboardIndicatorLineChartBlock as TDashboardIndicatorLineChartBlock } from '@/common/__generated__/graphql';
import { getDefaultColors } from './indicator-chart-colors';
import { linearRegression } from 'common/math';

interface GraphsTheme {
  categoryColors?: string[];
  totalLineColor?: string;
  trendLineColor?: string;
  goalLineColors?: string[];
  showTrendline?: boolean;
}

echarts.use([
  LineChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

type Props = TDashboardIndicatorLineChartBlock;

const X_SYMBOL =
  'path://M0.979266 20.7782C-0.192306 21.9497 -0.192307 23.8492 0.979266 25.0208C2.15084 26.1924 4.05033 26.1924 5.22191 ' +
  '25.0208L13.0001 17.2426L20.7783 25.0208C21.9498 26.1924 23.8493 26.1924 25.0209 25.0208C26.1925 23.8492 26.1925 21.9497 ' +
  '25.0209 20.7782L17.2427 13L25.0209 5.22181C26.1925 4.05024 26.1925 2.15075 25.0209 0.979174C23.8493 -0.192399 21.9498 ' +
  '-0.192399 20.7783 0.979174L13.0001 8.75735L5.22191 0.979175C4.05033 -0.192398 2.15084 -0.192398 0.979266 0.979175C-0.192307 ' +
  '2.15075 -0.192307 4.05024 0.979266 5.22182L8.75744 13L0.979266 20.7782Z';

const DashboardIndicatorLineChartBlock: React.FC<Props> = ({
  chartSeries,
  indicator,
  dimension,
  showTotalLine,
}) => {
  const theme = useTheme();
  const graphsTheme: GraphsTheme = theme.settings?.graphs ?? {};
  const unit = indicator?.unit?.name ?? '';
  const palette = graphsTheme.categoryColors ?? getDefaultColors(theme);

  if (!chartSeries?.length) {
    return <div>No data</div>;
  }

  const dimCategoryMap = new Map<
    string,
    { color: string; values: { date: string; value: number | null }[] }
  >();

  chartSeries
    .filter((s) => s.dimensionCategory)
    .forEach((s) => {
      const name = s.dimensionCategory!.name;
      const fallbackColor =
        palette[Array.from(dimCategoryMap.keys()).length % palette.length];
      const rawColor = s.dimensionCategory!.defaultColor;
      const color =
        rawColor && rawColor.trim() !== '' ? rawColor : fallbackColor;

      if (!dimCategoryMap.has(name)) {
        dimCategoryMap.set(name, { color, values: [] });
      }

      dimCategoryMap.get(name)!.values.push(...s.values);
    });

  const dimSeries = Array.from(dimCategoryMap.entries()).map(
    ([name, { color, values }]) => {
      const yearMap = new Map<number, number>();
      values.forEach((v) => {
        if (v.value != null && v.date) {
          const y = new Date(v.date).getFullYear();
          yearMap.set(y, (yearMap.get(y) || 0) + v.value);
        }
      });
      const raw = Array.from(yearMap.entries()).sort((a, b) => a[0] - b[0]);
      return { name, color, raw };
    }
  );

  const totalMap = new Map<number, number>();
  chartSeries
    .find((s) => !s.dimensionCategory)
    ?.values.forEach((v) => {
      if (v.value != null && v.date) {
        const y = new Date(v.date).getFullYear();
        totalMap.set(y, (totalMap.get(y) || 0) + v.value);
      }
    });
  const totalRaw = Array.from(totalMap.entries()).sort((a, b) => a[0] - b[0]);
  const totalDef = {
    name: 'Total',
    color: graphsTheme.totalLineColor ?? '#000',
    raw: totalRaw,
  };

  const yearSet = new Set<number>();
  dimSeries.forEach((d) => d.raw.forEach(([y]) => yearSet.add(y)));
  totalRaw.forEach(([y]) => yearSet.add(y));
  indicator?.goals?.forEach((g) => yearSet.add(new Date(g.date).getFullYear()));
  const years = Array.from(yearSet).sort((a, b) => a - b);
  const xCategories = years.map((y) => String(y));

  function buildLines(
    arr: { name: string; color: string; raw: [number, number][] }[],
    width = 2
  ) {
    return arr.map(({ name, color, raw }) => {
      const data =
        raw.length === 1
          ? [
              [String(raw[0][0]), raw[0][1]],
              [String(raw[0][0] + 1), raw[0][1]],
            ]
          : raw.map(([y, v]) => [String(y), v] as [string, number]);

      return {
        name,
        type: 'line' as const,
        data,
        showLine: true,
        showSymbol: true,
        symbolSize: 8,
        smooth: raw.length > 1,
        lineStyle: { width, color },
        itemStyle: { color },
      };
    });
  }

  const seriesLines = buildLines(dimSeries);
  const seriesTotal =
    showTotalLine && totalRaw.length ? buildLines([totalDef], 3) : [];

  // Trend line
  const regData = totalRaw.slice(-Math.min(totalRaw.length, 10));
  const predictedYears = regData.map(([yr]) => yr);
  if (indicator?.goals?.length) {
    const highestGoalYear = Math.max(
      ...indicator.goals.map((g) => new Date(g.date).getFullYear())
    );
    if (highestGoalYear > predictedYears[predictedYears.length - 1]) {
      predictedYears.push(highestGoalYear);
    }
  }
  const model = linearRegression(regData);
  const predictedValues = predictedYears.map((yr) => model.m * yr + model.b);

  const trendSeries =
    regData.length >= 2 &&
    (graphsTheme.showTrendline ?? indicator?.showTrendline)
      ? [
          {
            name: 'Trend',
            type: 'line' as const,
            symbol: 'none',
            showSymbol: false,
            smooth: false,
            data: predictedYears.map(
              (yr, i) => [String(yr), predictedValues[i]] as [string, number]
            ),
            lineStyle: {
              type: 'dashed',
              width: 2,
              color: graphsTheme.trendLineColor ?? '#aaa',
            },
            itemStyle: {
              color: graphsTheme.trendLineColor ?? '#aaa',
            },
            tooltip: { show: false },
          },
        ]
      : [];

  const goalSeries =
    indicator?.goals?.map((g) => {
      const y = new Date(g.date).getFullYear();
      return {
        name: 'Goal',
        type: 'scatter' as const,
        symbol: X_SYMBOL,
        symbolSize: 10,
        data: [[String(y), g.value]],
        itemStyle: { color: graphsTheme.goalLineColors?.[0] ?? '#3E9C88' },
        tooltip: { formatter: `Goal: ${g.value} ${unit}` },
      };
    }) || [];

  const legendData = [
    ...dimSeries.map((d) => d.name),
    ...(seriesTotal.length ? ['Total'] : []),
    ...(goalSeries.length ? ['Goal'] : []),
    ...(trendSeries.length ? ['Trend'] : []),
  ];

  const option: ECOption = {
    legend: {
      show: true,
      data: legendData,
      left: 'center',
      bottom: 0,
      textStyle: { color: theme.textColor.secondary },
    },
    tooltip: {
      trigger: 'axis',
      appendTo: 'body',
      axisPointer: { type: 'line' },
      formatter: (params) => {
        const seen = new Set<string>();
        const ary = Array.isArray(params) ? params : [params];
        const year = ary[0]?.data?.[0];
        const rows = ary
          .filter((p) => {
            if (!legendData.includes(p.seriesName)) return false;
            if (seen.has(p.seriesName)) return false;
            seen.add(p.seriesName);
            return true;
          })
          .map((p) => {
            const v = (p.data as any[])[1] as number;
            return `${p.marker} ${p.seriesName}: ${v.toFixed(1)} ${unit}`;
          });
        return `<strong>${year}</strong><br/>${rows.join('<br/>')}`;
      },
    },
    grid: { left: 20, right: 20, top: 40, bottom: 60, containLabel: true },
    xAxis: {
      type: 'category',
      name: 'Year',
      data: xCategories,
      boundaryGap: false,
      axisLabel: { color: theme.textColor.primary },
    },
    yAxis: {
      type: 'value',
      name: unit,
      min: 0,
      axisLabel: { color: theme.textColor.primary },
    },
    series: [...seriesLines, ...seriesTotal, ...goalSeries, ...trendSeries],
  };

  return (
    <>
      <h5>{dimension?.name}</h5>
      <Chart data={option} isLoading={false} height="300px" />
    </>
  );
};

export default DashboardIndicatorLineChartBlock;
