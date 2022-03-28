/* eslint-disable no-restricted-syntax */
const webpack = require('webpack');
const { withSentryConfig } = require('@sentry/nextjs');
const { i18n, SUPPORTED_LANGUAGES } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

let config = {
  i18n,
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_TRACE_SAMPLE_RATE: process.env.SENTRY_TRACE_SAMPLE_RATE || '1.0',
  },
  sentry: {
    // If SENTRY_AUTH_TOKEN is not set, disable uploading source maps to Sentry
    disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
    disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  async rewrites() {
    const rewrites = [
      { source: '/favicon.ico', destination: '/public/static/favicon.ico' },
    ];
    return rewrites;
  },
  publicRuntimeConfig: { // Will be available on both server and client
    aplansApiBaseURL: process.env.APLANS_API_BASE_URL || 'https://api.watch.kausal.tech/v1',
    // the default value for PLAN_IDENTIFIER is set below in webpack config
    defaultPlanIdentifier: process.env.PLAN_IDENTIFIER,
    defaultThemeIdentifier: process.env.THEME_IDENTIFIER,
    instanceType: process.env.INSTANCE_TYPE || 'development',
    matomoURL: process.env.MATOMO_URL,
    matomoSiteId: process.env.MATOMO_SITE_ID,
    sentryDsn: process.env.SENTRY_DSN,
    supportedLanguages: SUPPORTED_LANGUAGES,
    forceFeatures: process.env.FORCE_FEATURES?.split(','),
  },
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["cfg"] }] */
  webpack(cfg, options) {
    const { isServer, buildId, dev } = options;

    if (!isServer) {
      cfg.resolve.alias['@sentry/node'] = '@sentry/browser';
      cfg.resolve.alias['next-i18next/serverSideTranslations'] = false;
      cfg.resolve.alias['./next-i18next.config'] = false;
    }

    cfg.plugins.push(new webpack.EnvironmentPlugin({
      PLAN_IDENTIFIER: '',
      THEME_IDENTIFIER: '',
      DISABLE_THEME_CACHE: '',
      MATOMO_URL: '',
      MATOMO_SITE_ID: '',
      SYNC_THEME: '',
      FORCE_SENTRY_SEND: '',
    }));

    return cfg;
  },
};

config = withSentryConfig(withBundleAnalyzer(config));

module.exports = config;
