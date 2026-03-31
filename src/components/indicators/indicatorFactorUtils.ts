import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';

type IndicatorDetailsIndicator = NonNullable<IndicatorDetailsQuery['indicator']>;

export type ComputedMetricPoint = {
  date: string;
  value: number;
};

export type ComputedMetricSeries = {
  key: string;
  label: string;
  unit: string | null;
  points: ComputedMetricPoint[];
  referencePoint: ComputedMetricPoint | null;
  latestPoint: ComputedMetricPoint | null;
};

export function getComputedMetricSeries(
  datasets: IndicatorDetailsIndicator['datasets'] | null | undefined
): ComputedMetricSeries[] {
  if (!datasets?.length) return [];

  const grouped = new Map<string, ComputedMetricPoint[]>();
  const metaByKey = new Map<string, { label: string; unit: string | null }>();

  datasets.forEach((dataset) => {
    dataset?.computedDataPoints?.forEach((point) => {
      const label = point?.metric?.label;
      const unit = point?.metric?.unit ?? null;
      const value = point?.value;
      const date = point?.date;

      if (!label || value == null || !date) return;

      const key = `${label}__${unit ?? ''}`;

      const existing = grouped.get(key) ?? [];
      existing.push({ date, value });
      grouped.set(key, existing);

      if (!metaByKey.has(key)) {
        metaByKey.set(key, { label, unit });
      }
    });
  });

  return Array.from(grouped.entries())
    .map(([key, points]) => {
      const meta = metaByKey.get(key);
      if (!meta) return null;

      const uniqueSortedPoints = Array.from(
        new Map(
          [...points]
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((point) => [point.date, point])
        ).values()
      );

      return {
        key,
        label: meta.label,
        unit: meta.unit,
        points: uniqueSortedPoints,
        referencePoint: uniqueSortedPoints[0] ?? null,
        latestPoint: uniqueSortedPoints[uniqueSortedPoints.length - 1] ?? null,
      };
    })
    .filter((series): series is ComputedMetricSeries => Boolean(series && series.points.length));
}
