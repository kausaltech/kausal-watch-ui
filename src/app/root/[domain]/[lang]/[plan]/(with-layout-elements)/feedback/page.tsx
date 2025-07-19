import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { FeedbackPage } from './FeedbackPage';

type Props = {
  params: {
    lang: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('give-feedback'),
  };
}

export default function Page() {
  return <FeedbackPage />;
}
