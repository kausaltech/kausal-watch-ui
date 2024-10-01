import { gql } from '@apollo/client';

import { ACTION_PARAMETER_FRAGMENT } from './get-paths-actions';

export const DIMENSIONAL_METRIC_FRAGMENT = gql`
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

export const CAUSAL_GRID_NODE_FRAGMENT = gql`
  fragment CausalGridNode on NodeInterface {
    id
    name
    shortDescription
    color
    targetYearGoal
    unit {
      htmlShort
    }
    inputNodes {
      id
    }
    outputNodes {
      id
    }
    ... on ActionNode {
      group {
        id
        name
        color
      }
    }
    impactMetric(goalId: $goal) {
      name
      id
      unit {
        htmlShort
      }
      historicalValues {
        year
        value
      }
      forecastValues {
        value
        year
      }
      baselineForecastValues {
        year
        value
      }
      yearlyCumulativeUnit {
        htmlShort
      }
    }
    metricDim {
      ...DimensionalMetric
    }
    quantity
    parameters {
      ...ActionParameter
    }
    metric(goalId: $goal) {
      name
      id
      unit {
        htmlShort
      }
      historicalValues {
        year
        value
      }
      forecastValues {
        value
        year
      }
      baselineForecastValues {
        year
        value
      }
    }
  }
  ${DIMENSIONAL_METRIC_FRAGMENT}
`;

const GET_NODE_CONTENT = gql`
  query GetNodeContent($node: ID!, $goal: ID!) {
    node(id: $node) {
      ...CausalGridNode
    }
  }
  ${CAUSAL_GRID_NODE_FRAGMENT}
  ${ACTION_PARAMETER_FRAGMENT}
`;

const GET_NODE_INFO = gql`
  query GetNodeInfo($node: ID!) {
    node(id: $node) {
      id
      name
    }
  }
`;

export { GET_NODE_CONTENT, GET_NODE_INFO };
