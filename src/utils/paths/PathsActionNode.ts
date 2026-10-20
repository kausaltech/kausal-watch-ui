// @ts-nocheck
// TODO: Use graphql generated types
import { ActionNode, ForecastMetricType } from '@/common/__generated__/paths/graphql';

export default class PathsActionNode {
  private data: ActionNode;

  constructor(data: ActionNode) {
    this.data = data;
  }

  getImpactMetric(): ForecastMetricType | null {
    return this.data.impactMetric ?? null;
  }

  isEnabled(): boolean {
    return this.data.isEnabled;
  }

  getUnit(): string | null | undefined {
    return (
      this.data.metricDim?.unit?.htmlShort ||
      this.data.metricDim?.unit?.short ||
      this.data.unit?.htmlShort ||
      this.data.unit?.htmlLong ||
      this.data.unit?.short ||
      this.data.unit?.long
    );
  }

  getYearlyImpact(year: number): number | null {
    return this.getImpactMetric()?.forecastValues.find((v) => v.year === year)?.value ?? null;
  }
}
