import type { MetadataRoute } from 'next';

import { deploymentType } from '@/common/environment';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      deploymentType === 'production'
        ? {
            userAgent: '*',
            allow: '/',
          }
        : {
            userAgent: '*',
            disallow: '/',
          },
  };
}
