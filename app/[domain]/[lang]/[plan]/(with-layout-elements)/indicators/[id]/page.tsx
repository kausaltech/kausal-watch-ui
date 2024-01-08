import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, plan } = params;

  if (!isValidIndicatorId(id)) {
    return notFound();
  }

  const { data } = await getIndicatorDetails(plan, id);

  if (!data.indicator) {
    return {};
  }

  const resolvedParent = await parent;
  const { name } = data.indicator;

  return {
    title: `${name} | ${resolvedParent.title?.absolute}`,
    openGraph: {
      title: `${name} | ${resolvedParent.openGraph?.title?.absolute}`,
      url: resolvedParent.openGraph?.url ?? undefined,
    },
  };
}

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
