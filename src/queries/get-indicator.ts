import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables,
} from '@/common/__generated__/graphql';

import { CATEGORY_TYPE_FRAGMENT } from '../fragments/category-tags.fragment';
import { RECURSIVE_CATEGORY_TAG_FRAGMENT } from '../fragments/category.fragment';
import { INDICATOR_CHART_FRAGMENTS } from '../fragments/indicator-chart.fragment';

export const GET_INDICATOR_DETAILS: TypedDocumentNode<
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables
> = gql`
  query IndicatorDetails($id: ID, $plan: ID, $sitePlan: ID) {
    plan(id: $sitePlan) {
      id
      identifier
      indicatorListPage {
        id
        detailsMainTop {
          ... on IndicatorContentBlock {
            ...IndicatorContentBlock
          }
          ... on IndicatorCategoryContentBlock {
            ...IndicatorCategoryContentBlock
          }
          ... on IndicatorValueSummaryContentBlock {
            ...IndicatorValueSummaryContentBlock
          }
          ... on IndicatorFactorValueSummaryContentBlock {
            id
            blockType
            fieldLabel
            fieldHelpText
          }
          ... on IndicatorVisualizationContentBlock {
            id
            fieldLabel
            fieldHelpText
            showFactorValues
          }
        }
        detailsMainBottom {
          ... on IndicatorContentBlock {
            ...IndicatorContentBlock
          }
          ... on IndicatorCategoryContentBlock {
            ...IndicatorCategoryContentBlock
          }
          ... on IndicatorValueSummaryContentBlock {
            ...IndicatorValueSummaryContentBlock
          }
          ... on IndicatorFactorValueSummaryContentBlock {
            id
            blockType
            fieldLabel
            fieldHelpText
          }
          ... on IndicatorVisualizationContentBlock {
            id
            fieldLabel
            fieldHelpText
            showFactorValues
          }
        }
        detailsAside {
          ... on IndicatorContentBlock {
            ...IndicatorContentBlock
          }
          ... on IndicatorCategoryContentBlock {
            ...IndicatorCategoryContentBlock
          }
          ... on IndicatorValueSummaryContentBlock {
            ...IndicatorValueSummaryContentBlock
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
            id
            src
          }
        }
      }
      categories {
        ...CategoryTagRecursive
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
                id
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
      datasets {
        uuid
        schema {
          uuid
          name
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
      nonQuantifiedGoal
      nonQuantifiedGoalDate
      actions(plan: $plan) {
        id
        ...ActionsTableRow
      }
      relatedCauses {
        id
        effectType
        confidenceLevel
        causalIndicator {
          id
          name
          plans {
            id
            identifier
            viewUrl
            parent {
              id
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
            id
            identifier
            viewUrl
            parent {
              id
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
          id
          firstName
          lastName
          avatarUrl
        }
        updatedAt
      }
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
    }
  }

  fragment ActionsTableRow on Action {
    id
    identifier
    name
    color
    viewUrl
    scheduleContinuous
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
      label
      isActive
      isCompleted
      sentiment
    }
    mergedWith {
      id
      identifier
      viewUrl
      plan {
        id
        shortName
        viewUrl
      }
    }
    plan {
      id
      viewUrl
    }
    completion
    categories {
      id
      identifier
      name
      image {
        id
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

  fragment IndicatorCategoryContentBlock on IndicatorCategoryContentBlock {
    id
    blockType
    fieldLabel
    fieldHelpText
    field
    categoryType {
      ...CategoryType
    }
  }

  fragment IndicatorContentBlock on IndicatorContentBlock {
    id
    blockType
    fieldLabel
    fieldHelpText
    field
    sourceField
  }

  fragment IndicatorValueSummaryContentBlock on IndicatorValueSummaryContentBlock {
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
  ${INDICATOR_CHART_FRAGMENTS}
`;
