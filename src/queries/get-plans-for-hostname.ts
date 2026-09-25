import { GET_PLANS_BY_HOSTNAME } from '@/queries/get-plans';
import { createPlanAgnosticApolloClient } from '@/utils/apollo-public-client';

const apolloClient = createPlanAgnosticApolloClient();

/*
 * The proxy's hostname lookup, made anonymously and past its cache. Pages use it to recheck a
 * cached answer that routed an anonymous visitor to a plan the backend then would not serve.
 */
export const getPlansForHostnameUncached = async (hostname: string) =>
  await apolloClient.query({
    query: GET_PLANS_BY_HOSTNAME,
    variables: { hostname },
    fetchPolicy: 'no-cache',
  });
