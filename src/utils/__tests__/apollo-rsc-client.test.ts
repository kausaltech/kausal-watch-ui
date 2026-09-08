/**
 * The Apollo Next.js integration pulls in `TransformStream`, which jsdom does
 * not provide, and `registerApolloClient` only exists in its `react-server`
 * build -- the same one Next.js loads for a server component.
 *
 * @jest-environment node
 * @jest-environment-options {"customExportConditions": ["react-server", "node"]}
 */
import type { ApolloLink as ApolloLinkType } from '@apollo/client';
import type * as ApolloClientModule from '@apollo/client';
import { gql } from '@apollo/client';
import type * as RxjsModule from 'rxjs';

import type * as ApolloUtilsModule from '@/utils/apollo.utils';

const capturedOperations: ApolloLinkType.Operation[] = [];
const incomingHeaders = new Headers();

/*
 * Replace the terminating HTTP link so the headers the client would put on the
 * wire can be inspected. Every link above it, `headersMiddleware` included, is
 * the real thing.
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
          observer.next({ data: { plan: null } });
          observer.complete();
        });
      }),
  };
});

jest.mock('next/headers', () => ({
  headers: () => Promise.resolve(incomingHeaders),
  cookies: () => Promise.resolve({ get: () => undefined }),
}));

jest.mock('@/config/auth', () => ({
  auth: () => Promise.resolve(null),
}));

const TEST_QUERY = gql`
  query TestRscCacheHeaders($id: ID!) {
    plan(id: $id) {
      id
    }
  }
`;

/*
 * `registerApolloClient` memoises the client per request, so the module is
 * re-imported for each case to pick up a different set of proxy headers.
 */
async function runQueryWithHeaders(headerEntries: Record<string, string>) {
  capturedOperations.length = 0;

  for (const key of [...incomingHeaders.keys()]) {
    incomingHeaders.delete(key);
  }

  for (const [key, value] of Object.entries(headerEntries)) {
    incomingHeaders.set(key, value);
  }

  jest.resetModules();

  const { getClient } = await import('../apollo-rsc-client');
  const client = await getClient();

  await client.query({
    query: TEST_QUERY,
    variables: { id: 'test-plan' },
    fetchPolicy: 'no-cache',
  });

  const operation = capturedOperations.at(-1);

  if (!operation) {
    throw new Error('The link chain did not forward the operation');
  }

  return (operation.getContext().headers ?? {}) as Record<string, unknown>;
}

describe('the RSC Apollo client', () => {
  /*
   * The backend scopes its response cache on these headers, so a request for a
   * plan the proxy resolved has to keep carrying them.
   */
  it('sends the plan cache headers when the proxy resolved a plan', async () => {
    const headers = await runQueryWithHeaders({
      'x-plan-identifier': 'test-plan',
      'x-plan-domain': 'plan.example.com',
    });

    expect(headers).toMatchObject({
      'x-cache-plan-identifier': 'test-plan',
      'x-cache-plan-domain': 'plan.example.com',
    });
  });

  /*
   * A restricted plan resolves no identifier, and the proxy leaves the header
   * out rather than sending a placeholder. The backend rejects a cache header
   * that names no resolvable plan, so it must not be sent at all.
   */
  it('omits the plan identifier cache header when the proxy resolved no plan', async () => {
    const headers = await runQueryWithHeaders({ 'x-plan-domain': 'plan.example.com' });

    expect(headers).not.toHaveProperty('x-cache-plan-identifier');
    expect(headers).toMatchObject({ 'x-cache-plan-domain': 'plan.example.com' });
  });
});
