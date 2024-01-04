import { getHomePage } from '@/lib/queries/get-home-page';
import { RootPage } from '@/lib/components/RootPage';

type Props = {
  params: { plan: string; lang: string };
};

export const dynamic = 'force-dynamic';

export default async function PlanPage({ params }: Props) {
  const { data } = await getHomePage(params.plan);

  return <RootPage data={data} />;
}
