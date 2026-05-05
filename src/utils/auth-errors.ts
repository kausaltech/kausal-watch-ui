import { CombinedGraphQLErrors } from '@apollo/client/errors';

export function hasUnauthenticatedErrors(error: unknown): boolean {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some((e) => e.extensions?.code === 'UNAUTHENTICATED');
  }
  return false;
}
