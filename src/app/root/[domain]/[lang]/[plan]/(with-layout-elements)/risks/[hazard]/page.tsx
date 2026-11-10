import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import HazardDetail from '@/adaptation/components/HazardDetail';
import { getAdaptationData } from '@/adaptation/get-adaptation-data';
import ErrorPage from '@/components/common/ErrorPage';

type Props = {
  params: Promise<{ plan: string; lang: string; hazard: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { plan, lang, hazard: slug } = await props.params;
  const result = await getAdaptationData(plan);
  if (result.status !== 'ok') return {};
  const hazard = result.data.hazards.find((h) => h.slug === slug);
  if (!hazard) return {};
  const t = await getTranslations({ locale: lang });
  return { title: `${t(`adaptation-hazard-${hazard.key}`)} | ${t('adaptation-nav-label')}` };
}

export default async function HazardPage(props: Props) {
  const { plan, lang, hazard: slug } = await props.params;
  const result = await getAdaptationData(plan);

  if (result.status === 'disabled') notFound();
  if (result.status === 'unavailable') {
    const t = await getTranslations({ locale: lang });
    return <ErrorPage message={t('adaptation-unavailable')} testId="adaptation-unavailable" />;
  }

  const { data } = result;
  const hazard = data.hazards.find((h) => h.slug === slug);
  if (!hazard) notFound();

  return (
    <HazardDetail
      hazard={hazard}
      measures={data.measures.filter((measure) => measure.hazards.includes(hazard.key))}
      linkedActions={data.linkedActions[hazard.key] ?? []}
      // Flood zones are the only hazard geometry the map draws
      map={hazard.key === 'flood' ? data.map : null}
      mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN || null}
    />
  );
}
