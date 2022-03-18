import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, ApolloLink, ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';

import { captureException, Sentry } from 'common/sentry';
import { getI18n } from 'common/i18n';
import { possibleTypes } from 'components/common/StreamField';

const { publicRuntimeConfig } = getConfig();

const GRAPHQL_ENDPOINT_URI = `${publicRuntimeConfig.aplansApiBaseURL}/graphql/`;

let globalRequestContext;
let globalPlanIdentifier;

const localeMiddleware = new ApolloLink((operation, forward) => {
  // Inject @locale directive into the query root object
  const { query } = operation;
  const { definitions } = query;
  const operationName = definitions?.[0].name.value;
  const i18n = getI18n();
  const locale = i18n ? i18n.language : publicRuntimeConfig.locale;

  if (!locale || definitions[0].operation === 'mutation') {
    console.log(`no language for query: ${operationName}`);
    return forward(operation);
  }

  const localeDirective = {
    kind: 'Directive',
    name: {
      kind: 'Name',
      value: 'locale',
    },
    arguments: [{
      kind: 'Argument',
      name: { kind: 'Name', value: 'lang' },
      value: { kind: 'StringValue', value: locale, block: false },
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

export function setApolloPlanIdentifier(identifier) {
  globalPlanIdentifier = identifier;
}

const refererLink = new ApolloLink((operation, forward) => {
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
  return forward(operation);
});

const sentryTracingLink = new ApolloLink((operation, forward) => {
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

  return forward(operation).map((result) => {
    if (tracingSpan) tracingSpan.finish();
    sentryHub.popScope();
    return result;
  });
});

const sentryErrorLink = onError(({ graphQLErrors, networkError }) => {
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
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT_URI,
  credentials: 'same-origin',
});

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
    link: ApolloLink.from([refererLink, localeMiddleware, refererLink, sentryTracingLink, sentryErrorLink, httpLink]),
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
    getDataFromTree,
  },
);
