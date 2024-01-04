import React from 'react';
import { notFound } from 'next/navigation';
import { getIndicatorDetails } from '@/lib/queries/get-indicator';
import IndicatorContent from '@/components/indicators/IndicatorContent';
import { isValidIndicatorId } from '@/lib/utils/indicators';

type Props = {
  params: {
    id: string;
    plan: string;
    domain: string;
  };
};

/* 
      <Meta title={indicator.name} />
/> */

// TODO: Indicator 404, error and loading
export default async function IndicatorPage({ params }: Props) {
  const { id, plan } = params;

  if (!isValidIndicatorId(id)) {
    return notFound();
  }

  const { data } = await getIndicatorDetails(plan, id);

  if (!data.indicator) {
    return notFound();
  }

  return <IndicatorContent indicator={data.indicator} />;
}
