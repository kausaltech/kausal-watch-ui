/* eslint-disable no-restricted-syntax */
const webpack = require('webpack');
const { i18n, SUPPORTED_LANGUAGES } = require('./next-i18next.config');


const config = {
  i18n,
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_TRACE_SAMPLE_RATE: process.env.SENTRY_TRACE_SAMPLE_RATE || '1.0',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true,
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
    supportedLanguages: SUPPORTED_LANGUAGES,
  },
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["cfg"] }] */
  webpack(cfg, options) {
    const { isServer, buildId, dev } = options;

    cfg.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
      }),
    );
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

    // cfg.optimization.minimize = false;

    return cfg;
  },
};

module.exports = config;
