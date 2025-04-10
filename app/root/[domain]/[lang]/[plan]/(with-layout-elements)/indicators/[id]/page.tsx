import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { captureException } from '@sentry/nextjs';

import { getIndicatorDetails } from '@/queries/get-indicator';
import IndicatorContent from '@/components/indicators/IndicatorContent';
import { isValidIndicatorId } from '@/utils/indicators';
import { tryRequest } from '@/utils/api.utils';

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

  const { data } = await tryRequest(getIndicatorDetails(plan, id));

  if (!data?.indicator) {
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

export default async function IndicatorPage({ params }: Props) {
  const { id, plan, domain } = params;

  if (!isValidIndicatorId(id)) {
    return notFound();
  }

  const { data, error } = await tryRequest(getIndicatorDetails(plan, id));

  if (error || !data?.indicator) {
    if (error) {
      captureException(error, { extra: { id, plan, domain } });
    }

    return notFound();
  }

  return <IndicatorContent indicator={data.indicator} />;
}
