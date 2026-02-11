import type { Operation } from '@apollo/client';
import { ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { captureException } from '@sentry/nextjs';
import { type DirectiveNode, OperationTypeNode } from 'graphql';
import { Kind } from 'graphql/language/kinds';

import type { DefaultApolloContext } from '@common/apollo';
import { WILDCARD_DOMAINS_HEADER } from '@common/constants/headers.mjs';
import { getWildcardDomains } from '@common/env';

import { gqlUrl, isLocal, isServer, logGraphqlQueries } from '@/common/environment';
import { API_PROXY_PATH } from '@/constants/routes';

/**
 * The current locale is passed to Apollo links as context,
 * allowing us to inject the "@locale" directive in all queries.
 */
declare module '@apollo/client' {
  export interface DefaultContext extends Partial<DefaultApolloContext> {
    locale?: string;
    planIdentifier?: string;
    planDomain?: string;
    sessionToken?: string;
    start?: number;
    bypassDomainCache?: boolean;
  }
}

function logError(
  operation: Operation,
  message: string,
  error: unknown,
  sentryExtras: { [key: string]: unknown }
) {
  if (isLocal) {
    console.error(`An error occurred while querying ${operation.operationName}: ${message}`, error);
  }

  captureException(message, {
    extra: {
      query: operation.query,
      operationName: operation.operationName,
      variables: JSON.stringify(operation.variables, null, 2),
      ...sentryExtras,
    },
    tags: {
      hostname: operation?.variables?.hostname,
    },
  });
}

export const errorLink = onError(({ networkError, graphQLErrors, operation }) => {
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
});

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
 * Log the outgoing GraphQL queries and variables server-side. Useful for debugging
 * purposes and enabled by setting the LOG_GRAPHQL_QUERIES env variable.
 */
function fetchWithLogging(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
  const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;

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
export function getHttpLink(noProxy?: boolean) {
  let shouldUseProxy = !isServer;

  if (noProxy) {
    shouldUseProxy = false;
  }

  return new HttpLink({
    uri: shouldUseProxy ? API_PROXY_PATH : gqlUrl,
    credentials: 'same-origin',
    fetchOptions: {
      mode: isServer || shouldUseProxy ? 'same-origin' : 'cors',
      next: { revalidate: 0 },
    },
    fetch: logGraphqlQueries ? fetchWithLogging : undefined,
    headers: {
      [WILDCARD_DOMAINS_HEADER]: getWildcardDomains().join(','),
    },
  });
}

export const headersMiddleware = new ApolloLink((operation, forward) => {
  const context = operation.getContext();

  if (!context.bypassDomainCache) {
    operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          'x-cache-plan-domain': context.planDomain,
          'x-cache-plan-identifier': context.planIdentifier,
        },
      };
    });
  }

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
    definition.kind !== Kind.OPERATION_DEFINITION ||
    definition.operation !== OperationTypeNode.QUERY
  ) {
    return forward(operation);
  }

  const localeDirective: DirectiveNode = {
    kind: Kind.DIRECTIVE,
    name: {
      kind: Kind.NAME,
      value: 'locale',
    },
    arguments: [
      {
        kind: Kind.ARGUMENT,
        name: { kind: Kind.NAME, value: 'lang' },
        value: { kind: Kind.STRING, value: locale, block: false },
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
