// TODO: Use graphql generated types

interface YearlyValue {
  year: number;
  value: number;
}

interface UnitType {
  htmlShort: string;
}

interface ImpactMetric {
  id: string;
  name: string;
  unit: UnitType;
  cumulativeForecastValue: number;
  yearlyCumulativeUnit: UnitType;
  historicalValues: YearlyValue[];
  forecastValues: YearlyValue[];
}

interface ActionNodeData {
  id: string;
  name: string;
  goal: string;
  shortDescription: string;
  color: string | null;
  decisionLevel: string;
  unit: UnitType;
  parameters: any[]; // define a more specific type for parameters
  quantity: string;
  inputNodes: any[]; // define a more specific type for parameters
  outputNodes: any[]; // define a more specific type for parameters
  impactMetric: ImpactMetric;
  group: {
    id: string;
    name: string;
    color: string;
  };
}

export default class PathsActionNode {
  private data: ActionNodeData;

  constructor(data: ActionNodeData) {
    this.data = data;
  }

  getId(): string {
    return this.data.id;
  }

  getName(): string {
    return this.data.name;
  }

  getImpactMetric(): ImpactMetric {
    return this.data.impactMetric;
  }

  getUnit(): string {
    return (
      this.data.unit.htmlShort ||
      this.data.unit.htmlLong ||
      this.data.unit.short ||
      this.data.unit.long
    );
  }

  getCumulativeImpact(): number {
    return this.getImpactMetric().cumulativeForecastValue;
  }

  getYearlyImpact(year: number): number | null {
    const forecastValue = this.getImpactMetric().forecastValues.find(
      (v) => v.year === year
    );
    return forecastValue ? forecastValue.value : null;
  }

  getTotalImpactUntil(year: number): number {
    return this.getImpactMetric()
      .forecastValues.filter((v) => v.year <= year)
      .reduce((sum, v) => sum + v.value, 0);
  }

  getAverageImpact(startYear: number, endYear: number): number {
    const relevantValues = this.getImpactMetric().forecastValues.filter(
      (v) => v.year >= startYear && v.year <= endYear
    );

    if (relevantValues.length === 0) return 0;

    const sum = relevantValues.reduce((sum, v) => sum + v.value, 0);
    return sum / relevantValues.length;
  }
}
