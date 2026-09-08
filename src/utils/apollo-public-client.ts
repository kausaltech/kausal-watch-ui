import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { createSentryLink, logOperationLink } from '@common/apollo/links';
import { getWatchGraphQLUrl } from '@common/env';

import possibleTypes from '@/common/__generated__/possible_types.json';

import { errorLink, getHttpLink } from './apollo.utils';

/**
 * An Apollo client for server-side queries that are scoped to a hostname
 * rather than to a resolved plan.
 *
 * The RSC client stamps every request with the plan identifier and domain that
 * the proxy resolved, and authenticates it with the visitor's token. A query
 * that only takes a hostname needs none of that, and pages served in place of
 * a restricted plan resolve no plan identifier at all, so they cannot use the
 * RSC client. The error, Sentry and logging links are kept, so a rejected
 * query still reports the operation, its variables and the error path.
 */
export function createPlanAgnosticApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes: possibleTypes.possibleTypes,
    }),
    link: ApolloLink.from([
      errorLink,
      createSentryLink(getWatchGraphQLUrl()),
      logOperationLink,
      getHttpLink(),
    ]),
  });
}
