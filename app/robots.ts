import { MetadataRoute } from 'next';
import { deploymentType } from '@/common/environment';

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
