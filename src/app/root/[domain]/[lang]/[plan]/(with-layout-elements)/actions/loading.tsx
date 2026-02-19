import { useTranslations } from 'next-intl';

import ContentLoader from '@common/components/ContentLoader';

// Action list page loading state
// TODO: We could skeleton filter area here?
export default function Loading() {
  const t = useTranslations();
  return <ContentLoader initiallyVisible fullPage message={t('loading')} />;
}
