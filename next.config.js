const { resolve } = require('path');
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withManifest = require('next-manifest');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')


const config = withBundleAnalyzer(withManifest(withImages(withSass({
  publicRuntimeConfig: { // Will be available on both server and client
    aplansApiBaseURL: process.env.APLANS_API_BASE_URL || 'https://aplans.api.hel.ninja/v1',
    kerrokantasiApiBaseURL: process.env.KERROKANTASI_API_BASE_URL || 'https://api.hel.fi/kerrokantasi-test/v1',
    // the default value for PLAN_IDENTIFIER is set below in webpack config
    planIdentifier: process.env.PLAN_IDENTIFIER,
  },
  manifest: {
    // if src value is exist, icon image will be generated from src image, and ovwewritten
    // icons value exist in the properties. if you want to keep your own icons path? do not pass
    // src path to this plugin
    name: 'Hiilineutraali Helsinki 2035',
    short_name: 'CNH',
    start_url: '/',
    background_color: '#009246',
    theme_color: '#009246',
    display: 'minimal-ui',
    icons: {
      // source image path, to generate applications icons in 192x192, 512x512 sizes for manifest.
      src: resolve(process.cwd(), './images/hel-icon.png'),
      // default is true, cache images until the hash value of source image has changed
      // if false, generating new icon images while every build time.
      cache: true,
    },
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
  webpack(cfg, { isServer, dev }) {
    // remove friendlyerrorsplugin
    cfg.plugins = cfg.plugins.filter(plugin => plugin.constructor.name !== 'FriendlyErrorsWebpackPlugin');

    // add it back in with custom options
    if (dev && !isServer) {
      cfg.plugins.push(new FriendlyErrorsWebpackPlugin({ clearConsole: false }));
    }
    // Ignore all locale files of moment.js
    cfg.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    cfg.plugins.push(new webpack.EnvironmentPlugin({
      PLAN_IDENTIFIER: 'hnh2035',
    }));
    return cfg;
  },
}))));

module.exports = config;
