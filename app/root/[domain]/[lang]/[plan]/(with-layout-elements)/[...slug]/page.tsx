import React from 'react';

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { GetContentPageQuery } from 'common/__generated__/graphql';
import { getContentPage } from '@/queries/get-content-page';
import { getMetaDescription, getMetaImage } from '@/utils/metadata';
import { tryRequest } from '@/utils/api.utils';
import { Content, GeneralPlanPage } from '../[...slug]/ContentPage';

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

  const { data } = await tryRequest<GetContentPageQuery>(
    getContentPage(plan, path)
  );

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

export default async function ContentPage({ params }: Props) {
  const { slug, plan } = params;
  const path = getPath(slug);

  const { data } = await tryRequest<GetContentPageQuery>(
    getContentPage(plan, path)
  );

  if (!data?.planPage) {
    return notFound();
  }

  return <Content page={data.planPage as GeneralPlanPage} />;
}
