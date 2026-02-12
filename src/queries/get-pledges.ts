import { gql } from '@apollo/client';

import type {
  GetPledgeFeatureEnabledQuery,
  GetPledgeFeatureEnabledQueryVariables,
  GetPledgeQuery,
  GetPledgeQueryVariables,
  GetPledgesQuery,
  GetPledgesQueryVariables,
} from '@/common/__generated__/graphql';
import images from '@/common/images';
import { ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT } from '@/fragments/action-attribute.fragment';

import { getClient } from '../utils/apollo-rsc-client';

export const getPledgeFeatureEnabled = async (plan: string) =>
  await (
    await getClient()
  ).query<GetPledgeFeatureEnabledQuery, GetPledgeFeatureEnabledQueryVariables>({
    query: GET_PLEDGE_FEATURE_ENABLED,
    variables: {
      plan,
    },
    fetchPolicy: 'no-cache',
  });

export const getPledges = async (plan: string) =>
  await (
    await getClient()
  ).query<GetPledgesQuery, GetPledgesQueryVariables>({
    query: GET_PLEDGES,
    variables: {
      plan,
    },
    fetchPolicy: 'no-cache',
  });

export const getPledge = async (plan: string, slug: string) =>
  await (
    await getClient()
  ).query<GetPledgeQuery, GetPledgeQueryVariables>({
    query: GET_PLEDGE,
    variables: {
      plan,
      slug,
    },
    fetchPolicy: 'no-cache',
  });

const PLEDGE_FRAGMENT = gql`
  fragment PledgeFragment on Pledge {
    id
    name
    description
    uuid
    slug
    image {
      ...MultiUseImageFragment
    }
    commitmentCount
    residentCount
    impactStatement
    localEquivalency
    attributes {
      ...AttributesBlockAttributeWithNestedType
    }
  }
  ${images.fragments.multiUseImage}
  ${ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT}
`;

const GET_PLEDGES = gql`
  query GetPledges($plan: ID!) {
    plan(id: $plan) {
      id
      pages {
        ... on PledgeListPage {
          id
          title
          leadContent
          backgroundImage {
            ...MultiUseImageFragment
          }
        }
      }
      pledges {
        ...PledgeFragment
        actions {
          id
          identifier
          name
          viewUrl
        }
      }
    }
  }
  ${PLEDGE_FRAGMENT}
`;

const PLEDGE_BODY_FRAGMENT = gql`
  fragment PledgeBodyFragment on StreamFieldInterface {
    id
    blockType
    ... on RichTextBlock {
      value
    }
    ... on QuestionAnswerBlock {
      heading
      questions {
        ... on QuestionBlock {
          question
          answer
        }
      }
    }
    ... on LargeImageBlock {
      image {
        title
        altText
        width
        height
        renditionUncropped: rendition(size: "1320x1320", crop: false) {
          src
        }
        imageCredit
      }
      width
    }
  }
`;

const GET_PLEDGE = gql`
  query GetPledge($plan: ID!, $slug: String!) {
    plan(id: $plan) {
      id
      pledge(slug: $slug) {
        ...PledgeFragment
        body {
          ...PledgeBodyFragment
        }
        actions {
          id
          identifier
          name
          viewUrl
        }
      }
    }
  }
  ${PLEDGE_FRAGMENT}
  ${PLEDGE_BODY_FRAGMENT}
`;

const GET_PLEDGE_FEATURE_ENABLED = gql`
  query GetPledgeFeatureEnabled($plan: ID!) {
    plan(id: $plan) {
      id
      features {
        enableCommunityEngagement
      }
    }
  }
`;
