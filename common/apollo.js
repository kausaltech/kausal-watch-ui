import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';

import { captureException } from './sentry';

const { publicRuntimeConfig } = getConfig();

const localeMiddleware = new ApolloLink((operation, forward) => {
  // Inject @locale directive into the query root object
  const { query } = operation;
  const { definitions } = query;

  const localeDirective = {
    kind: 'Directive',
    name: {
      kind: 'Name',
      value: 'locale',
    },
    arguments: [{
      kind: 'Argument',
      name: { kind: 'Name', value: 'lang' },
      value: { kind: 'StringValue', value: 'fi', block: false },
    }],
  };

  operation.query = {
    ...query,
    definitions: [{
      ...definitions[0],
      directives: [
        ...definitions[0].directives,
        localeDirective,
      ],
    }, ...definitions.slice(1)],
  };

  return forward(operation);
});

const sentryHttpLink = ApolloLink.from([
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
]);

export default withApollo(({ ctx, headers, initialState }) => {
  const client = new ApolloClient({
    ssrMode: !process.browser,
    link: concat(localeMiddleware, sentryHttpLink),
    cache: new InMemoryCache().restore(initialState || {}),
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
  return client;
}, {
  getDataFromTree,
});
