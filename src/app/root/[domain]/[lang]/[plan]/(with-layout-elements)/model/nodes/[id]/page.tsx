import { notFound } from 'next/navigation';

import type { Metadata, ResolvingMetadata } from 'next';

import PathsNodePage from '@/components/paths/node/PathsNodePage';
import PathsPreloadProvider from '@/components/providers/PathsPreloadProvider';
import { getPathsNodeInfo, preloadNodePage } from '@/utils/paths/preload-node-page';

type Props = {
  params: Promise<{ id: string; plan: string; domain: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id, plan, domain } = await props.params;
  const node = await getPathsNodeInfo(domain, plan, decodeURIComponent(id));

  if (!node) {
    return {};
  }

  const resolvedParent = await parent;

  return {
    title: `${node.name} | ${resolvedParent.title?.absolute}`,
    openGraph: {
      type: 'website',
      title: `${node.name} | ${resolvedParent.openGraph?.title?.absolute}`,
      url: resolvedParent.openGraph?.url ?? undefined,
      images: resolvedParent.openGraph?.images ?? undefined,
      siteName: resolvedParent.openGraph?.siteName ?? undefined,
    },
  };
}

export default async function ModelNodePage(props: Props) {
  const { id, plan, domain } = await props.params;
  const node = await getPathsNodeInfo(domain, plan, decodeURIComponent(id));

  // Also when the plan has no Paths model
  if (!node) {
    return notFound();
  }

  // Not awaited: the node's metrics stream in when the model has computed them
  const preload = preloadNodePage(domain, plan, node.id);

  return (
    <PathsPreloadProvider preload={preload}>
      <PathsNodePage nodeId={node.id} />
    </PathsPreloadProvider>
  );
}
