import { gql } from '@apollo/client';

const GET_SCENARIOS = gql`
  query GetScenarios {
    scenarios {
      id
      name
      isActive
      isDefault
    }
  }
`;

export { GET_SCENARIOS };
