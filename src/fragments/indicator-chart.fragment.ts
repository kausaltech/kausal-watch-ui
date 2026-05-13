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

  fragment BarChartVisualization on IndicatorBarChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      id
      name
      categories {
        id
        name
      }
    }
    barType
    chartSeries {
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
  }

  fragment LineChartVisualization on IndicatorLineChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      id
      name
      categories {
        id
        name
      }
    }
    showTotalLine
    chartSeries {
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
  }

  fragment AreaChartVisualization on IndicatorAreaChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      id
      name
      categories {
        id
        name
      }
    }
    showTotalLine
    chartSeries {
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
  }

  fragment PieChartVisualization on IndicatorPieChartInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
    dimension {
      id
      name
      categories {
        id
        name
      }
    }
    year
    chartSeries {
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
  }

  fragment SummaryVisualization on IndicatorSummaryInterface {
    indicator {
      ...DashboardIndicatorFragment
    }
  }
`;
