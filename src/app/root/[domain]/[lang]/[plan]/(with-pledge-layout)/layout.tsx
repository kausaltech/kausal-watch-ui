'use client';

import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import styled from 'styled-components';

import PledgeFooter from '@/components/pledge/PledgeFooter';
import PledgeHeader from '@/components/pledge/PledgeHeader';

type Props = {
  params: Promise<{ domain: string }>;
  children: ReactNode;
};

const StyledMainWrapper = styled.div`
  min-height: 100vh;
`;

/**
 * Check if pledges feature is enabled.
 * TODO: Replace with plan.features.[WHATEVER] when backend support is added.
 */
function isPledgesEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_PLEDGES === 'true';
}

/**
 * Route group layout for pledge pages with simplified header and footer.
 * The header logo links to the pledge list view and includes a single navigation item
 * linking to the main action plan.
 *
 * Pledges must be enabled via the ENABLE_PLEDGES environment variable (until backend feature flag supports it).
 */
export default function PledgeLayout({ children }: Props) {
  if (!isPledgesEnabled()) {
    notFound();
  }

  return (
    <>
      <StyledMainWrapper>
        <PledgeHeader />
        <main id="main" data-testid="pledge-layout">
          {children}
        </main>
      </StyledMainWrapper>
      <PledgeFooter />
    </>
  );
}
