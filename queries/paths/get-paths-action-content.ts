import { gql } from '@apollo/client';

import { ACTION_PARAMETER_FRAGMENT } from './get-paths-actions';

const DIMENSIONAL_METRIC_FRAGMENT = gql`
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

const DIMENSIONAL_FLOW_FRAGMENT = gql`
  fragment DimensionalPlot on DimensionalFlowType {
    id
    unit {
      htmlLong
    }
    nodes {
      id
      label
      color
    }
    sources
    links {
      year
      sources
      targets
      values
      absoluteSourceValues
    }
  }
`;

const GET_ACTION_CONTENT = gql`
  query GetActionContent($node: ID!, $goal: ID, $downstreamDepth: Int) {
    action(id: $node) {
      ...CausalGridNode
      goal
      description
      dimensionalFlow {
        ...DimensionalPlot
      }
      downstreamNodes(maxDepth: $downstreamDepth) {
        ...CausalGridNode
      }
      decisionLevel
      body {
        ...StreamFieldFragment
      }
    }
  }
  ${DIMENSIONAL_FLOW_FRAGMENT}

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
  ${DIMENSIONAL_FLOW_FRAGMENT}
  ${ACTION_PARAMETER_FRAGMENT}
`;

export { GET_ACTION_CONTENT };
