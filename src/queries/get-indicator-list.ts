import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  IndicatorListQuery,
  IndicatorListQueryVariables,
} from '@/common/__generated__/graphql';
import { INDICATOR_LIST_INDICATOR_FRAGMENT } from '@/fragments/indicator-list-indicator.fragment';

export const GET_INDICATOR_LIST: TypedDocumentNode<
  IndicatorListQuery,
  IndicatorListQueryVariables
> = gql`
  query IndicatorList($plan: ID!, $relatedPlanIndicators: Boolean!) {
    plan(id: $plan) {
      id
      features {
        hasActionPrimaryOrgs
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
            id
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
      ...IndicatorListIndicator
      level(plan: $plan)
    }
    relatedPlanIndicators(plan: $plan) @include(if: $relatedPlanIndicators) {
      ...IndicatorListIndicator
      level(plan: $plan)
    }
  }
  ${INDICATOR_LIST_INDICATOR_FRAGMENT}
`;
