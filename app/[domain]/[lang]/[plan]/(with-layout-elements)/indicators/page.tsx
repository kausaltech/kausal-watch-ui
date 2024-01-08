import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import IndicatorList from '@/components/indicators/IndicatorList';
import { getIndicatorListPage } from '@/lib/queries/get-indicator-list-page';

type Props = {
  params: { plan: string; lang: string };
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('indicators'),
  };
}

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
