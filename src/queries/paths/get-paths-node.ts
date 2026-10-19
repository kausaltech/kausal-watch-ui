import { gql } from '@apollo/client';

import { DIMENSIONAL_METRIC_FRAGMENT } from '@/utils/paths/metric';

export const ACTION_PARAMETER_FRAGMENT = gql`
  fragment ActionParameter on ParameterInterface {
    __typename
    id
    label
    description
    nodeRelativeId
    node {
      id
    }
    isCustomized
    isCustomizable
    ... on NumberParameterType {
      numberValue: value
      numberDefaultValue: defaultValue
      minValue
      maxValue
      unit {
        htmlShort
      }
      step
    }
    ... on BoolParameterType {
      boolValue: value
      boolDefaultValue: defaultValue
    }
    ... on StringParameterType {
      stringValue: value
      stringDefaultValue: defaultValue
    }
  }
`;

/** What `PathsNodeSummary` reads */
export const CAUSAL_GRID_NODE_FRAGMENT = gql`
  fragment CausalGridNode on NodeInterface {
    id
    unit {
      htmlShort
    }
    ... on ActionNode {
      isEnabled
    }
    impactMetric(goalId: $goal, targetNodeId: $targetNodeId) {
      id
      forecastValues {
        value
        year
      }
    }
    metricDim {
      ...DimensionalMetric
    }
    parameters {
      ...ActionParameter
    }
  }
  ${DIMENSIONAL_METRIC_FRAGMENT}
`;

const GET_NODE_CONTENT = gql`
  query GetNodeContent($node: ID!, $goal: ID, $targetNodeId: ID) {
    node(id: $node) {
      ...CausalGridNode
    }
  }
  ${CAUSAL_GRID_NODE_FRAGMENT}
  ${ACTION_PARAMETER_FRAGMENT}
`;

/**
 * Variables of `GET_NODE_CONTENT` for a node summary, which shows the impact on
 * the instance's default goal. Shared by `PathsNodeSummary` and the
 * server-side preload, which must ask for exactly the same data.
 */
export function getNodeContentVariables(
  node: string,
  goals: readonly { id: string; default: boolean }[] | undefined,
  targetNodeId: string | null | undefined
) {
  return {
    node,
    goal: goals?.find((goal) => goal.default)?.id ?? 'net_emissions',
    targetNodeId: targetNodeId ?? null,
  };
}

const GET_NODE_INFO = gql`
  query GetNodeInfo($node: ID!) {
    node(id: $node) {
      __typename
      id
      name
    }
  }
`;

export { GET_NODE_CONTENT, GET_NODE_INFO };
