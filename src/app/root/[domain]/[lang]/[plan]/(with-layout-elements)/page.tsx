import { getTranslations } from 'next-intl/server';

import ErrorPage from '@/components/common/ErrorPage';
import PathsPageData from '@/components/paths/PathsPageData';
import { getHomePage } from '@/queries/get-home-page';
import { tryRequest } from '@/utils/api.utils';

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

  return (
    <PathsPageData domain={params.domain} plan={params.plan} page={data.planPage}>
      <RootPage data={data} testId="home-page" />
    </PathsPageData>
  );
}
