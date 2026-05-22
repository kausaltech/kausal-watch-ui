import { ApolloLink, gql } from '@apollo/client';
import { describe, expect, it } from '@jest/globals';
import { type DocumentNode, print } from 'graphql';
import { Observable } from 'rxjs';

import { localeMiddleware } from '@/utils/apollo.utils';
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
      query TestPlan {
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
      query TestPlan {
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
