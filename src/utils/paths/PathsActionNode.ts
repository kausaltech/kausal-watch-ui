// TODO: Use graphql generated types
import { ActionNode, ForecastMetricType } from '@/common/__generated__/paths/graphql';

export default class PathsActionNode {
  private data: ActionNode;

  constructor(data: ActionNode) {
    this.data = data;
  }

  getId(): string {
    return this.data.id;
  }

  getName(): string {
    return this.data.name;
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

  getCumulativeImpact(): number | undefined {
    const impactMetric = this.getImpactMetric();
    if (impactMetric === null) return undefined;
    return impactMetric.cumulativeForecastValue ?? undefined;
  }

  getYearlyImpact(year: number): number | null {
    return this.getImpactMetric()?.forecastValues.find((v) => v.year === year)?.value ?? null;
  }

  getTotalImpactUntil(year: number): number {
    return (
      this.getImpactMetric()
        ?.forecastValues?.filter((v) => v.year <= year)
        .reduce((sum, v) => sum + (v.value ?? 0), 0) ?? 0
    );
  }

  getAverageImpact(startYear: number, endYear: number): number {
    const relevantValues =
      this.getImpactMetric()?.forecastValues?.filter(
        (v) => v.year >= startYear && v.year <= endYear
      ) ?? [];

    if (relevantValues.length === 0) {
      return 0;
    }

    const sum = relevantValues.reduce((acc, v) => acc + (v.value ?? 0), 0);
    return sum / relevantValues.length;
  }
}
