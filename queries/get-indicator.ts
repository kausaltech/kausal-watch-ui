import {
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables,
} from '@/common/__generated__/graphql';
import { gql } from '@apollo/client';

import { CATEGORY_TYPE_FRAGMENT } from '../fragments/category-tags.fragment';
import { getClient } from '../utils/apollo-rsc-client';

export const getIndicatorDetails = async (plan: string, indicatorId: string) =>
  await getClient().query<
    IndicatorDetailsQuery,
    IndicatorDetailsQueryVariables
  >({
    query: GET_INDICATOR_DETAILS,
    variables: {
      plan,
      id: indicatorId,
    },
    fetchPolicy: 'no-cache',
  });

const GET_INDICATOR_DETAILS = gql`
  query IndicatorDetails($id: ID, $plan: ID) {
    indicator(plan: $plan, id: $id) {
      id
      identifier
      name
      level(plan: $plan)
      description
      timeResolution
      desiredTrend
      organization {
        id
        classification {
          id
          name
        }
        name
        abbreviation
        logo {
          id
          rendition(size: "128x128", crop: true) {
            src
          }
        }
      }
      categories {
        identifier
        name
        id
        type {
          ...CategoryTypeFragment
        }
      }
      common {
        id
        indicators {
          id
          identifier
          organization {
            id
            classification {
              id
              name
            }
            name
            abbreviation
            logo {
              id
              rendition(size: "128x128", crop: true) {
                src
              }
            }
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
      latestGraph {
        id
      }
      values {
        id
        date
        value
      }
      goals {
        id
        date
        value
        scenario {
          id
        }
      }
      actions(plan: $plan) {
        id
        ...ActionsTableRowFragment
      }
      relatedCauses {
        id
        effectType
        confidenceLevel
        causalIndicator {
          id
          name
          level(plan: $plan)
        }
      }
      relatedEffects {
        id
        effectType
        confidenceLevel
        effectIndicator {
          id
          name
          level(plan: $plan)
        }
      }
    }
  }

  fragment ActionsTableRowFragment on Action {
    id
    identifier
    name
    color
    status {
      id
      identifier
      name
      color
    }
    implementationPhase {
      id
      identifier
      name
    }
    statusSummary {
      identifier
    }
    completion
    categories {
      id
      identifier
      name
      image {
        rendition {
          id
          src
        }
      }
    }
    impact {
      id
      identifier
      name
    }
  }

  ${CATEGORY_TYPE_FRAGMENT}
`;
