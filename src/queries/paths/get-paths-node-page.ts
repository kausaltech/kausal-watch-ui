import { gql } from '@apollo/client';

import { DIMENSIONAL_METRIC_FRAGMENT } from '@/utils/paths/metric';

const LINKED_NODE_FRAGMENT = gql`
  fragment NodePageLinkedNode on NodeInterface {
    id
    name
    color
  }
`;

export const GET_NODE_PAGE = gql`
  query GetNodePage($node: ID!) {
    node(id: $node) {
      __typename
      id
      name
      shortDescription
      description
      color
      inputNodes {
        ...NodePageLinkedNode
      }
      outputNodes {
        ...NodePageLinkedNode
      }
      metric {
        id
        baselineForecastValues {
          year
          value
        }
      }
      metricDim {
        ...DimensionalMetric
      }
    }
  }
  ${LINKED_NODE_FRAGMENT}
  ${DIMENSIONAL_METRIC_FRAGMENT}
`;

/**
 * Variables of `GET_NODE_PAGE`. Shared by the node page and its server-side
 * preload, which must ask for exactly the same data.
 */
export function getNodePageVariables(node: string) {
  return { node };
}
