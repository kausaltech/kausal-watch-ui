import { type ReactNode, Suspense } from 'react';

import { ApolloClient, ApolloLink, InMemoryCache, NetworkStatus } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { parse } from 'graphql';
import { NextIntlClientProvider } from 'next-intl';

import PathsApolloProvider from '@/components/providers/PathsApolloProvider';
import PathsPreloadProvider from '@/components/providers/PathsPreloadProvider';
import { usePreloadedPathsQuery } from '@/utils/paths/hooks/usePathsApollo';
import { pathsSessionVersionVar } from '@/utils/paths/paths-session';
import { getPreloadKey } from '@/utils/paths/preload-key';
import type { PathsPreloadedQueries } from '@/utils/paths/preload-paths-queries';

const GET_NODE = parse(`
  query TestNode($node: ID!) {
    node(id: $node) {
      id
      name
    }
  }
`);

type NodeQuery = { node: { __typename: 'Node'; id: string; name: string } | null };

const preloadedNode: NodeQuery = { node: { __typename: 'Node', id: 'heating', name: 'Preloaded' } };
const fetchedNode: NodeQuery = { node: { __typename: 'Node', id: 'heating', name: 'Fetched' } };

/** jsdom has no fetch, so install a stub that answers every request. */
function mockFetch() {
  const fetchMock = jest.fn<Promise<Response>, Parameters<typeof fetch>>(async () =>
    Promise.resolve({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => (name.toLowerCase() === 'content-type' ? 'application/json' : null),
      },
      text: async () => Promise.resolve(JSON.stringify({ data: fetchedNode })),
    } as unknown as Response)
  );
  globalThis.fetch = fetchMock;
  return fetchMock;
}

function makeWrapper(preload: Promise<PathsPreloadedQueries>) {
  const watchClient = new ApolloClient({ link: ApolloLink.empty(), cache: new InMemoryCache() });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale="en" messages={{}}>
        <ApolloProvider client={watchClient}>
          <PathsApolloProvider instanceIdentifier="patchenstein">
            <PathsPreloadProvider preload={preload}>
              <Suspense fallback={null}>{children}</Suspense>
            </PathsPreloadProvider>
          </PathsApolloProvider>
        </ApolloProvider>
      </NextIntlClientProvider>
    );
  };
}

/** Render the hook, which suspends for preloaded data, and wait until it has rendered. */
async function renderQuery(preloadedVariables: { node: string }, variables: { node: string }) {
  const preload = Promise.resolve({
    [getPreloadKey(GET_NODE, preloadedVariables)]: Promise.resolve(preloadedNode),
  });
  let rendered: ReturnType<typeof renderHook<ReturnType<typeof useNodeQuery>, unknown>>;
  function useNodeQuery() {
    return usePreloadedPathsQuery<NodeQuery, { node: string }>(GET_NODE, {
      variables,
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    });
  }
  await act(async () => {
    rendered = renderHook(useNodeQuery, { wrapper: makeWrapper(preload) });
    await Promise.resolve();
  });
  return rendered!.result;
}

describe('usePreloadedPathsQuery', () => {
  let fetchMock: ReturnType<typeof mockFetch>;

  beforeEach(() => {
    fetchMock = mockFetch();
  });

  afterEach(() => {
    // @ts-expect-error -- remove the stub so jsdom is back to having no fetch
    delete globalThis.fetch;
    pathsSessionVersionVar(0);
  });

  it('returns the preloaded data without fetching', async () => {
    const result = await renderQuery({ node: 'heating' }, { node: 'heating' });

    expect(result.current.data).toEqual(preloadedNode);
    expect(result.current.loading).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fetches as usual when the variables were not preloaded', async () => {
    const result = await renderQuery({ node: 'transport' }, { node: 'heating' });

    await waitFor(() => expect(result.current.data).toEqual(fetchedNode));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('refetches once the Paths session changes, showing the preloaded data meanwhile', async () => {
    const result = await renderQuery({ node: 'heating' }, { node: 'heating' });

    act(() => {
      pathsSessionVersionVar(pathsSessionVersionVar() + 1);
    });

    expect(result.current.data).toEqual(preloadedNode);
    expect(result.current.networkStatus).toBe(NetworkStatus.refetch);
    await waitFor(() => expect(result.current.data).toEqual(fetchedNode));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
