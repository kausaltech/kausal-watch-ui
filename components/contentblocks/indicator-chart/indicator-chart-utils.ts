import { linearRegression } from 'common/math';
import { DashboardIndicatorLineChartBlock as TDashboardIndicatorLineChartBlock } from '@/common/__generated__/graphql';

export const GOAL_SYMBOL =
  'path://M0.979266 20.7782C-0.192306 21.9497 -0.192307 23.8492 0.979266 25.0208C2.15084 26.1924 4.05033 26.1924 5.22191 ' +
  '25.0208L13.0001 17.2426L20.7783 25.0208C21.9498 26.1924 23.8493 26.1924 25.0209 25.0208C26.1925 23.8492 26.1925 21.9497 ' +
  '25.0209 20.7782L17.2427 13L25.0209 5.22181C26.1925 4.05024 26.1925 2.15075 25.0209 0.979174C23.8493 -0.192399 21.9498 ' +
  '-0.192399 20.7783 0.979174L13.0001 8.75735L5.22191 0.979175C4.05033 -0.192398 2.15084 -0.192398 0.979266 0.979175C-0.192307 ' +
  '2.15075 -0.192307 4.05024 0.979266 5.22182L8.75744 13L0.979266 20.7782Z';

export function getDimSeries(
  chartSeries: TDashboardIndicatorLineChartBlock['chartSeries'],
  palette: string[]
): { name: string; color: string; raw: [number, number][] }[] {
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

  return Array.from(dimCategoryMap.entries()).map(
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
}

export function getTotalSeries(
  chartSeries: TDashboardIndicatorLineChartBlock['chartSeries'],
  color: string
): { name: string; color: string; raw: [number, number][] } | null {
  const totalMap = new Map<number, number>();
  chartSeries
    .find((s) => !s.dimensionCategory)
    ?.values.forEach((v) => {
      if (v.value != null && v.date) {
        const y = new Date(v.date).getFullYear();
        totalMap.set(y, (totalMap.get(y) || 0) + v.value);
      }
    });

  if (totalMap.size === 0) return null;

  const raw = Array.from(totalMap.entries()).sort((a, b) => a[0] - b[0]);
  return { name: 'Total', color, raw };
}

export function buildLines(
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

export function getTrendSeries(
  totalRaw: [number, number][],
  show: boolean,
  goalYears: number[],
  trendLineColor: string
) {
  const regData = totalRaw.slice(-Math.min(totalRaw.length, 10));
  const predictedYears = regData.map(([yr]) => yr);
  const maxGoalYear = Math.max(...goalYears, 0);
  if (maxGoalYear > predictedYears[predictedYears.length - 1]) {
    predictedYears.push(maxGoalYear);
  }

  const model = linearRegression(regData);
  const predictedValues = predictedYears.map((yr) => model.m * yr + model.b);

  if (regData.length < 2 || !show) return [];

  return [
    {
      name: 'Trend',
      type: 'line' as const,
      symbol: 'none',
      showSymbol: false,
      smooth: false,
      data: predictedYears.map((yr, i) => [String(yr), predictedValues[i]]),
      lineStyle: {
        type: 'dashed',
        width: 2,
        color: trendLineColor,
      },
      itemStyle: {
        color: trendLineColor,
      },
      tooltip: { show: false },
    },
  ];
}

export function getGoalSeries(
  goals: { date: string; value: number }[],
  color: string,
  symbol: string,
  unit: string
) {
  return goals.map((g) => {
    const y = new Date(g.date).getFullYear();
    return {
      name: 'Goal',
      type: 'scatter' as const,
      symbol,
      symbolSize: 10,
      data: [[String(y), g.value]],
      itemStyle: { color },
      tooltip: { formatter: `Goal: ${g.value} ${unit}` },
    };
  });
}
