import { gql } from '@apollo/client';

import { CATEGORY_TYPE_FRAGMENT } from '../fragments/category-tags.fragment';
import { RECURSIVE_CATEGORY_TAG_FRAGMENT } from '../fragments/category.fragment';

export const GET_INDICATOR_DETAILS = gql`
  query IndicatorDetails($id: ID, $plan: ID, $sitePlan: ID) {
    plan(id: $sitePlan) {
      id
      identifier
      indicatorListPage {
        detailsMainTop {
          ... on IndicatorContentBlock {
            ...IndicatorContentBlockFragment
          }
          ... on IndicatorCategoryContentBlock {
            ...IndicatorCategoryContentBlockFragment
          }
          ... on IndicatorValueSummaryContentBlock {
            ...IndicatorValueSummaryContentBlockFragment
          }
        }
        detailsMainBottom {
          ... on IndicatorContentBlock {
            ...IndicatorContentBlockFragment
          }
          ... on IndicatorCategoryContentBlock {
            ...IndicatorCategoryContentBlockFragment
          }
          ... on IndicatorValueSummaryContentBlock {
            ...IndicatorValueSummaryContentBlockFragment
          }
        }
        detailsAside {
          ... on IndicatorContentBlock {
            ...IndicatorContentBlockFragment
          }
          ... on IndicatorCategoryContentBlock {
            ...IndicatorCategoryContentBlockFragment
          }
          ... on IndicatorValueSummaryContentBlock {
            ...IndicatorValueSummaryContentBlockFragment
          }
        }
      }
    }
    indicator(plan: $plan, id: $id) {
      id
      identifier
      name
      hideIndicatorGraph
      hideIndicatorTable
      level(plan: $plan)
      description
      goalDescription
      reference
      referenceValue {
        id
        date
        value
        normalizedValues {
          normalizerId
          value
        }
      }
      timeResolution
      valueRounding
      updatedAt
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
      nonQuantifiedGoal
      nonQuantifiedGoalDate
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
      changeLogMessage {
        content
        createdBy {
          firstName
          lastName
          avatarUrl
        }
        updatedAt
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

  fragment IndicatorCategoryContentBlockFragment on IndicatorCategoryContentBlock {
    id
    blockType
    fieldLabel
    fieldHelpText
    field
    categoryType {
      ...CategoryTypeFragment
    }
  }

  fragment IndicatorContentBlockFragment on IndicatorContentBlock {
    id
    blockType
    fieldLabel
    fieldHelpText
    field
    sourceField
  }

  fragment IndicatorValueSummaryContentBlockFragment on IndicatorValueSummaryContentBlock {
    id
    blockType
    fieldLabel
    fieldHelpText
    field
    showReferenceValue
    referenceYear
    defaultGoalYear
    showCurrentValue
    showGoalValue
    showGoalGap
  }
  ${RECURSIVE_CATEGORY_TAG_FRAGMENT}
  ${CATEGORY_TYPE_FRAGMENT}
`;
