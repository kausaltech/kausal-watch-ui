import { getHomePage } from '@/queries/get-home-page';
import { ErrorPage } from '@/components/common/ErrorPage';
import { RootPage } from './RootPage';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export default async function PlanPage(props: Props) {
  const params = await props.params;
  const { data, error } = await tryRequest(getHomePage(params.plan));

  if (error || !data) {
    return <ErrorPage message={error?.message} />;
  }

  return <RootPage data={data} />;
}
