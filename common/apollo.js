import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';

import { captureException, Sentry } from 'common/sentry';
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
let planIdentifier;

const refererLink = new ApolloLink((operation, forward) => {
  const sentryHub = Sentry.getCurrentHub();
  const sentryScope = sentryHub.pushScope();
  const transaction = sentryScope.getTransaction();
  let tracingSpan;

  if (transaction) {
    tracingSpan = transaction.startChild({
      op: 'GraphQL query',
      description: operation.operationName,
      data: {
        graphql_variables: operation.variables,
      },
    });
  }

  sentryScope.setContext('graphql_variables', operation.variables);
  sentryScope.setTag('graphql_operation', operation.operationName);

  operation.setContext((ctx) => {
    const { headers } = ctx;
    const newHeaders = {};

    if (requestContext) {
      const req = requestContext;
      const { currentURL } = req;
      const { baseURL, path } = currentURL;
      const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      newHeaders.referer = baseURL + path;
      newHeaders['x-forwarded-for'] = remoteAddress;
    }
    if (ctx.planDomain) {
      newHeaders['x-cache-plan-domain'] = ctx.planDomain;
    }
    if (ctx.planIdentifier || planIdentifier) {
      newHeaders['x-cache-plan-identifier'] = ctx.planIdentifier || planIdentifier;
    }
    return {
      headers: {
        ...headers,
        ...newHeaders,
      },
    };
  });

  return forward(operation).map((result) => {
    if (tracingSpan) tracingSpan.finish();
    sentryHub.popScope();
    return result;
  });
});

export function setRequestContext(req) {
  requestContext = req;
}

export function setPlanIdentifier(identifier) {
  planIdentifier = identifier;
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

let cachedApolloClient;

export default withApollo(({ initialState }) => {
  if (cachedApolloClient && process.browser) return cachedApolloClient;

  const clientOpts = {
    ssrMode: !process.browser,
    link: ApolloLink.from([refererLink, localeMiddleware, sentryHttpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  };
  const apolloClient = new ApolloClient(clientOpts);
  if (process.browser) cachedApolloClient = apolloClient;
  return apolloClient;
}, {
  getDataFromTree,
});
