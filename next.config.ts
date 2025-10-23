import type BundleAnalyzerPlugin from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';
import type { Options as SassOptions } from 'sass';

import { getNextConfig } from './kausal_common/configs/common-next-config';
import { wrapWithSentryConfig } from './kausal_common/src/sentry/sentry-next-config';
import { initializeThemes } from './kausal_common/src/themes/next-config.mjs';

process.env.NEXT_TELEMETRY_DISABLED = '1';

initializeThemes(__dirname);

let nextConfig: NextConfig = {
  ...getNextConfig(__dirname, { isPagesRouter: false }),
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: [
      'import',
      'legacy-js-api',
      'color-functions',
      'global-builtin',
      'color-4-api',
    ],
  } satisfies SassOptions<'sync'>,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'watch-media-prod.s3.kausal.tech',
      },
    ],
  },
};

nextConfig = wrapWithSentryConfig(nextConfig);
nextConfig = withNextIntl('./src/config/i18n.ts')(nextConfig);

if (process.env.ANALYZE_BUNDLE === '1') {
  const withBundleAnalyzer = require('@next/bundle-analyzer') as typeof BundleAnalyzerPlugin;
  nextConfig = withBundleAnalyzer({
    enabled: true,
    openAnalyzer: true,
  })(nextConfig);
}

export default nextConfig;
