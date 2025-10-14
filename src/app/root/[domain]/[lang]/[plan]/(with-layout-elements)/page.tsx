import { ErrorPage } from '@/components/common/ErrorPage';
import { getHomePage } from '@/queries/get-home-page';
import { tryRequest } from '@/utils/api.utils';

import { RootPage } from './RootPage';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export default async function PlanPage(props: Props) {
  const params = await props.params;
  const { data, error } = await tryRequest(getHomePage(params.plan));

  if (error || !data) {
    return <ErrorPage message={error?.message} />;
  }

  return <RootPage data={data} testId="home-page" />;
}
