import { notFound } from 'next/navigation';

import type { Metadata, ResolvingMetadata } from 'next';

import type { ContentPageQuery } from '@/common/__generated__/graphql';
import SettingsPanelVisibility from '@/components/paths/toolbar/SettingsPanelVisibility';
import PathsPreloadProvider from '@/components/providers/PathsPreloadProvider';
import { getContentPage } from '@/queries/get-content-page';
import { tryRequest } from '@/utils/api.utils';
import { getMetaDescription, getMetaImage } from '@/utils/metadata';
import { pageShowsPathsSettings } from '@/utils/paths/paths-content';
import { preloadPathsBlocks } from '@/utils/paths/preload-paths-blocks';

import ContentPage from '../[...slug]/ContentPage';

type Props = {
  params: Promise<{ slug: string[]; plan: string; domain: string }>;
};

const getPath = (slug: string[]) => `/${slug.map(decodeURIComponent).join('/')}`;

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const { slug, plan } = params;
  const path = getPath(slug);

  const { data } = await tryRequest<ContentPageQuery>(getContentPage(plan, path));

  if (!data?.planPage) {
    return {};
  }

  const resolvedParent = await parent;
  const metaImage = getMetaImage(data.planPage);

  return {
    title: `${data.planPage.title} | ${resolvedParent.title?.absolute}`,
    description: getMetaDescription(data.planPage),
    openGraph: {
      type: 'website',
      title: `${data.planPage.title} | ${resolvedParent.openGraph?.title?.absolute}`,
      url: resolvedParent.openGraph?.url ?? undefined,
      images: metaImage ? [metaImage] : (resolvedParent.openGraph?.images ?? undefined),
      siteName: resolvedParent.openGraph?.siteName ?? undefined,
    },
  };
}

export default async function SlugPage(props: Props) {
  const params = await props.params;
  const { slug, plan } = params;
  const path = getPath(slug);

  const { data } = await tryRequest<ContentPageQuery>(getContentPage(plan, path));

  if (!data?.planPage) {
    return notFound();
  }

  const { planPage } = data;
  // Not awaited: Paths blocks stream in when their data is ready
  const pathsPreload = preloadPathsBlocks(params.domain, plan, planPage);

  return (
    <PathsPreloadProvider preload={pathsPreload}>
      <SettingsPanelVisibility visible={pageShowsPathsSettings(planPage)} />
      <ContentPage page={planPage} testId="slug-page" />
    </PathsPreloadProvider>
  );
}
