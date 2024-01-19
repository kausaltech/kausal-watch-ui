import { getHomePage } from '@/lib/queries/get-home-page';
import { RootPage } from '@/lib/components/RootPage';
import { ErrorPage } from '@/components/common/ErrorPage';

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
