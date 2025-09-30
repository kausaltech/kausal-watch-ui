import { gql } from '@apollo/client';

export const GET_INDICATOR_LIST = gql`
  query IndicatorList($plan: ID!, $relatedPlanIndicators: Boolean!) {
    plan(id: $plan) {
      id
      features {
        hasActionPrimaryOrgs
      }
      indicatorLevels {
        level
        indicator {
          id
          name
          timeResolution
          organization {
            id
            name
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
          }
          categories {
            id
            name
            parent {
              id
            }
            type {
              id
              identifier
            }
          }
          latestGraph {
            id
          }
          latestValue {
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
              }
            }
          }
          unit {
            shortName
          }
        }
      }
      categoryTypes(usableForIndicators: true) {
        name
        id
        identifier
        categories {
          id
          identifier
          order
          name
          parent {
            id
          }
          common @include(if: $relatedPlanIndicators) {
            type {
              identifier
              name
            }
          }
        }
      }
      hasIndicatorRelationships
    }
    planIndicators(plan: $plan) @skip(if: $relatedPlanIndicators) {
      id
      common {
        id
        name
        indicators {
          id
          organization {
            name
          }
        }
        relatedCauses {
          effectType
          causalIndicator {
            id
            name
          }
        }
        relatedEffects {
          id
          effectType
          effectIndicator {
            id
            name
          }
        }
      }
    }
    relatedPlanIndicators(plan: $plan) @include(if: $relatedPlanIndicators) {
      id
      name
      level(plan: $plan)
      timeResolution
      organization {
        id
        name
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
      }
      latestGraph {
        id
      }
      latestValue {
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
          }
        }
      }
      unit {
        shortName
      }
      categories {
        id
        name
        parent {
          id
        }
        type {
          id
          identifier
          name
        }
        common {
          id
          identifier
          name
          order
          type {
            identifier
            name
          }
        }
      }
    }
  }
`;
