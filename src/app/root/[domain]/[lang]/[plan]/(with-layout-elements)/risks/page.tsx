import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import AdaptationLanding from '@/adaptation/components/AdaptationLanding';
import { getAdaptationGeoid } from '@/adaptation/config';
import { getAdaptationData } from '@/adaptation/get-adaptation-data';
import ErrorPage from '@/components/common/ErrorPage';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { plan, lang } = await props.params;
  if (!getAdaptationGeoid(plan)) return {};
  const t = await getTranslations({ locale: lang });
  return { title: t('adaptation-nav-label') };
}

export default async function AdaptationPage(props: Props) {
  const { plan, lang } = await props.params;
  const result = await getAdaptationData(plan);

  if (result.status === 'disabled') notFound();
  if (result.status === 'unavailable') {
    const t = await getTranslations({ locale: lang });
    return <ErrorPage message={t('adaptation-unavailable')} testId="adaptation-unavailable" />;
  }

  return (
    <AdaptationLanding
      data={result.data}
      mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN || null}
      now={new Date().toISOString()}
    />
  );
}
