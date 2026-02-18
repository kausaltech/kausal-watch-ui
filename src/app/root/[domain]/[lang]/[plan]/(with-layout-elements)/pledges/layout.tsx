import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { getPledgeFeatureEnabled } from '@/queries/get-pledges';

type Props = {
  params: Promise<{ plan: string }>;
  children: ReactNode;
};

export default async function PledgeLayout({ params, children }: Props) {
  const { plan: planId } = await params;

  const { data } = await getPledgeFeatureEnabled(planId);
  const isEnabled = data?.plan?.features?.enableCommunityEngagement ?? false;

  if (!isEnabled) {
    notFound();
  }

  return children;
}
