/* eslint-disable no-restricted-syntax */
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

const sentryAuthToken =
  secrets.SENTRY_AUTH_TOKEN || process.env.SENTRY_AUTH_TOKEN;

console.log(`
  ⚙ Kausal Watch UI
    ↝ Initialising app
      ↝ NODE_ENV: ${process.env.NODE_ENV}
      ↝ NEXT_PUBLIC_DEPLOYMENT_TYPE: ${process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE}
      ↝ NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}
  `);

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

/**
 * @type {import('next').NextConfig}
 */
let config = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
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

  // Injected content via Sentry wizard below
  module.exports = withSentryConfig(
    module.exports,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options
      authToken: sentryAuthToken,

      // Suppresses source map uploading logs during build
      silent: true,
      org: 'kausal',
      project: 'watch-ui',
      url: 'https://sentry.kausal.tech/',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    }
  );
}
