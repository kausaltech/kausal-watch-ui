import { gql } from '@apollo/client';

import type {
  PledgeFeatureEnabledQuery,
  PledgeFeatureEnabledQueryVariables,
  PledgeQuery,
  PledgeQueryVariables,
  PledgesQuery,
  PledgesQueryVariables,
} from '@/common/__generated__/graphql';
import images from '@/common/images';
import { ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT } from '@/fragments/action-attribute.fragment';

import { getClient } from '../utils/apollo-rsc-client';

export const getPledgeFeatureEnabled = async (plan: string) =>
  await (
    await getClient()
  ).query<PledgeFeatureEnabledQuery, PledgeFeatureEnabledQueryVariables>({
    query: GET_PLEDGE_FEATURE_ENABLED,
    variables: {
      plan,
    },
    fetchPolicy: 'no-cache',
  });

export const getPledges = async (plan: string) =>
  await (
    await getClient()
  ).query<PledgesQuery, PledgesQueryVariables>({
    query: GET_PLEDGES,
    variables: {
      plan,
    },
    fetchPolicy: 'no-cache',
  });

export const getPledge = async (plan: string, slug: string) =>
  await (
    await getClient()
  ).query<PledgeQuery, PledgeQueryVariables>({
    query: GET_PLEDGE,
    variables: {
      plan,
      slug,
    },
    fetchPolicy: 'no-cache',
  });

const PLEDGE_FRAGMENT = gql`
  fragment Pledge on Pledge {
    id
    name
    description
    uuid
    slug
    image {
      ...HeroImage
      ...CardImage
    }
    commitmentCount
    residentCount
    impactStatement
    localEquivalency
    attributes {
      ...AttributesBlockAttributeWithNestedType
    }
  }
  ${images.fragments.heroImage}
  ${images.fragments.cardImage}
  ${ATTRIBUTE_WITH_NESTED_TYPE_FRAGMENT}
`;

const GET_PLEDGES = gql`
  query Pledges($plan: ID!) {
    planPage(plan: $plan, path: "/pledges") {
      ... on PledgeListPage {
        id
        title
        leadContent
        backgroundImage {
          ...HeroImage
        }
      }
    }
    plan(id: $plan) {
      id
      pledges {
        ...Pledge
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
  fragment PledgeBody on StreamFieldInterface {
    id
    blockType
    ... on RichTextBlock {
      value
    }
    ... on QuestionAnswerBlock {
      heading
      questions {
        id
        ... on QuestionBlock {
          question
          answer
        }
      }
    }
    ... on LargeImageBlock {
      image {
        id
        title
        altText
        width
        height
        renditionUncropped: rendition(size: "1320x1320", crop: false) {
          id
          src
        }
        imageCredit
      }
      width
    }
  }
`;

const GET_PLEDGE = gql`
  query Pledge($plan: ID!, $slug: String!) {
    plan(id: $plan) {
      id
      pledge(slug: $slug) {
        ...Pledge
        body {
          ...PledgeBody
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
  query PledgeFeatureEnabled($plan: ID!) {
    plan(id: $plan) {
      id
      features {
        enableCommunityEngagement
      }
    }
  }
`;
