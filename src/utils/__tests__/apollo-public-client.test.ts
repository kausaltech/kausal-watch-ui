import type { ApolloLink as ApolloLinkType } from '@apollo/client';
import { gql } from '@apollo/client';
import type * as ApolloClientModule from '@apollo/client';
import type * as RxjsModule from 'rxjs';

import type * as ApolloUtilsModule from '@/utils/apollo.utils';

import { createPlanAgnosticApolloClient } from '../apollo-public-client';

const capturedOperations: ApolloLinkType.Operation[] = [];

/*
 * Replace the terminating HTTP link so the assembled link chain can be
 * inspected without a network request. Everything above it — the error link,
 * the Sentry link and the operation logging — is the real thing.
 */
jest.mock('@/utils/apollo.utils', () => {
  const actual = jest.requireActual<typeof ApolloUtilsModule>('@/utils/apollo.utils');
  const { ApolloLink } = jest.requireActual<typeof ApolloClientModule>('@apollo/client');
  const { Observable } = jest.requireActual<typeof RxjsModule>('rxjs');

  return {
    ...actual,
    getHttpLink: () =>
      new ApolloLink((operation: ApolloLinkType.Operation) => {
        capturedOperations.push(operation);

        return new Observable<ApolloLinkType.Result>((observer) => {
          observer.next({ data: { plansForHostname: [] } });
          observer.complete();
        });
      }),
  };
});

const TEST_QUERY = gql`
  query TestPlanAgnostic($hostname: String!) {
    plansForHostname(hostname: $hostname) {
      __typename
    }
  }
`;

async function runTestQuery() {
  const client = createPlanAgnosticApolloClient();

  await client.query({
    query: TEST_QUERY,
    variables: { hostname: 'example.com' },
    fetchPolicy: 'no-cache',
  });

  const operation = capturedOperations.at(-1);

  if (!operation) {
    throw new Error('The link chain did not forward the operation');
  }

  return operation;
}

describe('createPlanAgnosticApolloClient', () => {
  beforeEach(() => {
    capturedOperations.length = 0;
  });

  /*
   * The plan cache headers name a plan the backend can resolve. A query scoped
   * to a hostname has no plan, and a request that carries the headers without
   * one is rejected outright, so this client must never send them.
   */
  it('sends no plan cache headers', async () => {
    const operation = await runTestQuery();
    const headers = (operation.getContext().headers ?? {}) as Record<string, unknown>;

    expect(headers).not.toHaveProperty('x-cache-plan-identifier');
    expect(headers).not.toHaveProperty('x-cache-plan-domain');
  });

  it('sends no authorization header', async () => {
    const operation = await runTestQuery();
    const headers = (operation.getContext().headers ?? {}) as Record<string, unknown>;

    expect(headers).not.toHaveProperty('Authorization');
  });

  it('forwards the operation with its variables intact', async () => {
    const operation = await runTestQuery();

    expect(operation.operationName).toBe('TestPlanAgnostic');
    expect(operation.variables).toEqual({ hostname: 'example.com' });
  });
});
