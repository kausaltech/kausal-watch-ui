/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE_BUNDLE,
});
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const basePath = '';

// Set default plan identifier
process.env.SENTRY_ROOTDIR = __dirname;

const SUPPORTED_LANGUAGES = ['en', 'fi', 'sv'];

function generateLocaleConfig() {
  let languages = (process.env.UI_LANGUAGES || '').split(',').filter((item) => item);

  languages.forEach((lang) => {
    if (SUPPORTED_LANGUAGES.indexOf(lang) < 0) {
      throw new Error(`Invalid UI_LANGUAGES setting: language ${lang} not supported`);
    }
  });
  if (languages.length < 1) {
    languages = SUPPORTED_LANGUAGES;
  }
  return languages;
}

const config = withSourceMaps(withBundleAnalyzer(withImages(withSass({
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_TRACE_SAMPLE_RATE: process.env.SENTRY_TRACE_SAMPLE_RATE || '1.0',
  },
  async rewrites() {
    const localeSubpaths = Object.fromEntries(
      generateLocaleConfig().map((lang) => [lang, lang]),
    );
    const i18nRewrites = await nextI18NextRewrites(localeSubpaths);
    const rewrites = [
      { source: '/favicon.ico', destination: '/public/static/favicon.ico' },
      ...i18nRewrites,
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
    supportedLanguages: generateLocaleConfig(),
  },
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["cfg"] }] */
  webpack(cfg, options) {
    const { isServer, buildId, dev } = options;

    cfg.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
        'process.env.SENTRY_ROOTDIR': isServer ? JSON.stringify(__dirname) : '""',
      }),
    );
    if (!isServer) {
      cfg.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // Ignore all locale files of moment.js
    cfg.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

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

    // SOURCEMAPS
    if (!dev && !isServer) {
      cfg.devtool = 'source-map';
      for (const plugin of cfg.plugins) {
        if (plugin.constructor.name === 'UglifyJsPlugin') {
          plugin.options.sourceMap = true;
          break;
        }
      }

      if (cfg.optimization && cfg.optimization.minimizer) {
        for (const plugin of cfg.optimization.minimizer) {
          if (plugin.constructor.name === 'TerserPlugin') {
            plugin.options.sourceMap = true;
            break;
          }
        }
      }

      if (process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_PROJECT && process.env.SENTRY_ORG) {
        cfg.plugins.push(new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: buildId,
        }));
      }
    }
    return cfg;
  },
  basePath,
}))));

module.exports = config;
