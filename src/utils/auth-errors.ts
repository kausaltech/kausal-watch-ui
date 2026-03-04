import { ApolloError } from '@apollo/client';

export function hasUnauthenticatedErrors(error: unknown): boolean {
  if (error instanceof ApolloError) {
    return error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHENTICATED');
  }
  return false;
}
