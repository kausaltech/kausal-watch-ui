import { gqlUrl } from '@/common/environment';
import { ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { captureException } from '@sentry/nextjs';

/**
 * The current locale is passed to Apollo links as context,
 * allowing us to inject the "@locale" directive in all queries.
 */
declare module '@apollo/client' {
  export interface DefaultContext {
    locale?: string;
  }
}

export const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) =>
      captureException(error, {
        extra: {
          ...error,
        },
      })
    );
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

export const httpLink = new HttpLink({
  uri: gqlUrl,
  fetchOptions: { next: { revalidate: 0 } },
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
