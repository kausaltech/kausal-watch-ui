const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');


const config = withBundleAnalyzer(withImages(withSass({
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  publicRuntimeConfig: { // Will be available on both server and client
    aplansApiBaseURL: process.env.APLANS_API_BASE_URL || 'https://aplans.api.hel.ninja/v1',
    kerrokantasiApiBaseURL: process.env.KERROKANTASI_API_BASE_URL || 'https://api.hel.fi/kerrokantasi-test/v1',
    // the default value for PLAN_IDENTIFIER is set below in webpack config
    planIdentifier: process.env.PLAN_IDENTIFIER || 'hnh2035',
    instanceType: process.env.INSTANCE_TYPE || 'development',
  },
  /*
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
  */
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
      }),
    );
    if (!isServer) {
      cfg.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // Ignore all locale files of moment.js
    cfg.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    cfg.plugins.push(new webpack.EnvironmentPlugin({
      PLAN_IDENTIFIER: 'hnh2035',
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
          release: buildId,
          rewrite: true,
          stripCommonPrefix: true,
          urlPrefix: '_next',
        }));
      }
    }

    return cfg;
  },
})));

module.exports = config;
