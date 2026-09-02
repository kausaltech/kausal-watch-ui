import { gql } from '@apollo/client';

import type { HomePageQuery } from '@/common/__generated__/graphql';
import images from '@/common/images';

import { STREAM_FIELD_FRAGMENT } from '../fragments/stream-field.fragment';
import { getClient } from '../utils/apollo-rsc-client';

export const GET_HOME_PAGE = gql`
  query HomePage($plan: ID!, $path: String!) {
    planPage(plan: $plan, path: $path) {
      __typename
      id
      slug
      ... on PlanRootPage {
        changeLogMessage {
          id
          content
          createdAt
          createdBy {
            id
            firstName
            lastName
            avatarUrl
          }
        }
        body {
          ...StreamField
        }
      }
      lastPublishedAt
    }
    plan(id: $plan) {
      id
      primaryActionClassification {
        id
        categories(onlyRoot: true) {
          id
          identifier
          name
          leadParagraph
          image {
            ...CardImage
          }
          color
          categoryPage {
            live
            id
            title
            urlPath
          }
          level {
            id
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
  ${images.fragments.cardImage}
`;

export const getHomePage = async (plan: string) =>
  await (
    await getClient()
  ).query<HomePageQuery>({
    query: GET_HOME_PAGE,
    variables: {
      plan,
      path: '/',
    },
    fetchPolicy: 'no-cache',
  });
