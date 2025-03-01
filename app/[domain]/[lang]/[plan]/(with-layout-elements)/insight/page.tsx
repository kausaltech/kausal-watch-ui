import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import InsightPage from './InsightPage';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('indicators'),
  };
}

export default function Page() {
  return <InsightPage />;
}
