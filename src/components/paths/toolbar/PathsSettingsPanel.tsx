import { getRequestOrigin } from '@common/utils/request.server';

import SettingsPanelFull from '@/components/paths/toolbar/SettingsPanelFull';
import PathsPreloadProvider from '@/components/providers/PathsPreloadProvider';
import { getPlan } from '@/queries/get-plan';
import { tryRequest } from '@/utils/api.utils';
import { preloadSettingsPanel } from '@/utils/paths/preload-settings-panel';

/** The Paths settings panel with its preloaded data. Nothing for plans without a model. */
export default async function PathsSettingsPanel({
  domain,
  plan,
}: {
  domain: string;
  plan: string;
}) {
  // Cached for the request, the plan layout made this request already
  const { data } = await tryRequest(getPlan(domain, plan, await getRequestOrigin()));
  if (!data?.plan?.kausalPathsInstanceUuid) return null;

  // Not awaited: the panel's Paths data streams in when it is ready
  return (
    <PathsPreloadProvider preload={preloadSettingsPanel(domain, plan)}>
      <SettingsPanelFull />
    </PathsPreloadProvider>
  );
}
