import { gql } from '@apollo/client';

import { INDICATOR_CHART_FRAGMENTS } from '../fragments/indicator-chart.fragment';

export const GET_INDICATOR_GRAPH_DATA = gql`
  ${INDICATOR_CHART_FRAGMENTS}

  query IndicatorGraphData($id: ID, $plan: ID) {
    plan(id: $plan) {
      # Select id so the result is normalized and merged into the cached
      # Plan entity — an unidentifiable plan object would *replace* the
      # cached plan(id:) reference and wipe other queries' plan fields
      id
      scenarios {
        id
        identifier
        name
      }
    }
    indicator(plan: $plan, id: $id) {
      id
      name
      timeResolution
      showTrendline
      showTotalLine
      desiredTrend
      reference
      minValue
      maxValue
      ticksCount
      ticksRounding
      valueRounding
      dataCategoriesAreStackable
      organization {
        id
        name
        abbreviation
      }
      quantity {
        id
        name
      }
      values(includeDimensions: true) {
        id
        date
        value
        normalizedValues {
          normalizerId
          value
        }
        categories {
          id
        }
      }
      referenceValue {
        id
        date
        value
        normalizedValues {
          normalizerId
          value
        }
      }
      dimensions {
        dimension {
          id
          name
          categories {
            id
            name
            defaultColor
          }
        }
      }
      goals {
        id
        date
        value
        normalizedValues {
          normalizerId
          value
        }
        scenario {
          id
        }
      }
      nonQuantifiedGoal
      nonQuantifiedGoalDate
      defaultVisualization {
        ... on IndicatorDefaultBarChart {
          __typename
          ...BarChartVisualization
        }
        ... on IndicatorDefaultLineChart {
          __typename
          ...LineChartVisualization
        }
        ... on IndicatorDefaultAreaChart {
          __typename
          ...AreaChartVisualization
        }
        ... on IndicatorDefaultPieChart {
          __typename
          ...PieChartVisualization
        }
        ... on IndicatorDefaultSummary {
          __typename
          ...SummaryVisualization
        }
      }
      datasets {
        uuid
        schema {
          uuid
          metrics {
            label
            unit
            isComputed
          }
        }
        computedDataPoints {
          date
          value
          metric {
            label
            unit
          }
        }
      }
      unit {
        id
        name
        shortName
        verboseName
        verboseNamePlural
      }
      common {
        id
        name
        normalizations {
          unit {
            shortName
          }
          normalizer {
            name
            id
            identifier
          }
        }
        indicators {
          id
          organization {
            id
            name
            abbreviation
          }
          timeResolution
          minValue
          maxValue
          quantity {
            id
            name
          }
          values(includeDimensions: true) {
            id
            date
            value
            normalizedValues {
              normalizerId
              value
            }
            categories {
              id
            }
          }
          dimensions {
            dimension {
              id
              name
              categories {
                id
                name
                defaultColor
              }
            }
          }
          goals {
            id
            date
            value
            normalizedValues {
              normalizerId
              value
            }
            scenario {
              id
            }
          }
          unit {
            id
            name
            shortName
            verboseName
            verboseNamePlural
          }
        }
      }
    }
  }
`;
