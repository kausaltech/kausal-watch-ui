import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { FeedbackPage } from './FeedbackPage';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('give-feedback'),
  };
}

export default function Page() {
  return <FeedbackPage />;
}
