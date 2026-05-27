import { gql } from '@apollo/client';

export const INDICATOR_CHART_FRAGMENTS = gql`
  fragment DashboardIndicatorFragment on Indicator {
    id
    name
    description
    showTrendline
    valueRounding
    minValue
    maxValue
    ticksCount
    ticksRounding
    timeResolution
    latestValue {
      value
      date
    }
    dataCategoriesAreStackable
    goals {
      value
      date
    }
    unit {
      name
      shortName
    }
    desiredTrend
  }

  fragment ChartDimensionFragment on Dimension {
    id
    name
    categories {
      id
      name
    }
  }

  fragment ChartSeriesFragment on DashboardIndicatorChartSeries {
    dimensionCategory {
      id
      name
      defaultColor
    }
    values {
      id
      value
      date
    }
  }

  fragment BarChartVisualization on IndicatorBarChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      ...ChartDimensionFragment
    }
    barType
    chartSeries {
      ...ChartSeriesFragment
    }
  }

  fragment LineChartVisualization on IndicatorLineChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      ...ChartDimensionFragment
    }
    showTotalLine
    chartSeries {
      ...ChartSeriesFragment
    }
  }

  fragment AreaChartVisualization on IndicatorAreaChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      ...ChartDimensionFragment
    }
    showTotalLine
    chartSeries {
      ...ChartSeriesFragment
    }
  }

  fragment PieChartVisualization on IndicatorPieChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      ...ChartDimensionFragment
    }
    year
    chartSeries {
      ...ChartSeriesFragment
    }
  }

  fragment SummaryVisualization on IndicatorSummaryInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
  }
`;
