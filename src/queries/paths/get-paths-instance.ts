import { gql } from '@apollo/client';

import type {
  GetInstanceContextQuery,
  GetInstanceContextQueryVariables,
} from '@/common/__generated__/paths/graphql';
import { getPathsClient } from '@/utils/paths/paths-rsc-client';

import { ACTION_PARAMETER_FRAGMENT } from './get-paths-node';

export const scenarioFragment = gql`
  fragment ScenarioFragment on ScenarioType {
    id
    isActive
    isDefault
    name
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
      leadTitle
      leadParagraph
      features {
        baselineVisibleInGraphs
        hideNodeDetails
        maximumFractionDigits
        showAccumulatedEffects
        showSignificantDigits
      }
      introContent {
        ... on StreamFieldInterface {
          ... on RichTextBlock {
            field
            value
          }
        }
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
    parameters {
      ...ActionParameter
    }
  }
  ${scenarioFragment}
  ${ACTION_PARAMETER_FRAGMENT}
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
