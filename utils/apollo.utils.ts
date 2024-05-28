import { ApolloLink, HttpLink, Operation } from '@apollo/client';
import {
  gqlUrl,
  isLocal,
  isServer,
  logGraphqlQueries,
} from '@/common/environment';
import { API_PROXY_PATH } from '@/constants/routes';
import { onError } from '@apollo/client/link/error';
import { captureException } from '@sentry/nextjs';
import { getLogger } from '@/common/log';

const logger = getLogger('graphql');

/**
 * The current locale is passed to Apollo links as context,
 * allowing us to inject the "@locale" directive in all queries.
 */
declare module '@apollo/client' {
  export interface DefaultContext {
    locale?: string;
    planIdentifier?: string;
    planDomain?: string;
    wildcardDomains?: string[];
    sessionToken?: string;
    start?: number;
  }
}

function logError(
  operation: Operation,
  message: string,
  error: unknown,
  sentryExtras: { [key: string]: unknown }
) {
  const logContext = {
    operation: operation.operationName,
  };
  logger.error(
    { logContext, error },
    `An error occurred while querying: ${message}`
  );
  captureException(message, {
    extra: {
      query: operation.query,
      operationName: operation.operationName,
      variables: JSON.stringify(operation.variables, null, 2),
      ...sentryExtras,
    },
  });
}

export const errorLink = onError(
  ({ networkError, graphQLErrors, operation }) => {
    if (networkError) {
      logError(operation, networkError.message, networkError, {
        cause: networkError.cause,
        name: networkError.name,
      });
    }

    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        logError(operation, error.message, error, {
          errorPath: error.path,
        });
      });
    }
  }
);

export const operationStart = new ApolloLink((operation, forward) => {
  operation.setContext({ start: Date.now() });
  logger.info({ operation: operation.operationName }, 'Querying');
  return forward(operation);
});

export const operationEnd = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    const start = operation.getContext().start;
    if (!start) {
      return data;
    }
    const time = Math.round(Date.now() - start);
    logger.info(
      { operation: operation.operationName, duration: time / 1000 },
      `Operation took ${time}ms`
    );
    return data;
  });
});

/**
 * Log the outgoing GraphQL queries and variables server-side. Useful for debugging
 * purposes and enabled by setting the LOG_GRAPHQL_QUERIES env variable.
 */
function fetchWithLogging(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const body =
    typeof init.body === 'string' ? JSON.parse(init.body) : init.body;

  if (body) {
    console.log(
      `📡 ${new Date().toISOString().slice(-13)} 📡 Sending query ${
        body.operationName
      } with variables:\n${JSON.stringify(body.variables, null, 2)}\n\n${
        body.query
      }\n🎬 End of query ${body.operationName}\n`
    );
  }

  return fetch(input, init);
}

/**
 * We use a simple proxy to pass authentication headers to the GraphQL
 * API and to avoid CORS issues. The HttpLink uri must be an absolute URL,
 * so to support cases where we don't have access to the incoming request's
 * host (e.g. in the middleware Apollo Client), we fall back to interacting
 * with the backend GraphQL API directly.
 */
export const getHttpLink = () =>
  new HttpLink({
    uri: !isServer ? API_PROXY_PATH : gqlUrl,
    credentials: 'same-origin',
    fetchOptions: {
      mode: 'same-origin',
      next: { revalidate: 0 },
    },
    fetch: logGraphqlQueries ? fetchWithLogging : undefined,
  });

export const headersMiddleware = new ApolloLink((operation, forward) => {
  const context = operation.getContext();

  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        'x-cache-plan-domain': context.planDomain,
        'x-cache-plan-identifier': context.planIdentifier,
        'x-wildcard-domains': context.wildcardDomains,
      },
    };
  });

  return forward(operation);
});

/**
 * Automatically inject a "@locale" directive into the query object
 */
export const localeMiddleware = new ApolloLink((operation, forward) => {
  const context = operation.getContext();
  const { query } = operation;
  const { definitions } = query;
  const definition = definitions[0];
  const locale = context.locale;

  if (
    !locale ||
    definition.kind !== 'OperationDefinition' ||
    definition.operation !== 'query'
  ) {
    return forward(operation);
  }

  const localeDirective = {
    kind: 'Directive',
    name: {
      kind: 'Name',
      value: 'locale',
    },
    arguments: [
      {
        kind: 'Argument',
        name: { kind: 'Name', value: 'lang' },
        value: { kind: 'StringValue', value: locale, block: false },
      },
    ],
  };

  operation.query = {
    ...query,
    definitions: [
      {
        ...definition,
        directives: [...(definition.directives ?? []), localeDirective],
      },
      ...definitions.slice(1),
    ],
  };

  return forward(operation);
});
