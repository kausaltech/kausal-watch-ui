import { gql } from '@apollo/client';

export const INDICATOR_CHART_FRAGMENTS = gql`
  fragment DashboardIndicator on Indicator {
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
      id
      value
      date
    }
    dataCategoriesAreStackable
    goals {
      id
      value
      date
    }
    unit {
      id
      name
      shortName
    }
    desiredTrend
  }

  fragment ChartDimension on Dimension {
    id
    name
    categories {
      id
      name
    }
  }

  fragment ChartSeries on DashboardIndicatorChartSeries {
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
      ...DashboardIndicator
    }
    dimension {
      ...ChartDimension
    }
    barType
    chartSeries {
      ...ChartSeries
    }
  }

  fragment LineChartVisualization on IndicatorLineChartInterface {
    indicator {
      ...DashboardIndicator
    }
    dimension {
      ...ChartDimension
    }
    showTotalLine
    chartSeries {
      ...ChartSeries
    }
  }

  fragment AreaChartVisualization on IndicatorAreaChartInterface {
    indicator {
      ...DashboardIndicator
    }
    dimension {
      ...ChartDimension
    }
    showTotalLine
    chartSeries {
      ...ChartSeries
    }
  }

  fragment PieChartVisualization on IndicatorPieChartInterface {
    indicator {
      ...DashboardIndicator
    }
    dimension {
      ...ChartDimension
    }
    year
    chartSeries {
      ...ChartSeries
    }
  }

  fragment SummaryVisualization on IndicatorSummaryInterface {
    indicator {
      ...DashboardIndicator
    }
  }
`;
