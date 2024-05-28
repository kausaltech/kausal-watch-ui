/* eslint-disable no-restricted-syntax, @typescript-eslint/no-var-requires */
const { secrets } = require('docker-secret');

const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withNextIntl = require('next-intl/plugin')('./config/i18n.ts');

if (process.env.DOTENV_CONFIG_PATH) {
  // Load CI environment variables defined in Ansible
  require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH });
}

const isProd = process.env.NODE_ENV === 'production';

const sentryAuthToken =
  secrets.SENTRY_AUTH_TOKEN || process.env.SENTRY_AUTH_TOKEN;

function initializeThemes() {
  console.log(`
      ↝ Initialising themes
  `);

  const destPath = path.join(__dirname, 'public', 'static', 'themes');
  const {
    generateThemeSymlinks: generateThemeSymlinksPublic,
  } = require('@kausal/themes/setup.cjs');

  generateThemeSymlinksPublic(destPath, { verbose: false });

  try {
    const {
      generateThemeSymlinks: generateThemeSymlinksPrivate,
    } = require('@kausal/themes-private/setup.cjs');
    generateThemeSymlinksPrivate(destPath, { verbose: false });
  } catch (error) {
    console.error(error);
  }
}

initializeThemes();

const standaloneBuild = process.env.NEXTJS_STANDALONE_BUILD === '1';
// NextJS doesn't support runtime asset prefix, so we'll need to replace the
// placeholder with the actual CDN URL when the server starts. (See start-server.sh)

const prodAssetPrefix = process.env.NEXTJS_ASSET_PREFIX;

/**
 * @type {import('next').NextConfig}
 */
let config = {
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
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: ['@opentelemetry/instrumentation'],
    outputFileTracingIncludes: standaloneBuild
      ? {
          '/': ['./node_modules/@kausal/themes*/**'],
        }
      : undefined,
  },
  generateBuildId: async () => {
    if (process.env.NEXTJS_BUILD_ID) return process.env.NEXTJS_BUILD_ID;
    // If a fixed Build ID was not provided, fall back to the default implementation.
    return null;
  },
  webpack(config, { webpack }) {
    if (process.env.NODE_ENV !== 'development') {
      // Disable Apollo Client development mode
      config.plugins.push(
        new webpack.DefinePlugin({
          'globalThis.__DEV__': false,
        })
      );
    }

    return config;
  },
};

module.exports = withNextIntl(config);

if (sentryAuthToken) {
  const { withSentryConfig } = require('@sentry/nextjs');

  /**
   * @type {import('@sentry/nextjs').SentryWebpackPluginOptions}
   */
  const sentryWebpackOpts = {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    authToken: sentryAuthToken,
    // Suppresses source map uploading logs during build
    silent: false,
    telemetry: false,
    errorHandler: (err) => {
      console.error(err);
    },
  };

  /**
   * @type {import('@sentry/nextjs/types/config/types').UserSentryOptions}
   */
  const sentryConfig = {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    widenServerFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    // N.B. tunnelRoute is not supported in self-hosted Sentry setups.
    tunnelRoute: undefined,

    // Hides source maps from generated client bundles
    hideSourceMaps: false,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    automaticVercelMonitors: false,
  };
  // Injected content via Sentry wizard below
  module.exports = withSentryConfig(
    module.exports,
    sentryWebpackOpts,
    sentryConfig
  );
}

if (process.env.ANALYZE === 'true') {
  module.exports = withBundleAnalyzer(module.exports);
}
