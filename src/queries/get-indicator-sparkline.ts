import { gql } from '@apollo/client';

/** What `IndicatorSparkline` reads */
export const GET_INDICATOR_SPARKLINE = gql`
  query IndicatorSparklineGraphData($id: ID, $plan: ID) {
    indicator(plan: $plan, id: $id) {
      id
      name
      minValue
      maxValue
      nonQuantifiedGoal
      nonQuantifiedGoalDate
      referenceValue {
        id
        date
        value
      }
      unit {
        id
        name
        shortName
      }
      values(includeDimensions: false) {
        id
        date
        value
      }
      goals {
        id
        date
        value
      }
    }
  }
`;
