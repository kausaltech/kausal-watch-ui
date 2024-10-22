import { getContentPage } from '@/queries/get-content-page';
import { notFound } from 'next/navigation';
import React from 'react';
import { Content } from './ContentPage';
import { Metadata, ResolvingMetadata } from 'next';
import { getMetaDescription, getMetaImage } from '@/utils/metadata';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: Promise<{ slug: string[]; plan: string }>;
};

const getPath = (slug: string[]) =>
  `/${slug.map(decodeURIComponent).join('/')}`;

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { slug, plan } = params;
  const path = getPath(slug);

  const { data } = await tryRequest(getContentPage(plan, path));

  if (!data?.planPage) {
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

export default async function ContentPage(props: Props) {
  const params = await props.params;
  const { slug, plan } = params;
  const path = getPath(slug);

  const { data } = await tryRequest(getContentPage(plan, path));

  if (!data?.planPage) {
    return notFound();
  }

  return <Content page={data.planPage} />;
}
