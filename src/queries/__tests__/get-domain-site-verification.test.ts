import type { ApolloLink as ApolloLinkType } from '@apollo/client';
import type * as ApolloClientModule from '@apollo/client';
import { Kind } from 'graphql';
import type * as RxjsModule from 'rxjs';

import type * as ApolloUtilsModule from '@/utils/apollo.utils';

import { getDomainSiteVerification } from '../get-domain-site-verification';

const capturedOperations: ApolloLinkType.Operation[] = [];

/*
 * Replace only the terminating HTTP link, so the query runs through the real
 * client and the request it would have sent can be inspected.
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

/*
 * The RSC client stamps every request with the plan identifier and domain the
 * proxy resolved. The unpublished page resolves no plan identifier, so this
 * query must not use it.
 */
jest.mock('@/utils/apollo-rsc-client', () => ({
  getClient: () => {
    throw new Error('the plan-scoped RSC client must not be used for this query');
  },
}));

function lastOperation() {
  const operation = capturedOperations.at(-1);

  if (!operation) {
    throw new Error('The link chain did not forward the operation');
  }

  return operation;
}

describe('getDomainSiteVerification', () => {
  beforeEach(() => {
    capturedOperations.length = 0;
  });

  it('queries the hostname without going through the plan-scoped client', async () => {
    await expect(getDomainSiteVerification('example.com')).resolves.toMatchObject({
      data: { plansForHostname: [] },
    });

    const operation = lastOperation();

    expect(operation.variables).toEqual({ hostname: 'example.com' });
    expect(
      operation.query.definitions.find(
        (definition) => definition.kind === Kind.OPERATION_DEFINITION
      )?.name?.value
    ).toBe('DomainSiteVerification');
  });

  /*
   * The backend rejects a request that carries a plan cache header without a
   * plan the backend can resolve, which is exactly the case on the page this
   * query serves.
   */
  it('sends no plan cache headers', async () => {
    await getDomainSiteVerification('example.com');

    const context = lastOperation().getContext();
    const headers = (context.headers ?? {}) as Record<string, unknown>;

    expect(headers).not.toHaveProperty('x-cache-plan-identifier');
    expect(headers).not.toHaveProperty('x-cache-plan-domain');
    // The client must not be given a plan to put into those headers either.
    expect(context.planIdentifier).toBeUndefined();
    expect(context.planDomain).toBeUndefined();
  });
});
