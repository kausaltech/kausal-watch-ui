import path from 'node:path';

import type BundleAnalyzerPlugin from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';
import type { Options as SassOptions } from 'sass';
import type * as Webpack from 'webpack';

import { getNextConfig } from './kausal_common/configs/common-next-config.ts';
import { wrapWithSentryConfig } from './kausal_common/configs/sentry-next-config.ts';
import { initializeThemes } from './kausal_common/src/themes/next-config.mjs';

process.env.NEXT_TELEMETRY_DISABLED = '1';

initializeThemes(__dirname);

const baseConfig = getNextConfig(__dirname);

let nextConfig: NextConfig = {
  ...baseConfig,
  turbopack: {
    ...baseConfig.turbopack,
    resolveAlias: {
      ...baseConfig.turbopack?.resolveAlias,
      '@/public/*': './public/*',
    },
  },
  webpack: (cfg: Webpack.Configuration, context) => {
    const result = (baseConfig.webpack?.(cfg, context) ?? cfg) as Webpack.Configuration;
    if (result.resolve?.alias) {
      // `@/public` must come before `@` in iteration order: enhanced-resolve
      // tries aliases sequentially, and `@` would otherwise match first,
      // rewrite to `src/public/...`, fail, and short-circuit (shouldStop).
      const alias = result.resolve.alias as Record<string, string>;
      const reordered: Record<string, string> = {
        '@/public': path.join(__dirname, 'public'),
      };
      for (const [key, value] of Object.entries(alias)) reordered[key] = value;
      result.resolve.alias = reordered;
    }
    return result;
  },
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
        hostname: '*',
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
