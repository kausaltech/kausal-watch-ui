import { type ReactNode, Suspense } from 'react';

import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { act, renderHook } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import type { GetOutcomeNodeContentQuery } from '@/common/__generated__/paths/graphql';
import PathsApolloProvider, {
  usePathsApolloClient,
} from '@/components/providers/PathsApolloProvider';
import PathsPreloadProvider, {
  type PreloadedOutcomeNode,
  usePreloadedOutcomeNode,
} from '@/components/providers/PathsPreloadProvider';
import { GET_OUTCOME_NODE } from '@/queries/paths/get-paths-page';

const variables = { node: 'net_emissions', goal: 'net_emissions' };

// Only the fields the cache needs to store and read back the node
const outcomeNode = {
  __typename: 'Query',
  node: { __typename: 'Node', id: 'net_emissions', upstreamNodes: [] },
} as unknown as GetOutcomeNodeContentQuery;

/** Render a hook that suspends, and wait until it has rendered. */
async function renderSuspendingHook<Result>(
  hook: () => Result,
  wrapper: ReturnType<typeof makeWrapper>
) {
  let rendered: ReturnType<typeof renderHook<Result, unknown>> | undefined;
  await act(async () => {
    rendered = renderHook(hook, { wrapper });
    await Promise.resolve();
  });
  return rendered!.result;
}

function makeWrapper(preload: Promise<PreloadedOutcomeNode[]>) {
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

describe('usePreloadedOutcomeNode', () => {
  it('writes the preloaded data into the Paths client cache', async () => {
    const preload = Promise.resolve([{ variables, data: outcomeNode }]);

    const result = await renderSuspendingHook(
      () => ({ preloaded: usePreloadedOutcomeNode(variables), client: usePathsApolloClient() }),
      makeWrapper(preload)
    );

    expect(result.current.preloaded).toBe(true);
    const cached = result.current.client?.cache.readQuery<GetOutcomeNodeContentQuery>({
      query: GET_OUTCOME_NODE,
      variables,
      returnPartialData: true,
    });
    expect(cached?.node).toMatchObject({ id: 'net_emissions' });
  });

  it('reports data preloaded for other variables as not preloaded', async () => {
    const preload = Promise.resolve([{ variables, data: outcomeNode }]);

    const result = await renderSuspendingHook(
      () => usePreloadedOutcomeNode({ node: 'net_emissions', goal: 'other_goal' }),
      makeWrapper(preload)
    );

    expect(result.current).toBe(false);
  });
});
