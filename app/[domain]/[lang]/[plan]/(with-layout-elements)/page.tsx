import { getHomePage } from '@/queries/get-home-page';
import { ErrorPage } from '@/components/common/ErrorPage';
import { RootPage } from './RootPage';

type Props = {
  params: { plan: string; lang: string };
};

export default async function PlanPage({ params }: Props) {
  const { data, error } = await getHomePage(params.plan);

  if (error || !data) {
    return <ErrorPage message={error?.message} />;
  }

  return <RootPage data={data} />;
}
