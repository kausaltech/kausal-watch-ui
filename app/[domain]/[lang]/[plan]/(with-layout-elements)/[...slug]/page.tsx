import { getContentPage } from '@/lib/queries/get-content-page';
import { notFound } from 'next/navigation';
import React from 'react';
import { Content } from './ContentPage';
import { Metadata, ResolvingMetadata } from 'next';
import { getMetaDescription, getMetaImage } from '@/lib/utils/metadata';

type Props = {
  params: { slug: string[]; plan: string };
};

const getPath = (slug: string[]) =>
  `/${slug.map(decodeURIComponent).join('/')}`;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, plan } = params;
  const path = getPath(slug);

  const { data } = await getContentPage(plan, path);

  if (!data.planPage) {
    return {};
  }

  const resolvedParent = await parent;
  const metaImage = getMetaImage(data.planPage);

  return {
    title: `${data.planPage.title} | ${resolvedParent.title?.absolute}`,
    description: getMetaDescription(data.planPage),
    openGraph: {
      title: `${data.planPage.title} | ${resolvedParent.openGraph?.title?.absolute}`,
      url: resolvedParent.openGraph?.url ?? undefined,
      images: metaImage ? [metaImage] : undefined,
    },
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug, plan } = params;
  const path = getPath(slug);

  const { data } = await getContentPage(plan, path);

  if (!data.planPage) {
    return notFound();
  }

  return <Content page={data.planPage} />;
}
