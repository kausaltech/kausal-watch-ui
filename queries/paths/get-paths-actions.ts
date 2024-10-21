import { gql } from '@apollo/client';

const ACTION_PARAMETER_FRAGMENT = gql`
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

const PATHS_ACTION_FRAGMENT = gql`
  fragment pathsActionFragment on ActionNode {
    id
    name
    goal
    shortDescription
    color
    decisionLevel
    unit {
      htmlShort
    }
    parameters {
      ...ActionParameter
    }
    quantity
    inputNodes {
      id
    }
    outputNodes {
      id
    }
    impactMetric(goalId: $goal) {
      id
      name
      unit {
        htmlShort
      }
      cumulativeForecastValue
      yearlyCumulativeUnit {
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
    }
    group {
      id
      name
      color
    }
  }
  ${ACTION_PARAMETER_FRAGMENT}
`;

const GET_PATHS_ACTION_LIST = gql`
  query GetPathsActionList($goal: ID) {
    instance {
      id
      actionGroups {
        id
        name
        color
        actions {
          id
        }
      }
    }
    actions(onlyRoot: true) {
      ...pathsActionFragment
    }
  }
  ${PATHS_ACTION_FRAGMENT}
`;

const GET_PATHS_ACTION = gql`
  query GetPathsAction($action: ID!, $goal: ID) {
    action(id: $action) {
      ...pathsActionFragment
    }
  }
  ${PATHS_ACTION_FRAGMENT}
`;

export { ACTION_PARAMETER_FRAGMENT, GET_PATHS_ACTION, GET_PATHS_ACTION_LIST };
