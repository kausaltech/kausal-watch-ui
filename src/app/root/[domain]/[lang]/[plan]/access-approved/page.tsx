import type { Metadata } from 'next';

import { PlanAccountWelcome } from '@/components/plans/access/AccountWelcome';

export const metadata: Metadata = {
  robots: 'noindex',
};

export default function AccountWelcomePage() {
  return <PlanAccountWelcome />;
}
