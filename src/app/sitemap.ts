import type { MetadataRoute } from 'next';

import { getRequestOrigin } from '@common/utils/request.server';

import { deploymentType } from '@/common/environment';
import { getSitemapUrlsForOrigin } from '@/utils/sitemap.server';

// The deployment type is only known at runtime (the Docker build substitutes a
// placeholder), and the URLs depend on the requesting hostname. Without this,
// Next prerenders the sitemap at build time, where the placeholder deployment
// type makes the check below return an empty sitemap that is then served
// forever from the full route cache.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Non-production deployments should not advertise their URLs to crawlers.
  if (deploymentType !== 'production') {
    return [];
  }

  const origin = await getRequestOrigin();
  const urls = await getSitemapUrlsForOrigin(origin);

  return urls.map((url) => ({ url }));
}
