import { gql } from '@apollo/client';

/** The normalisations the visitor can switch on, with the active one marked */
export const GET_AVAILABLE_NORMALIZATIONS = gql`
  query GetAvailableNormalizations {
    availableNormalizations {
      id
      label
      isActive
    }
  }
`;
