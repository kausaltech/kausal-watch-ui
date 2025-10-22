import { gql } from '@apollo/client';

import { RECURSIVE_CATEGORY_TAG_FRAGMENT } from '../fragments/category.fragment';

export const GET_INDICATOR_DETAILS = gql`
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
        ...CategoryTagRecursiveFragment
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
          plans {
            identifier
            viewUrl
            parent {
              identifier
            }
          }
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
          plans {
            identifier
            viewUrl
            parent {
              identifier
            }
          }
          level(plan: $plan)
        }
      }
      plans {
        id
        identifier
        name
        shortName
        supersededBy {
          id
        }
        allRelatedPlans {
          id
        }
        relatedPlans {
          id
        }
        supersededPlans(recursive: true) {
          id
        }
        supersedingPlans(recursive: true) {
          id
        }
        parent {
          id
        }
        children {
          id
        }
        copyOf {
          id
        }
        copies {
          id
        }
        versionName
        publishedAt
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

  ${RECURSIVE_CATEGORY_TAG_FRAGMENT}
`;
