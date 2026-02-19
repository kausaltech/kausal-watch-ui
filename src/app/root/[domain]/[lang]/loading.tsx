import { useTranslations } from 'next-intl';

import ContentLoader from '@common/components/ContentLoader';

// Loading state of the site root layout
// Visible before anything else
// TODO: Could include a rough skeleton of the nav layout
export default function Loading() {
  const t = useTranslations();
  return <ContentLoader initiallyVisible fullPage message={t('loading')} />;
}
