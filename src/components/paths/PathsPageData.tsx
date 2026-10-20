import type { ReactNode } from 'react';

import { getRequestOrigin } from '@common/utils/request.server';

import SettingsPanelVisibility from '@/components/paths/toolbar/SettingsPanelVisibility';
import PathsPreloadProvider from '@/components/providers/PathsPreloadProvider';
import { getPlan } from '@/queries/get-plan';
import { tryRequest } from '@/utils/api.utils';
import { pageShowsPathsSettings } from '@/utils/paths/paths-content';
import { preloadPathsBlocks } from '@/utils/paths/preload-paths-blocks';

type Props = {
  domain: string;
  plan: string;
  page: Parameters<typeof preloadPathsBlocks>[2];
  children: ReactNode;
};

/**
 * The Paths data of a CMS page: preloads its Paths blocks, and tells the
 * settings panel whether it shows. Just the page for plans without a model.
 */
export default async function PathsPageData({ domain, plan, page, children }: Props) {
  // Cached for the request, the plan layout made this request already
  const { data } = await tryRequest(getPlan(domain, plan, await getRequestOrigin()));
  if (!data?.plan?.kausalPathsInstanceUuid || !page) return children;

  // Not awaited: Paths blocks stream in when their data is ready
  return (
    <PathsPreloadProvider preload={preloadPathsBlocks(domain, plan, page)}>
      <SettingsPanelVisibility visible={pageShowsPathsSettings(page)} />
      {children}
    </PathsPreloadProvider>
  );
}
