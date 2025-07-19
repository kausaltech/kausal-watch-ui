'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from 'next-intl';

import InsightPageContent from '@/components/graphs/InsightPageContent';
import { usePlan } from '@/context/plan';
import { isValidIndicatorId } from '@/utils/indicators';

function InsightPage() {
  const plan = usePlan();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterByIndicator = searchParams.get('indicator');

  return (
    <InsightPageContent
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

export default InsightPage;
