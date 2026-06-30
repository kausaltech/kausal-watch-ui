import type { MetadataRoute } from 'next';

import { getRequestOrigin } from '@common/utils/request.server';

import { deploymentType } from '@/common/environment';
import { getSitemapUrlsForOrigin } from '@/utils/sitemap.server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Non-production deployments should not advertise their URLs to crawlers.
  if (deploymentType !== 'production') {
    return [];
  }

  const origin = await getRequestOrigin();
  const urls = await getSitemapUrlsForOrigin(origin);

  return urls.map((url) => ({ url }));
}
