import { getTranslations } from 'next-intl/server';

import ErrorPage from '@/components/common/ErrorPage';
import SettingsPanelVisibility from '@/components/paths/toolbar/SettingsPanelVisibility';
import PathsPreloadProvider from '@/components/providers/PathsPreloadProvider';
import { getHomePage } from '@/queries/get-home-page';
import { tryRequest } from '@/utils/api.utils';
import { pageShowsPathsSettings } from '@/utils/paths/paths-content';
import { preloadPathsBlocks } from '@/utils/paths/preload-paths-blocks';

import { RootPage } from './RootPage';

type Props = {
  params: Promise<{ domain: string; plan: string; lang: string }>;
};

export default async function PlanPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang });
  const { data, error } = await tryRequest(getHomePage(params.plan));

  if (error || !data) {
    return <ErrorPage message={t('error-loading-data')} details={error?.message} />;
  }

  // Not awaited: Paths blocks stream in when their data is ready
  const pathsPreload = preloadPathsBlocks(params.domain, params.plan, data.planPage);

  return (
    <PathsPreloadProvider preload={pathsPreload}>
      <SettingsPanelVisibility visible={!!data.planPage && pageShowsPathsSettings(data.planPage)} />
      <RootPage data={data} testId="home-page" />
    </PathsPreloadProvider>
  );
}
