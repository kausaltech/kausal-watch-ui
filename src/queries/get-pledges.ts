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

const GET_PLEDGE = gql`
  query GetPledge($plan: ID!, $slug: String!) {
    plan(id: $plan) {
      id
      pledge(slug: $slug) {
        ...PledgeFragment
        # TODO: there's a backend issue with this atm
        # body
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
