import { notFound } from 'next/navigation';
import IndicatorList from '@/components/indicators/IndicatorList';
import { getIndicatorListPage } from '@/lib/queries/get-indicator-list-page';

type Props = {
  params: { plan: string };
};

export const dynamic = 'force-dynamic';

// <Meta title={data.planPage.title} />

export default async function ActionsPage({ params }: Props) {
  const { data } = await getIndicatorListPage(params.plan);

  if (data.planPage?.__typename !== 'IndicatorListPage') {
    return notFound();
  }

  return (
    <IndicatorList
      leadContent={data.planPage.leadContent}
      displayInsights={data.planPage.displayInsights}
    />
  );
}
