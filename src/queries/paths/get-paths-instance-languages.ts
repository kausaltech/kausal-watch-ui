import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  GetInstanceLanguagesQuery,
  GetInstanceLanguagesQueryVariables,
} from '@/common/__generated__/paths/graphql';

/**
 * The languages of the Paths instance. Sent without a language: Paths answers
 * in its default language, while rejecting one the instance doesn't support.
 */
export const GET_INSTANCE_LANGUAGES: TypedDocumentNode<
  GetInstanceLanguagesQuery,
  GetInstanceLanguagesQueryVariables
> = gql`
  query GetInstanceLanguages {
    instance {
      id
      supportedLanguages
      defaultLanguage
    }
  }
`;
