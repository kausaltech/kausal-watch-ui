import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Crawling is allowed on every deployment. Non-production deployments
  // emit a `noindex, nofollow` robots meta tag via the layout's metadata
  // export, so crawlers must be allowed to fetch the page to see it.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}
