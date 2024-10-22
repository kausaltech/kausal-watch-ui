import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { InsightPage } from './InsightPage';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('indicators'),
  };
}

export default function Page() {
  return <InsightPage />;
}
