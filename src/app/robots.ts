import type { MetadataRoute } from 'next';

import { getRequestOrigin } from '@common/utils/request.server';

// The sitemap URL depends on the requesting hostname, so it can only be
// resolved at request time. Without this, Next prerenders robots.txt at build
// time, where no request headers are available, and serves the result from the
// full route cache forever. See also src/app/sitemap.ts.
export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await getRequestOrigin();

  return {
    // Crawling is allowed on every deployment. Non-production deployments
    // emit a `noindex, nofollow` robots meta tag via the layout's metadata
    // export, so crawlers must be allowed to fetch the page to see it.
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
