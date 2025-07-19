import { gql } from '@apollo/client';

export const DimensionalMetricFragment = gql`
  fragment DimensionalMetric on DimensionalMetricType {
    id
    name
    dimensions {
      id
      label
      originalId
      helpText
      categories {
        id
        originalId
        label
        color
        order
        group
      }
      groups {
        id
        originalId
        label
        color
        order
      }
    }
    goals {
      categories
      groups
      values {
        year
        value
        isInterpolated
      }
    }
    unit {
      htmlShort
      short
    }
    stackable
    normalizedBy {
      id
      name
    }
    forecastFrom
    years
    values
  }
`;

const dimensionalNodePlotFragment = gql`
  fragment DimensionalNodeMetric on NodeInterface {
    metricDim {
      ...DimensionalMetric
    }
  }
  ${DimensionalMetricFragment}
`;

const OUTCOME_NODE_FIELDS = gql`
  fragment OutcomeNodeFields on Node {
    id
    name
    color
    order
    shortName
    shortDescription
    metric(goalId: $goal) {
      id
      name
      unit {
        short
        htmlShort
        htmlLong
      }
      forecastValues {
        year
        value
      }
      baselineForecastValues {
        year
        value
      }
      historicalValues {
        year
        value
      }
    }
    targetYearGoal
    goals(activeGoal: $goal) {
      year
      value
    }
    unit {
      short
      htmlShort
      htmlLong
    }
    quantity
    shortDescription
    inputNodes {
      id
      name
    }
    outputNodes {
      id
    }
    upstreamActions(onlyRoot: true, decisionLevel: MUNICIPALITY) {
      id
      name
      goal
      shortName
      shortDescription
      parameters {
        __typename
        id
        nodeRelativeId
        node {
          id
        }
        isCustomized
        ... on BoolParameterType {
          boolValue: value
          boolDefaultValue: defaultValue
        }
      }
      group {
        id
        name
        color
      }
    }
    metricDim {
      ...DimensionalMetric
    }
  }
  ${DimensionalMetricFragment}
`;

export const GET_OUTCOME_NODE = gql`
  ${OUTCOME_NODE_FIELDS}
  query GetOutcomeNodeContent($node: ID!, $goal: ID) {
    node(id: $node) {
      ...OutcomeNodeFields
      upstreamNodes(sameQuantity: true, sameUnit: true, includeActions: false) {
        ...OutcomeNodeFields
      }
    }
  }
`;

const GET_PAGE = gql`
  ${OUTCOME_NODE_FIELDS}
  query GetPage($path: String!, $goal: ID) {
    activeScenario {
      id
    }
    page(path: $path) {
      id
      __typename
      title
      ... on OutcomePage {
        leadTitle
        leadParagraph
        outcomeNode {
          ...OutcomeNodeFields
          upstreamNodes(sameQuantity: true, sameUnit: true, includeActions: false) {
            ...OutcomeNodeFields
          }
        }
      }
    }
  }
`;

export default GET_PAGE;
