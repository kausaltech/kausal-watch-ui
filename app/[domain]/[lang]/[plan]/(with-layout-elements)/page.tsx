import { getHomePage } from '@/queries/get-home-page';
import { ErrorPage } from '@/components/common/ErrorPage';
import { RootPage } from './RootPage';
import { tryRequest } from '@/utils/api.utils';
import { shouldIgnoreRequest } from '@/utils/middleware.utils';

type Props = {
  params: { plan: string; lang: string; domain: string };
};

export default async function PlanPage({ params }: Props) {
  if (shouldIgnoreRequest(params)) {
    return {};
  }

  const { data, error } = await tryRequest(getHomePage(params.plan));

  if (error || !data) {
    return <ErrorPage message={error?.message} />;
  }

  return <RootPage data={data} />;
}
