import type { ApolloClient } from '@apollo/client';
import { captureException } from '@sentry/nextjs';

type FailedRequest = {
  error: Error;
  data: undefined;
};

/**
 * Simple wrapper to wrap queries in a try/catch block and return errors
 * which conform with Apollo query response. Thrown errors are captured to
 * Sentry, since callers typically convert failures into a 404 and would
 * otherwise leave no trace of the underlying error.
 */
export async function tryRequest<T>(
  request: Promise<ApolloClient.QueryResult<T>>,
  errorContext?: Record<string, unknown>
): Promise<ApolloClient.QueryResult<T> | FailedRequest> {
  try {
    const response = await request;

    return response;
  } catch (error: unknown) {
    const wrappedError =
      error instanceof Error
        ? error
        : new Error(typeof error === 'string' ? error : 'Unknown error occurred');

    captureException(wrappedError, errorContext ? { extra: errorContext } : undefined);

    return { error: wrappedError, data: undefined };
  }
}
