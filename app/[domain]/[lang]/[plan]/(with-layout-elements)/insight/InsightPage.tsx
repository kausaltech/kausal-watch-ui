'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { usePlan } from '@/context/plan';
import { isValidIndicatorId } from '@/lib/utils/indicators';
import VisPage from './VisPage';

export function InsightPage() {
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
