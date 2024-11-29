import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import * as url from 'node:url';

import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfigObject } from '@sentry/nextjs/build/types/config/types';
import { secrets } from 'docker-secret';
import dotenv from 'dotenv';
import nextIntlPlugin from 'next-intl/plugin';
import lockfile from 'proper-lockfile';

import {
  API_HEALTH_CHECK_PATH,
  API_SENTRY_TUNNEL_PATH,
  HEALTH_CHECK_ALIAS_PATH,
  SENTRY_TUNNEL_PUBLIC_PATH,
} from '@/constants/routes.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const withNextIntl = nextIntlPlugin('./config/i18n.ts');

if (process.env.DOTENV_CONFIG_PATH) {
  // Load CI environment variables defined in Ansible
  dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });
}

const isProd = process.env.NODE_ENV === 'production';

const sentryAuthToken =
  secrets.SENTRY_AUTH_TOKEN || process.env.SENTRY_AUTH_TOKEN;

const sentryDebug = process.env.SENTRY_DEBUG === '1';

async function initializeThemes() {
  const staticPath = path.join(__dirname, 'public', 'static');
  await mkdir(staticPath, { recursive: true });
  const releaseThemeLock = await lockfile.lock('public/static');
  try {
    const destPath = path.join(__dirname, 'public', 'static', 'themes');
    let themesLinked = false;
    try {
      const {
        generateThemeSymlinks: generateThemeSymlinksPrivate,
      } = require('@kausal/themes-private/setup.cjs');
      generateThemeSymlinksPrivate(destPath, { verbose: false });
      themesLinked = true;
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        console.error(error);
        throw error;
      }
    }
    if (!themesLinked) {
      console.log('Private themes not found; using public themes');
      const {
        generateThemeSymlinks: generateThemeSymlinksPublic,
      } = require('@kausal/themes/setup.cjs');
      generateThemeSymlinksPublic(destPath, { verbose: false });
    }
  } finally {
    await releaseThemeLock();
  }
}

await initializeThemes();

const standaloneBuild = process.env.NEXTJS_STANDALONE_BUILD === '1';
// NextJS doesn't support runtime asset prefix, so we'll need to replace the
// placeholder with the actual CDN URL when the server starts. (See start-server.sh)

const prodAssetPrefix = process.env.NEXTJS_ASSET_PREFIX;

let config: NextConfigObject = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: standaloneBuild ? 'standalone' : undefined,
  assetPrefix: isProd ? prodAssetPrefix : undefined,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
  swcMinify: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  outputFileTracingIncludes: standaloneBuild
    ? {
        '/': ['./node_modules/@kausal/themes*/**'],
      }
    : undefined,
  serverExternalPackages: ['@opentelemetry/instrumentation'],
  // eslint-disable-next-line @typescript-eslint/require-await
  generateBuildId: async () => {
    if (process.env.NEXTJS_BUILD_ID) return process.env.NEXTJS_BUILD_ID;
    // If a fixed Build ID was not provided, fall back to the default implementation.
    return null;
  },
  webpack(config, { isServer, webpack }) {
    const defines = {};
    if (process.env.NODE_ENV !== 'development') {
      // Disable Apollo Client development mode when not in production
      defines['globalThis.__DEV__'] = false;
    }

    // Due to how the Sentry is pulled into the bundle on the browser side,
    // we will need to do some nasty runtime search-and-replace to use the
    // right value.
    if (!isServer) {
      const sentryDsnPlaceholder = process.env.SENTRY_DSN_PLACEHOLDER;
      const sentryDsn = process.env.SENTRY_DSN;
      defines['process.env.SENTRY_DSN'] = JSON.stringify(
        sentryDsnPlaceholder ?? sentryDsn ?? null
      );
      defines['process.env.SENTRY_DEBUG'] = JSON.stringify(
        sentryDebug ? '1' : '0'
      );
      defines['process.env.DEPLOYMENT_TYPE'] = JSON.stringify(
        process.env.DEPLOYMENT_TYPE ??
          process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE ??
          null
      );
    }
    config.optimization.minimize = false;
    config.plugins.push(new webpack.DefinePlugin(defines));
    return config;
  },
};

function wrapWithSentry(configIn) {
  const { withSentryConfig } = require('@sentry/nextjs');
  const uploadEnabled = !!sentryAuthToken;

  /**
   * @type {import('@sentry/nextjs').SentryBuildOptions}
   */
  const sentryConfig = {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    authToken: sentryAuthToken,
    silent: !uploadEnabled,

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    // N.B. tunnelRoute is not supported in self-hosted Sentry setups.
    tunnelRoute: undefined,

    // Hides source maps from generated client bundles
    hideSourceMaps: false,
    bundleSizeOptimizations: {
      excludeDebugStatements: !sentryDebug,
      excludeReplayIframe: true,
    },
    reactComponentAnnotation: {
      enabled: true,
    },
    telemetry: false,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: !sentryDebug,
    excludeServerRoutes: [
      API_HEALTH_CHECK_PATH,
      HEALTH_CHECK_ALIAS_PATH,
      API_SENTRY_TUNNEL_PATH,
      SENTRY_TUNNEL_PUBLIC_PATH,
    ],
    automaticVercelMonitors: false,
    autoInstrumentMiddleware: false,
    sourcemaps: {
      disable: !uploadEnabled,
    },
    release: {
      create: uploadEnabled,
    },
  };
  // Injected content via Sentry wizard below
  return withSentryConfig(configIn, sentryConfig);
}

config = wrapWithSentry(withNextIntl(config));
if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer(config);
}

export default config;
