import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import getConfig from 'next/config';

import { captureException } from './sentry';


const { publicRuntimeConfig } = getConfig();

export default withApollo(({ ctx, headers, initialState }) => {
  const client = new ApolloClient({
    ssrMode: !process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            if (process.env.NODE_ENV !== 'production')
              console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          });
          captureException(graphQLErrors[0]);
        }
        if (networkError) {
          if (process.env.NODE_ENV !== 'production')
            console.error(`[Network error]: ${networkError}`);
          captureException(networkError);
        }
      }),
      new HttpLink({
        uri: `${publicRuntimeConfig.aplansApiBaseURL}/graphql/`,
        credentials: 'same-origin',
      }),
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  });
  return client;
}, {});
