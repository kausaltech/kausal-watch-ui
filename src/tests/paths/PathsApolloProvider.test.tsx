import type { ReactNode } from 'react';

import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';
import { parse } from 'graphql';
import { NextIntlClientProvider } from 'next-intl';
import { Observable } from 'rxjs';

import PathsApolloProvider, {
  usePathsApolloClient,
} from '@/components/providers/PathsApolloProvider';
import { usePathsMutation, usePathsQuery } from '@/utils/paths/hooks/usePathsApollo';

const GET_INSTANCE_NAME = parse(`
  query GetInstanceName {
    instance {
      id
      name
    }
  }
`);

const ACTIVATE_SCENARIO = parse(`
  mutation ActivateScenario($scenarioId: ID!) {
    activateScenario(id: $scenarioId) {
      ok
    }
  }
`);

/** Stands in for the Watch client from ApolloWrapper; fails any request. */
function makeWatchClient() {
  const watchLink = new ApolloLink(
    () =>
      new Observable((observer) => {
        observer.error(new Error('Request sent to the Watch API'));
      })
  );
  return new ApolloClient({ link: watchLink, cache: new InMemoryCache() });
}

function makeWrapper(instanceIdentifier: string | undefined, locale = 'en') {
  const watchClient = makeWatchClient();
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={{}}>
        <ApolloProvider client={watchClient}>
          <PathsApolloProvider instanceIdentifier={instanceIdentifier}>
            {children}
          </PathsApolloProvider>
        </ApolloProvider>
      </NextIntlClientProvider>
    );
  };
}

/** jsdom has no fetch, so install a stub that answers every request. */
function mockFetch() {
  const response = JSON.stringify({
    data: { instance: { __typename: 'InstanceType', id: 'zuerich', name: 'Zürich' } },
  });
  const fetchMock = jest.fn<typeof fetch>(async () =>
    Promise.resolve({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => (name.toLowerCase() === 'content-type' ? 'application/json' : null),
      },
      text: async () => Promise.resolve(response),
    } as unknown as Response)
  );
  globalThis.fetch = fetchMock;
  return fetchMock;
}

describe('PathsApolloProvider', () => {
  afterEach(() => {
    // @ts-expect-error -- remove the stub so jsdom is back to having no fetch
    delete globalThis.fetch;
  });

  it('sends queries to the Paths proxy with the instance and locale', async () => {
    const fetchMock = mockFetch();

    const { result } = renderHook(() => usePathsQuery(GET_INSTANCE_NAME), {
      wrapper: makeWrapper('zuerich', 'de'),
    });

    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.error).toBeUndefined();
    const [url, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(init?.body as string) as { variables: Record<string, unknown> };
    expect(url).toBe('/api/graphql-paths');
    expect(body.variables).toMatchObject({ _identifier: 'zuerich', _locale: 'de' });
  });

  it('skips queries and rejects mutations without a Paths instance', async () => {
    const fetchMock = mockFetch();

    const { result } = renderHook(
      () => ({
        query: usePathsQuery(GET_INSTANCE_NAME),
        mutation: usePathsMutation(ACTIVATE_SCENARIO),
      }),
      { wrapper: makeWrapper(undefined) }
    );

    expect(result.current.query.loading).toBe(false);
    expect(result.current.query.data).toBeUndefined();
    const [activateScenario] = result.current.mutation;
    await act(async () => {
      await expect(activateScenario({ variables: { scenarioId: 'custom' } })).rejects.toThrow(
        'No Paths instance for this plan'
      );
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('keeps one browser client per instance', () => {
    const first = renderHook(() => usePathsApolloClient(), { wrapper: makeWrapper('zuerich') });
    const second = renderHook(() => usePathsApolloClient(), { wrapper: makeWrapper('zuerich') });
    const other = renderHook(() => usePathsApolloClient(), { wrapper: makeWrapper('sunnydale') });

    expect(first.result.current).not.toBeNull();
    expect(second.result.current).toBe(first.result.current);
    expect(other.result.current).not.toBe(first.result.current);
  });

  it('replaces the browser client when the locale changes', () => {
    const german = renderHook(() => usePathsApolloClient(), {
      wrapper: makeWrapper('zuerich', 'de'),
    });
    const french = renderHook(() => usePathsApolloClient(), {
      wrapper: makeWrapper('zuerich', 'fr'),
    });

    // The cache does not tell languages apart, so a new locale needs a new cache
    expect(french.result.current).not.toBe(german.result.current);
    expect(french.result.current?.defaultContext.locale).toBe('fr');
  });
});
