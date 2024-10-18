import { MetadataRoute } from 'next';

import { isProductionDeployment } from '@/common/environment';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isProductionDeployment()
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
