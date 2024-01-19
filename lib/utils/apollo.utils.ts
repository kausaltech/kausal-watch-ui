import { gqlUrl } from '@/common/environment';
import { ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { captureException } from '@sentry/nextjs';

export const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => captureException(error));
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
