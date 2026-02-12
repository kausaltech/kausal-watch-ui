import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import PledgeFooter from '@/components/pledge/PledgeFooter';
import PledgeHeader from '@/components/pledge/PledgeHeader';
import { getPledgeFeatureEnabled } from '@/queries/get-pledges';

type Props = {
  params: Promise<{ plan: string }>;
  children: ReactNode;
};

/**
 * Route group layout for pledge pages with simplified header and footer.
 * The header logo links to the pledge list view and includes a single navigation item
 * linking to the main action plan.
 *
 * Community engagement (pledges) must be enabled in the plan's feature flags.
 */
export default async function PledgeLayout({ params, children }: Props) {
  const { plan: planId } = await params;

  const { data } = await getPledgeFeatureEnabled(planId);
  const isEnabled = data?.plan?.features?.enableCommunityEngagement ?? false;

  if (!isEnabled) {
    notFound();
  }

  return (
    <>
      <PledgeHeader />
      <main id="main" data-testid="pledge-layout">
        {children}
      </main>
      <PledgeFooter />
    </>
  );
}
