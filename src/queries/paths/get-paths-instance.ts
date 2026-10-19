import { gql } from '@apollo/client';

import type {
  GetInstanceContextQuery,
  GetInstanceContextQueryVariables,
} from '@/common/__generated__/paths/graphql';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';

export const scenarioFragment = gql`
  fragment ScenarioFragment on ScenarioType {
    id
    isActive
    isDefault
    name
    kind
    actualHistoricalYears
  }
`;

const GET_INSTANCE_CONTEXT = gql`
  query GetInstanceContext {
    instance {
      id
      name
      themeIdentifier
      owner
      defaultLanguage
      supportedLanguages
      targetYear
      modelEndYear
      referenceYear
      minimumHistoricalYear
      maximumHistoricalYear
      features {
        baselineVisibleInGraphs
        hideNodeDetails
        maximumFractionDigits
        showAccumulatedEffects
        showSignificantDigits
      }
      goals {
        id
        label
        default
        disabled
        outcomeNode {
          id
        }
        dimensions {
          dimension
          categories
          groups
        }
      }
    }
    scenarios {
      ...ScenarioFragment
    }
    availableNormalizations {
      id
      label
      isActive
    }
  }
  ${scenarioFragment}
`;

export default GET_INSTANCE_CONTEXT;

export const getPathsInstance = async (pathsInstance: string) =>
  await (
    await getPathsClient(pathsInstance)
  ).query<GetInstanceContextQuery, GetInstanceContextQueryVariables>({
    query: GET_INSTANCE_CONTEXT,
    fetchPolicy: 'no-cache',
    variables: {},
  });
