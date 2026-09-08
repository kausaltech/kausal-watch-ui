import { type TypedDocumentNode, gql } from '@apollo/client';

import type {
  DomainSiteVerificationQuery,
  DomainSiteVerificationQueryVariables,
} from '@/common/__generated__/graphql';
import { createPlanAgnosticApolloClient } from '@/utils/apollo-public-client';

/*
 * This query is scoped to a hostname, so it needs neither the plan identifier
 * nor the authentication that the RSC client adds. Pages served in place of a
 * restricted plan also resolve no plan identifier at all, which rules the RSC
 * client out entirely.
 */
const apolloClient = createPlanAgnosticApolloClient();

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
  await apolloClient.query({
    query: GET_DOMAIN_SITE_VERIFICATION,
    variables: { hostname },
    fetchPolicy: 'no-cache',
  });
