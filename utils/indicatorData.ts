import { gql } from '@apollo/client';

export const GET_INDICATOR_GRAPH_DATA = gql`
  query IndicatorGraphData($id: ID, $plan: ID) {
    plan(id: $plan) {
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
      desiredTrend
      reference
      minValue
      maxValue
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
      dimensions {
        dimension {
          id
          name
          categories {
            id
            name
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
