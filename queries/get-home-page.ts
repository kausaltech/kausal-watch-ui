import { gql } from '@apollo/client';

import images from '@/common/images';
import { STREAM_FIELD_FRAGMENT } from '../fragments/stream-field.fragment';
import type { GetHomePageQuery } from '@/common/__generated__/graphql';
import { apolloQuery } from '../utils/apollo-rsc-client';

export const GET_HOME_PAGE = gql`
  query GetHomePage($plan: ID!, $path: String!) {
    planPage(plan: $plan, path: $path) {
      __typename
      id
      slug
      ... on PlanRootPage {
        body {
          id
          ...StreamFieldFragment
        }
      }
      lastPublishedAt
    }
    plan(id: $plan) {
      id
      primaryActionClassification {
        categories(onlyRoot: true) {
          id
          identifier
          name
          leadParagraph
          image {
            ...MultiUseImageFragment
          }
          color
          categoryPage {
            live
            id
            title
            urlPath
          }
          level {
            name
            namePlural
          }
          parent {
            id
          }
          type {
            id
            hideCategoryIdentifiers
          }
        }
      }
    }
  }

  ${STREAM_FIELD_FRAGMENT}
  ${images.fragments.multiUseImage}
`;

export const getHomePage = async (plan: string) =>
  await apolloQuery<GetHomePageQuery>({
    query: GET_HOME_PAGE,
    variables: {
      plan,
      path: '/',
    },
    fetchPolicy: 'no-cache',
  });
