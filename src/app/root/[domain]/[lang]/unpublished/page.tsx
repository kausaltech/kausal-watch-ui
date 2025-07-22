import type { Metadata } from 'next';

import UnpublishedPlan from '@/components/plans/UnpublishedPlan';

type Props = {
  searchParams: Promise<{
    message: string;
    loginEnabled: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Kausal Watch',
  robots: 'noindex',
};

export default async function UnpublishedPage(props: Props) {
  const searchParams = await props.searchParams;
  const loginEnabled = searchParams.loginEnabled === 'true';
  const message = searchParams.message;
  return <UnpublishedPlan message={message} loginEnabled={loginEnabled} />;
}
