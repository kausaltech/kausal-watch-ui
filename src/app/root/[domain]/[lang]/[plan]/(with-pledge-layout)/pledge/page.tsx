import { notFound } from 'next/navigation';

import { getBgImageAlignment } from '@/common/images';
import HeroFullImage from '@/components/home/HeroFullImage';
import PledgeList from '@/components/pledge/PledgeList';
import { getPledges } from '@/queries/get-pledges';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export default async function PledgeListPage({ params }: Props) {
  const { plan: planId } = await params;

  const { data } = await getPledges(planId);
  const plan = data?.plan;
  const pledgeListPageConfig = plan?.pages?.find((page) => page.__typename === 'PledgeListPage');

  if (!plan || !pledgeListPageConfig) {
    notFound();
  }

  const pledges = plan.pledges ?? [];
  const heroImage = pledgeListPageConfig.backgroundImage;
  const heroTitle = pledgeListPageConfig.title;
  const heroLead = pledgeListPageConfig.leadContent ?? undefined;
  const imageAlign = heroImage ? getBgImageAlignment(heroImage) : undefined;

  return (
    <>
      {!!heroImage?.large?.src && (
        <HeroFullImage
          title={heroTitle}
          lead={heroLead}
          bgImage={heroImage.large.src}
          imageAlign={imageAlign}
          altText={heroImage.altText}
          imageCredit={heroImage.imageCredit}
        />
      )}

      <PledgeList pledges={pledges} />
    </>
  );
}
