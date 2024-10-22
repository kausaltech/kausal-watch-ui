import {
  ApolloLink,
  HttpLink,
  type NextLink,
  type Operation,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { captureException } from '@sentry/nextjs';
import { SentryLink } from 'apollo-link-sentry';
import { type DirectiveNode, Kind } from 'graphql';
import type { BaseLogger, Bindings } from 'pino';

import {
  getWatchGraphQLUrl,
  isLocal,
  isProductionDeployment,
  isServer,
  logGraphqlQueries,
} from '@/common/environment';
import { nanoid } from '@/common/ids';
import { getLogger } from '@/common/log';
import { API_PROXY_PATH } from '@/constants/routes.mjs';

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
    logger?: BaseLogger;
  }
}

function logError(
  operation: Operation,
  message: string,
  error: unknown,
  sentryExtras: { [key: string]: unknown }
) {
  const opLogger = operation.getContext().logger ?? logger;
  opLogger.error({ error }, `An error occurred while querying: ${message}`);
  captureException(message, {
    extra: {
      query: operation.query,
      operationName: operation.operationName,
      variables: JSON.stringify(operation.variables, null, 2),
      ...sentryExtras,
    },
  });
}

const logErrorLink = onError(({ networkError, graphQLErrors, operation }) => {
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

const logOperation = new ApolloLink((operation, forward: NextLink) => {
  const { setContext, operationName } = operation;
  const queryId = nanoid(8);
  const opLogger = logger.child(
    { operation: operationName, queryId },
    { level: !isServer && isProductionDeployment() ? 'fatal' : 'info' }
  );
  setContext({ start: Date.now(), logger: opLogger });
  opLogger.info(`Starting GraphQL request ${operationName}`);
  return forward(operation).map((data) => {
    const now = Date.now();
    const start = operation.getContext().start;
    const durationMs = start ? Math.round(now - start) : null;
    const logContext: Bindings = {
      duration: durationMs,
    };
    const durationStr =
      durationMs != null ? `(took ${durationMs} ms)` : `<unknown duration>`;
    if (isLocal) {
      logContext.responseLength = JSON.stringify(data).length;
    }
    const nrErrors = data.errors?.length;
    if (nrErrors) {
      opLogger.error(
        { errorCount: nrErrors, ...logContext },
        `Operation finished with errors ${durationStr}`
      );
    } else {
      opLogger.info(
        logContext,
        `GraphQL request ${operationName} finished successfully ${durationStr}`
      );
    }
    return data;
  });
});

export const logOperationLink = ApolloLink.from([logOperation, logErrorLink]);

export function createSentryLink() {
  const uri = getWatchGraphQLUrl();
  const sentryLink = new SentryLink({
    uri,
    attachBreadcrumbs: {
      includeVariables: true,
    },
  });
  return sentryLink;
}

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
    uri: !isServer ? API_PROXY_PATH : getWatchGraphQLUrl(),
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
