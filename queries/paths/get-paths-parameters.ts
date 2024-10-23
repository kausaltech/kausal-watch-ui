import { gql } from '@apollo/client';

import { ACTION_PARAMETER_FRAGMENT } from './get-paths-node';

const GET_PARAMETERS = gql`
  query GetParameters {
    availableNormalizations {
      id
      label
      isActive
    }
    parameters {
      ...ActionParameter
    }
  }
  ${ACTION_PARAMETER_FRAGMENT}
`;

export { GET_PARAMETERS };
