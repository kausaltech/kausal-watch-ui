import type { ReactNode } from 'react';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import PathsApolloProvider from '@/components/providers/PathsApolloProvider';
import PathsProvider from '@/components/providers/PathsProvider';

type Props = {
  /** From `getPathsData`, started by the layout so it loads alongside the theme */
  pathsData: Promise<GetInstanceContextQuery | undefined>;
  children: ReactNode;
};

/** The plan's Paths instance context and Apollo client, empty for plans without a model */
export default async function PathsPlanProviders({ pathsData, children }: Props) {
  const instance = await pathsData;
  return (
    <PathsProvider instance={instance}>
      <PathsApolloProvider instanceIdentifier={instance?.instance.id}>
        {children}
      </PathsApolloProvider>
    </PathsProvider>
  );
}
