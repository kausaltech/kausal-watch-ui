import { gql } from '@apollo/client';

import { DIMENSIONAL_METRIC_FRAGMENT as DimensionalMetricFragment } from '@/utils/paths/metric';

/** What the outcome cards read */
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
    inputNodes {
      id
    }
    outputNodes {
      id
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

/**
 * Variables of `GET_OUTCOME_NODE` for an outcome block. Shared by the block and
 * the server-side preload, which must ask for exactly the same data.
 */
export function getOutcomeNodeVariables(
  outcomeNodeId: string | null | undefined,
  goal: string | null
) {
  return { node: outcomeNodeId || 'net_emissions', goal };
}
