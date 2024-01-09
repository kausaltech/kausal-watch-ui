/* eslint-disable no-restricted-syntax */
const webpack = require('webpack');
const { secrets } = require('docker-secret');
const { withSentryConfig } = require('@sentry/nextjs');
const { i18n, SUPPORTED_LANGUAGES } = require('./next-i18next.config');
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
    > Kausal Watch UI
      > Initialising app
        > DEPLOYMENT_TYPE: ${process.env.DEPLOYMENT_TYPE}
        > NODE_ENV: ${process.env.NODE_ENV}
        > NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}
  `);

function initializeThemes() {
  console.log(' > Initialising themes');
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
  env: {
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // NEXT_PUBLIC_DEPLOYMENT_TYPE: process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE,
    // SENTRY_DSN: process.env.SENTRY_DSN,
    // SENTRY_TRACE_SAMPLE_RATE: process.env.SENTRY_TRACE_SAMPLE_RATE || '1.0',
  },
  // sentry: {
  //   // If SENTRY_AUTH_TOKEN is not set, disable uploading source maps to Sentry
  //   disableServerWebpackPlugin: !sentryAuthToken,
  //   disableClientWebpackPlugin: !sentryAuthToken,
  // },
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
  swcMinify: true,
  // async rewrites() {
  //   const rewrites = [
  //     { source: '/favicon.ico', destination: '/public/static/favicon.ico' },
  //   ];
  //   return rewrites;
  // },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   aplansApiBaseURL:
  //     process.env.APLANS_API_BASE_URL || 'https://api.watch.kausal.tech/v1',
  //   // the default value for PLAN_IDENTIFIER is set below in webpack config
  //   defaultPlanIdentifier: process.env.PLAN_IDENTIFIER,
  //   defaultThemeIdentifier: process.env.THEME_IDENTIFIER,
  //   deploymentType: process.env.DEPLOYMENT_TYPE || 'development',
  //   matomoURL: process.env.MATOMO_URL,
  //   matomoSiteId: process.env.MATOMO_SITE_ID,
  //   sentryDsn: process.env.SENTRY_DSN,
  //   supportedLanguages: SUPPORTED_LANGUAGES,
  //   forceFeatures: process.env.FORCE_FEATURES?.split(','),
  // },
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["cfg"] }] */
  // webpack(cfg, options) {
  //   const { isServer, buildId, dev } = options;

  //   if (!isServer) {
  //     cfg.resolve.alias['@sentry/node'] = '@sentry/browser';
  //     cfg.resolve.alias['next-i18next/serverSideTranslations'] = false;
  //     cfg.resolve.alias['./next-i18next.config'] = false;
  //     cfg.resolve.symlinks = true;
  //   }
  //   cfg.plugins.push(
  //     new webpack.EnvironmentPlugin({
  //       PLAN_IDENTIFIER: '',
  //       THEME_IDENTIFIER: '',
  //       DISABLE_THEME_CACHE: '',
  //       MATOMO_URL: '',
  //       MATOMO_SITE_ID: '',
  //       SYNC_THEME: '',
  //       FORCE_SENTRY_SEND: '',
  //     })
  //   );
  //   cfg.plugins.push(
  //     new webpack.DefinePlugin({
  //       __SENTRY_DEBUG__: false,
  //     })
  //   );
  //   cfg.experiments = { ...cfg.experiments, topLevelAwait: true };

  //   return cfg;
  // },
};

// const sentryWebpackOpts = {
//   authToken: sentryAuthToken,
// };

// config = withSentryConfig(withBundleAnalyzer(config), sentryWebpackOpts);

module.exports = withNextIntl(config);
