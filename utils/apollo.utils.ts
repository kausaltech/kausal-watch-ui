import { ApolloLink, HttpLink, Operation } from '@apollo/client';
import { gqlUrl, isLocal } from '@/common/environment';
import { API_PROXY_PATH } from '@/constants/routes';
import { onError } from '@apollo/client/link/error';
import { captureException } from '@sentry/nextjs';

/**
 * The current locale is passed to Apollo links as context,
 * allowing us to inject the "@locale" directive in all queries.
 */
declare module '@apollo/client' {
  export interface DefaultContext {
    locale?: string;
    planIdentifier?: string;
    planDomain?: string;
    start?: number;
  }
}

function logError(
  operation: Operation,
  message: string,
  error: unknown,
  sentryExtras: { [key: string]: unknown }
) {
  if (isLocal) {
    console.error(
      `An error occurred while querying ${operation.operationName}: ${message}`,
      error
    );
  }

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

  console.log(`  ⚙ Operation ${operation.operationName}...`);

  return forward(operation);
});

export const operationEnd = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    const start = operation.getContext().start;

    if (!start) {
      return data;
    }

    const time = Math.round(Date.now() - start);

    console.log(`  ⚙ Operation ${operation.operationName} took ${time}ms`);

    return data;
  });
});

/**
 * We use a simple proxy to pass authentication headers to the GraphQL
 * API and to avoid CORS issues. The HttpLink uri must be an absolute URL,
 * so to support cases where we don't have access to the incoming request's
 * host (e.g. in the middleware Apollo Client), we fall back to interacting
 * with the backend GraphQL API directly.
 */
export const getHttpLink = (proxyOrigin?: string) =>
  new HttpLink({
    uri: proxyOrigin ? `${proxyOrigin}${API_PROXY_PATH}` : gqlUrl,
    credentials: 'same-origin',
    fetchOptions: {
      mode: 'same-origin',
      next: { revalidate: 0 },
    },
  });

export const headersMiddleware = new ApolloLink((operation, forward) => {
  const context = operation.getContext();

  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        'x-cache-plan-domain': context.planDomain,
        'x-cache-plan-identifier': context.planIdentifier,
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
