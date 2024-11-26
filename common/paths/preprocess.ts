import { ceil, max as _max, min as _min, sum } from 'lodash';

let nrSignificantDigits = 2;

export function setSignificantDigits(nr: number) {
  nrSignificantDigits = nr;
}

// Use Finnish style numeric display formatting
export const beautifyValue = (x: number, significantDigits?: number) => {
  if (!significantDigits) significantDigits = nrSignificantDigits;

  if (!x) return x;
  const rounded =
    Math.abs(x) < 1
      ? Number(x.toFixed(significantDigits))
      : Number(x.toPrecision(significantDigits));

  // TODO: use watch local formatting
  return rounded;
};

// Use Format number to locale and round to 3 decimals
export const formatNumber = (value, language = 'en') => {
  return parseFloat(
    Number(value).toPrecision(nrSignificantDigits)
  ).toLocaleString(language);
};

export const getInitialMetric = (node) => node.metric.historicalValues[0];

type MetricValue = {
  year: number;
  value: number;
};

type NodeMetric = {
  forecastValues: MetricValue[];
  historicalValues: MetricValue[];
};

export const getMetricValue = (node: { metric: NodeMetric }, year: number) =>
  node.metric.forecastValues.find((dataPoint) => dataPoint.year === year)
    ?.value ??
  node.metric.historicalValues.find((dataPoint) => dataPoint.year === year)
    ?.value;

export const getImpactMetricValue = (
  node: { impactMetric: NodeMetric },
  date
) =>
  node.impactMetric.forecastValues.find((dataPoint) => dataPoint.year === date)
    ?.value ??
  node.impactMetric.historicalValues.find(
    (dataPoint) => dataPoint.year === date
  )?.value ??
  0;

export const getMetricChange = (initial, current) =>
  initial !== 0
    ? -Math.round(((initial - current) / initial) * 100)
    : undefined;

export const getOutcomeTotal = (nodes, date) =>
  sum(nodes.map((node) => getMetricValue(node, date)));

export const summarizeYearlyValues = (yearlyValues) =>
  sum(yearlyValues.map((v) => v.value));

export const summarizeYearlyValuesBetween = (metric, startYear, endYear) => {
  const yearlyValues = [];
  if (metric?.historicalValues)
    metric.historicalValues.forEach((dataPoint) => {
      if (dataPoint.year >= startYear && dataPoint.year <= endYear)
        yearlyValues.push(dataPoint);
    });
  if (metric?.forecastValues)
    metric.forecastValues.forEach((dataPoint) => {
      if (dataPoint.year >= startYear && dataPoint.year <= endYear)
        yearlyValues.push(dataPoint);
    });
  if (metric?.length)
    metric.forEach((dataPoint) => {
      if (dataPoint.year >= startYear && dataPoint.year <= endYear)
        yearlyValues.push(dataPoint);
    });
  return summarizeYearlyValues(yearlyValues);
};

export const metricToPlot = (
  metric,
  segment: string,
  startYear: number,
  endYear: number
) => {
  const plot: { x: number[]; y: number[] } = { x: [], y: [] };
  (metric?.[segment] ?? []).forEach((dataPoint) => {
    if (dataPoint.year <= endYear && dataPoint.year >= startYear) {
      plot.x.push(dataPoint.year);
      plot.y.push(dataPoint.value);
    }
  });
  return plot;
};

type getRangeType = (values: number[]) => [number, number];

export const getRange: getRangeType = (values) => {
  // Try to guess a clean range for the y-axis
  const minValue: number = _min(values) ?? 0;
  const maxValue: number = _max(values) ?? 0;
  const rangeSize = maxValue - minValue;
  const rangeDigits = Math.floor(Math.log10(rangeSize));
  const precision = rangeSize < 10 ? -rangeDigits : -rangeDigits + 1;
  const min = minValue < 0 ? -ceil(Math.abs(minValue), precision) : 0;
  const max = ceil(maxValue, precision);
  return [min, max];
};

export interface ActionEnabledParam {
  node?: object | null;
  nodeRelativeId: string | null;
  __typename: string;
}

export function findActionEnabledParam<ParamType extends ActionEnabledParam>(
  params: ParamType[]
) {
  const param = params.find((param) => {
    if (!param.node) return false;
    if (param.nodeRelativeId !== 'enabled') return false;
    return true;
  }) as (ParamType & { __typename: 'BoolParameterType' }) | undefined;
  if (!param) return null;
  return param;
}
