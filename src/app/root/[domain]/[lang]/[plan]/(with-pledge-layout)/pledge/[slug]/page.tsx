import { notFound } from 'next/navigation';

import PledgeDetail from '@/components/pledge/PledgeDetail';
import { getPledge } from '@/queries/get-pledges';

type Props = {
  params: Promise<{ plan: string; lang: string; slug: string }>;
};

export default async function PledgeDetailPage({ params }: Props) {
  const { plan: planId, slug } = await params;

  const { data } = await getPledge(planId, slug);
  const pledge = data?.plan?.pledge;

  if (!pledge) {
    notFound();
  }

  return <PledgeDetail pledge={pledge} />;
}
