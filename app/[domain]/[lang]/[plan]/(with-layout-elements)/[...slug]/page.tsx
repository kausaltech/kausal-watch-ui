import { getContentPage } from '@/lib/queries/get-content-page';
import { notFound } from 'next/navigation';
import React from 'react';
import { Content } from './ContentPage';

type Props = {
  params: { slug: string[]; plan: string };
};

/*
      <Meta
        title={`${title}`}
        shareImageUrl={imageUrl}
        description={`${page.searchDescription || title}`}
      />
*/

export default async function ContentPage({ params }: Props) {
  const { slug, plan } = params;
  const path = `/${slug.join('/')}`;

  const { data } = await getContentPage(plan, path);

  if (!data.planPage) {
    return notFound();
  }

  return <Content page={data.planPage} />;
}
