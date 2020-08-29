/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const basePath = '';

// Set default plan identifier
process.env.PLAN_IDENTIFIER = process.env.PLAN_IDENTIFIER || 'hnh2035';
process.env.SENTRY_ROOTDIR = __dirname;

function getAllThemes() {
  const styleDir = path.join(__dirname, 'styles');
  return fs.readdirSync(styleDir).filter((item) => {
    if (item === 'app') return false;
    return fs.lstatSync(path.join(styleDir, item)).isDirectory();
  });
}

const SUPPORTED_LANGUAGES = ['fi', 'en', 'sv'];
const DEFAULT_LANGUAGES = ['fi', 'en'];

function generateLocaleConfig() {
  let languages = (process.env.UI_LANGUAGES || '').split(',').filter((item) => item);

  languages.forEach((lang) => {
    if (SUPPORTED_LANGUAGES.indexOf(lang) < 0) {
      throw new Error(`Invalid UI_LANGUAGES setting: language ${lang} not supported`);
    }
  });
  if (languages.length < 1) {
    languages = DEFAULT_LANGUAGES;
  }
  return {
    defaultLanguage: languages[0],
    otherLanguages: languages.slice(1),
  };
}

const themes = getAllThemes();

const config = withSourceMaps(withBundleAnalyzer(withImages(withSass({
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  async rewrites() {
    const localeSubpaths = Object.fromEntries(
      generateLocaleConfig().otherLanguages.map((lang) => [lang, lang]),
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
    planIdentifier: process.env.PLAN_IDENTIFIER,
    instanceType: process.env.INSTANCE_TYPE || 'development',
    matomoURL: process.env.MATOMO_URL,
    matomoSiteId: process.env.MATOMO_SITE_ID,
    localeConfig: generateLocaleConfig(),
  },
  experimental: {
    modern: true,
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
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

    // If there is a separate theme for PLAN_IDENTIFIER, use that, otherwise
    // use the default theme.
    const defaultThemeIdentifier = themes.indexOf(process.env.PLAN_IDENTIFIER) >= 0
      ? process.env.PLAN_IDENTIFIER : 'default';

    cfg.plugins.push(new webpack.EnvironmentPlugin({
      PLAN_IDENTIFIER: '',
      THEME_IDENTIFIER: defaultThemeIdentifier,
      MATOMO_URL: '',
      MATOMO_SITE_ID: '',
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
