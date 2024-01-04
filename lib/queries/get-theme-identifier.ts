import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';

const GET_PLAN_THEME_IDENTIFIER = gql`
  query GetPlanThemeIdentifier($identifier: ID) {
    plan(id: $identifier) {
      themeIdentifier
    }
  }
`;

type PlanThemeIdentifierResponse = {
  plan: {
    themeIdentifier: string;
  };
};

export const getPlanThemeIdentifier = async (identifier: string) =>
  await getClient().query<PlanThemeIdentifierResponse>({
    query: GET_PLAN_THEME_IDENTIFIER,
    variables: {
      identifier,
    },
    fetchPolicy: 'no-cache',
  });
