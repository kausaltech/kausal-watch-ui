import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';

import { captureException } from 'common/sentry';
import { i18n } from 'common/i18n';

const { publicRuntimeConfig } = getConfig();

const localeMiddleware = new ApolloLink((operation, forward) => {
  // Inject @locale directive into the query root object
  const { query } = operation;
  const { definitions } = query;

  if (!i18n.language) return forward(operation);

  const localeDirective = {
    kind: 'Directive',
    name: {
      kind: 'Name',
      value: 'locale',
    },
    arguments: [{
      kind: 'Argument',
      name: { kind: 'Name', value: 'lang' },
      value: { kind: 'StringValue', value: i18n.language, block: false },
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

let requestContext;

const refererLink = new ApolloLink((operation, forward) => {
  if (requestContext) {
    operation.setContext((ctx) => {
      const { headers } = ctx;
      const { currentURL } = requestContext;
      const { baseURL, path } = currentURL;

      return {
        headers: {
          referer: baseURL + path,
          ...headers,
        },
      };
    });
  }
  return forward(operation);
});

export function setRequestContext(req) {
  requestContext = req;
}

const sentryHttpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const locationsStr = JSON.stringify(locations);
        if (process.env.NODE_ENV !== 'production')
          console.error(`[GraphQL error]: Message: ${message}, Location: ${locationsStr}, Path: ${path}`);
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

let apolloClient;

export default withApollo(({ initialState }) => {
  if (apolloClient) return apolloClient;

  const clientOpts = {
    ssrMode: !process.browser,
    link: ApolloLink.from([refererLink, localeMiddleware, sentryHttpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  };
  apolloClient = new ApolloClient(clientOpts);
  return apolloClient;
}, {
  getDataFromTree,
});
