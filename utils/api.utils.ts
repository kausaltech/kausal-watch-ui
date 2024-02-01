import { ApolloQueryResult } from '@apollo/client';

type FailedRequest = {
  error: Error;
  data: undefined;
};

/**
 * Simple wrapper to wrap queries in a try/catch block and return errors
 * which conform with Apollo query response.
 */
export async function tryRequest<T>(
  request: Promise<ApolloQueryResult<T>>
): Promise<ApolloQueryResult<T> | FailedRequest> {
  try {
    const response = await request;

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error, data: undefined };
    }

    return {
      error: new Error(
        typeof error === 'string' ? error : 'Unknown error occurred'
      ),
      data: undefined,
    };
  }
}
