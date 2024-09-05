import { getClient } from '@/utils/apollo-rsc-client';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import { gql } from '@apollo/client';

import { ACTION_PARAMETER_FRAGMENT } from './get-paths-actions';

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

const gqlUrl = 'https://api.paths.kausal.dev/v1/graphql/';

export const getPathsInstance = async (pathsInstance: string) =>
  await getClient().query({
    query: GET_INSTANCE_CONTEXT,
    fetchPolicy: 'no-cache',
    variables: { path: '', goal: null },
    context: {
      uri: gqlUrl,
      headers: getHttpHeaders({ instanceIdentifier: pathsInstance }),
    },
  });
