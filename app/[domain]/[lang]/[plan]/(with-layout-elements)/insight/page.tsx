'use client';

import { usePlan } from '@/context/plan';
import { useLocale } from 'next-intl';
import VisPage from './VisPage';
import { useRouter, useSearchParams } from 'next/navigation';
import { isValidIndicatorId } from '@/lib/utils/indicators';

/*
TODO: metadata

        <Meta
          title={`${t('indicators')}`}
          description="Toimenpiteiden edistymistä ja kasvihuonekaasupäästöjen kehitystä seurataan mittareilla"
        />
*/

export default function InsightPage() {
  const plan = usePlan();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterByIndicator = searchParams.get('indicator');

  return (
    <VisPage
      planId={plan.id}
      locale={locale}
      router={router}
      filters={{
        indicator:
          filterByIndicator && isValidIndicatorId(filterByIndicator)
            ? parseInt(filterByIndicator)
            : null,
      }}
    />
  );
}
