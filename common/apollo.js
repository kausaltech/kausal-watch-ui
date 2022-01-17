import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, ApolloLink, ApolloProvider, concat } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';

import { captureException, Sentry } from 'common/sentry';
import { i18n } from 'common/i18n';
import { possibleTypes } from 'components/common/StreamField';

const { publicRuntimeConfig } = getConfig();

const localeMiddleware = new ApolloLink((operation, forward) => {
  // Inject @locale directive into the query root object
  const { query } = operation;
  const { definitions } = query;

  if (!i18n || !i18n.language || definitions[0].operation === 'mutation') return forward(operation);

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

let globalRequestContext;
let globalPlanIdentifier;

export function setApolloPlanIdentifier(identifier) {
  globalPlanIdentifier = identifier;
}

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

    if (globalRequestContext) {
      const { req } = globalRequestContext;
      const { currentURL } = req;
      const { baseURL, path } = currentURL;
      const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      newHeaders.referer = baseURL + path;
      newHeaders['x-forwarded-for'] = remoteAddress;
    }
    if (ctx.planDomain) {
      newHeaders['x-cache-plan-domain'] = ctx.planDomain;
    }
    if (ctx.planIdentifier || globalPlanIdentifier) {
      newHeaders['x-cache-plan-identifier'] = ctx.planIdentifier || globalPlanIdentifier;
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

let globalApolloClient;

export function initializeApolloClient(opts) {
  const { ctx, initialState, planIdentifier } = opts;

  if (planIdentifier) {
    globalPlanIdentifier = planIdentifier;
  } else if (ctx?.req?.planIdentifier) {
    globalPlanIdentifier = ctx.req.planIdentifier;
  }
  if (ctx) globalRequestContext = ctx;

  if (globalApolloClient && process.browser) return globalApolloClient;

  const clientOpts = {
    ssrMode: !process.browser,
    link: ApolloLink.from([refererLink, localeMiddleware, sentryHttpLink]),
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      possibleTypes,
    }).restore(initialState || {}),
  };
  const apolloClient = new ApolloClient(clientOpts);
  if (process.browser) globalApolloClient = apolloClient;
  return apolloClient;
}

export default withApollo(
  (opts) => initializeApolloClient(opts),
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  },
);
