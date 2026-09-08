import { ApolloLink, gql } from '@apollo/client';
import { describe, expect, it } from '@jest/globals';
import { type DocumentNode, print } from 'graphql';
import { Observable } from 'rxjs';

import { headersMiddleware, localeMiddleware } from '@/utils/apollo.utils';
import { makeInstanceMiddleware } from '@/utils/paths/paths.utils';

async function executeAndCaptureQuery(
  link: ApolloLink,
  query: DocumentNode,
  context: Record<string, unknown>
) {
  let capturedQuery: DocumentNode | undefined;
  const captureLink = new ApolloLink((operation) => {
    capturedQuery = operation.query;
    return new Observable<ApolloLink.Result>((observer) => {
      observer.next({ data: {} });
      observer.complete();
    });
  });

  await new Promise<void>((resolve, reject) => {
    ApolloLink.execute(
      ApolloLink.from([link, captureLink]),
      { query, context },
      { client: {} as never }
    ).subscribe({
      complete: resolve,
      error: reject,
    });
  });

  if (!capturedQuery) {
    throw new Error('Apollo link chain did not forward the operation');
  }

  return capturedQuery;
}

async function executeTwiceAndPrint(
  link: ApolloLink,
  query: DocumentNode,
  context: Record<string, unknown>
) {
  const once = await executeAndCaptureQuery(link, query, context);
  const twice = await executeAndCaptureQuery(link, once, context);
  return print(twice);
}

function countDirective(query: string, name: string) {
  return query.match(new RegExp(`@${name}\\b`, 'g'))?.length ?? 0;
}

describe('Apollo directive middleware', () => {
  it('adds locale directive only once when processing the same query twice', async () => {
    const query = gql`
      query TestPlanLocale {
        plan(id: "test") {
          id
        }
      }
    `;

    const printedQuery = await executeTwiceAndPrint(localeMiddleware, query, { locale: 'fi' });

    expect(countDirective(printedQuery, 'locale')).toBe(1);
  });

  it('adds instance and locale directives only once when processing the same query twice', async () => {
    const query = gql`
      query TestPlanInstanceAndLocale {
        plan(id: "test") {
          id
        }
      }
    `;
    const middleware = makeInstanceMiddleware({ instanceIdentifier: 'test-plan' });

    const printedQuery = await executeTwiceAndPrint(middleware, query, { locale: 'fi' });

    expect(countDirective(printedQuery, 'instance')).toBe(1);
    expect(countDirective(printedQuery, 'locale')).toBe(1);
  });
});

async function executeAndCaptureHeaders(link: ApolloLink, context: Record<string, unknown>) {
  const query = gql`
    query TestCacheHeaders {
      plan(id: "test") {
        id
      }
    }
  `;

  let capturedHeaders: Record<string, unknown> | undefined;
  const captureLink = new ApolloLink((operation) => {
    capturedHeaders = operation.getContext().headers;
    return new Observable<ApolloLink.Result>((observer) => {
      observer.next({ data: {} });
      observer.complete();
    });
  });

  await new Promise<void>((resolve, reject) => {
    ApolloLink.execute(
      ApolloLink.from([link, captureLink]),
      { query, context },
      { client: {} as never }
    ).subscribe({
      complete: resolve,
      error: reject,
    });
  });

  return capturedHeaders ?? {};
}

describe('headersMiddleware', () => {
  it('forwards the plan cache headers when the context has a plan', async () => {
    const headers = await executeAndCaptureHeaders(headersMiddleware, {
      planIdentifier: 'test-plan',
      planDomain: 'plan.example.com',
    });

    expect(headers).toMatchObject({
      'x-cache-plan-identifier': 'test-plan',
      'x-cache-plan-domain': 'plan.example.com',
    });
  });

  /*
   * Pages served in place of a restricted plan have no plan identifier, and the
   * backend rejects a request that carries the header with an empty or
   * placeholder value. The header has to be left out entirely instead.
   */
  it('omits the plan cache headers when the context has no plan', async () => {
    const headers = await executeAndCaptureHeaders(headersMiddleware, {});

    expect(headers).not.toHaveProperty('x-cache-plan-identifier');
    expect(headers).not.toHaveProperty('x-cache-plan-domain');
  });

  it('keeps unrelated headers set further up the chain', async () => {
    const headers = await executeAndCaptureHeaders(headersMiddleware, {
      headers: { 'x-custom': 'kept' },
    });

    expect(headers).toMatchObject({ 'x-custom': 'kept' });
    expect(headers).not.toHaveProperty('x-cache-plan-identifier');
  });
});
