import { gql } from '@apollo/client';

import { INDICATOR_LIST_INDICATOR_FRAGMENT } from '@/fragments/indicator-list-indicator.fragment';

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
          ...IndicatorListIndicator
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
      ...IndicatorListIndicator
      level(plan: $plan)
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
  ${INDICATOR_LIST_INDICATOR_FRAGMENT}
`;
