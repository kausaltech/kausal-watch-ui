/* istanbul ignore file */
import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  DomainSiteVerificationQuery,
  DomainSiteVerificationQueryVariables,
} from '@/common/__generated__/graphql';

import { getClient } from '../utils/apollo-rsc-client';

/*
 * Unlike the plan context query, this resolves for plans that are not
 * published, so pages served in place of an unpublished plan can still prove
 * ownership of the domain to search engines.
 */
const GET_DOMAIN_SITE_VERIFICATION: TypedDocumentNode<
  DomainSiteVerificationQuery,
  DomainSiteVerificationQueryVariables
> = gql`
  query DomainSiteVerification($hostname: String!) {
    plansForHostname(hostname: $hostname) {
      domain(hostname: $hostname) {
        id
        googleSiteVerificationTag
      }
    }
  }
`;

export const getDomainSiteVerification = async (hostname: string) =>
  await (
    await getClient()
  ).query({
    query: GET_DOMAIN_SITE_VERIFICATION,
    variables: { hostname },
    fetchPolicy: 'no-cache',
  });
