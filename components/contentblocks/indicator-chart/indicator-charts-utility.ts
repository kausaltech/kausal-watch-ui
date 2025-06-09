import { linearRegression } from 'common/math';
import { DashboardIndicatorLineChartBlock as TDashboardIndicatorLineChartBlock } from '@/common/__generated__/graphql';
import { TFunction } from 'next-intl';

export const X_SYMBOL =
  'path://M0.979266 20.7782C-0.192306 21.9497 -0.192307 23.8492 0.979266 25.0208C2.15084 26.1924 4.05033 26.1924 5.22191 ' +
  '25.0208L13.0001 17.2426L20.7783 25.0208C21.9498 26.1924 23.8493 26.1924 25.0209 25.0208C26.1925 23.8492 26.1925 21.9497 ' +
  '25.0209 20.7782L17.2427 13L25.0209 5.22181C26.1925 4.05024 26.1925 2.15075 25.0209 0.979174C23.8493 -0.192399 21.9498 ' +
  '-0.192399 20.7783 0.979174L13.0001 8.75735L5.22191 0.979175C4.05033 -0.192398 2.15084 -0.192398 0.979266 0.979175C-0.192307 ' +
  '2.15075 -0.192307 4.05024 0.979266 5.22182L8.75744 13L0.979266 20.7782Z';

export interface GraphsTheme {
  categoryColors?: string[];
  totalLineColor?: string;
  trendLineColor?: string;
  goalLineColors?: string[];
  showTrendline?: boolean;
}

export function buildDimSeries(
  chartSeries: TDashboardIndicatorLineChartBlock['chartSeries'],
  palette: string[]
) {
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

export function buildTotalSeries(
  chartSeries: TDashboardIndicatorLineChartBlock['chartSeries'],
  totalLineColor: string
) {
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
  return {
    name: 'Total',
    color: totalLineColor,
    raw: totalRaw,
  };
}

export function buildGoalSeries(
  indicator: TDashboardIndicatorLineChartBlock['indicator'],
  unit: string,
  goalLineColors: string[]
) {
  return (
    indicator?.goals?.map((g) => {
      const y = new Date(g.date).getFullYear();
      return {
        name: 'Goal',
        type: 'scatter' as const,
        symbol: X_SYMBOL,
        symbolSize: 10,
        data: [[String(y), g.value]],
        itemStyle: { color: goalLineColors?.[0] ?? '#3E9C88' },
        tooltip: { formatter: `Goal: ${g.value} ${unit}` },
      };
    }) || []
  );
}

export function buildTrendSeries(
  totalRaw: [number, number][],
  indicator: TDashboardIndicatorLineChartBlock['indicator'],
  trendLineColor: string
) {
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

  return regData.length >= 2 && (indicator?.showTrendline ?? true)
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
          lineStyle: { type: 'dashed', width: 2, color: trendLineColor },
          itemStyle: { color: trendLineColor },
          tooltip: { show: false },
        },
      ]
    : [];
}

export function buildValueFormatter(valueRounding?: number) {
  return (value: number) => {
    return valueRounding != null
      ? value.toLocaleString(undefined, {
          maximumSignificantDigits: valueRounding,
        })
      : `${value}`;
  };
}

export function buildTooltipFormatter(
  unit: string,
  legendData: string[],
  t: TFunction,
  dimension?: { name: string },
  valueRounding?: number
) {
  const formatValue = buildValueFormatter(valueRounding);

  return (params: any[]) => {
    const processedSeries = new Set<string>();
    const paramsArray = Array.isArray(params) ? params : [params];
    const year = paramsArray[0]?.axisValue;

    const rows = paramsArray
      .filter((p) => {
        if (!legendData.includes(p.seriesName)) return false;
        if (processedSeries.has(p.seriesName)) return false;
        processedSeries.add(p.seriesName);
        return true;
      })
      .map((p) => {
        const value =
          Array.isArray(p.data) && typeof p.data[1] === 'number'
            ? formatValue(p.data[1])
            : typeof p.data === 'number'
            ? formatValue(p.data)
            : '-';
        const name = dimension ? p.seriesName : t('total');
        return `${p.marker} ${name}: ${value} ${unit}`;
      });

    return `<strong>${year}</strong><br/>${rows.join('<br/>')}`;
  };
}

export function buildYAxisConfig(
  unit: string,
  indicator?: {
    minValue?: number | null;
    maxValue?: number | null;
    ticksCount?: number | null;
    ticksRounding?: number | null;
  },
  color?: string
) {
  const yAxis: any = {
    type: 'value',
    name: unit,
    axisLabel: {
      color,
      formatter: (value: number) => {
        const rounding = indicator?.ticksRounding;
        if (rounding != null) {
          const rounded = Number(value).toPrecision(rounding);
          return Number(rounded).toLocaleString();
        }
        return value;
      },
    },
  };

  if (typeof indicator?.minValue === 'number') {
    yAxis.min = indicator.minValue;
  }
  if (typeof indicator?.maxValue === 'number') {
    yAxis.max = indicator.maxValue;
  }
  if (typeof indicator?.ticksCount === 'number') {
    yAxis.splitNumber = indicator.ticksCount;
  }

  return yAxis;
}
