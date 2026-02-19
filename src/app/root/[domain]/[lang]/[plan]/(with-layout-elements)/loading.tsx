import { useTranslations } from 'next-intl';

import ContentLoader from '@common/components/ContentLoader';

// Loading state of the pages initial content
// Prominently visible
export default function Loading() {
  const t = useTranslations();
  return <ContentLoader initiallyVisible fullPage message={t('loading')} />;
}
