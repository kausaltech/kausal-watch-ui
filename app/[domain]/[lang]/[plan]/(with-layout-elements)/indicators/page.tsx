import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import IndicatorList from '@/components/indicators/IndicatorList';
import { getIndicatorListPage } from '@/queries/get-indicator-list-page';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('indicators'),
  };
}

export default async function ActionsPage(props: Props) {
  const params = await props.params;
  const { data } = await tryRequest(getIndicatorListPage(params.plan));

  if (data?.planPage?.__typename !== 'IndicatorListPage') {
    return notFound();
  }

  return (
    <IndicatorList
      leadContent={data.planPage.leadContent}
      displayInsights={data.planPage.displayInsights}
    />
  );
}
