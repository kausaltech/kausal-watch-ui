'use client';

import { type ReactNode, createContext, useContext, useMemo } from 'react';

import { pathsSessionVersionVar } from '@/utils/paths/paths-session';
import type { PathsPreloadedQueries } from '@/utils/paths/preload-paths-queries';

type PathsPreload = {
  queries: Promise<PathsPreloadedQueries>;
  /** The Paths session version the preloaded data belongs to. */
  sessionVersion: number;
};

const PathsPreloadContext = createContext<PathsPreload | null>(null);

export const usePathsPreload = () => useContext(PathsPreloadContext);

type Props = {
  /** Paths queries the page started on the server; never rejects. */
  preload: Promise<PathsPreloadedQueries>;
  children: ReactNode;
};

/**
 * Hands Paths data that a page fetched on the server to its Paths blocks,
 * which read it with `usePreloadedPathsQuery`.
 *
 * The page passes the promise without waiting for it, so the rest of the page
 * renders and streams while the Paths API computes the data.
 */
export default function PathsPreloadProvider({ preload, children }: Props) {
  // The server fetched the data for the session as it is now. Captured per
  // preload, as the provider stays mounted across client-side navigation.
  const value = useMemo(
    () => ({ queries: preload, sessionVersion: pathsSessionVersionVar() }),
    [preload]
  );
  return <PathsPreloadContext.Provider value={value}>{children}</PathsPreloadContext.Provider>;
}
