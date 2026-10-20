import { gql } from '@apollo/client';

export const GET_INSTANCE_GOAL_OUTCOME = gql`
  query GetInstanceGoalOutcome($goal: ID!) {
    instance {
      id
      goals(id: $goal) {
        values {
          year
          goal
          actual
          isForecast
          isInterpolated
        }
        unit {
          htmlShort
        }
      }
    }
  }
`;

/**
 * Variables of `GET_INSTANCE_GOAL_OUTCOME` in `GoalOutcomeBar`. Shared with the
 * server-side preload, which must ask for exactly the same data.
 */
export function getGoalOutcomeVariables(goalId: string | undefined) {
  return { goal: goalId || '' };
}
