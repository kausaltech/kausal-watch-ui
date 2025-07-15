const { secrets } = require('docker-secret');
const { mkdir } = require('node:fs/promises');
const lockfile = require('proper-lockfile');
const { CycloneDxWebpackPlugin } = require('@cyclonedx/webpack-plugin');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withNextIntl = require('next-intl/plugin')('./config/i18n.ts');

const { getProjectIdFromPackageJson } = require('./kausal_common/src/env/project.cjs');

if (process.env.DOTENV_CONFIG_PATH) {
  // Load CI environment variables defined in Ansible
  require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH });
}

const sentryAuthToken = secrets.SENTRY_AUTH_TOKEN || process.env.SENTRY_AUTH_TOKEN;

const isProd = process.env.NODE_ENV === 'production';
const standaloneBuild = process.env.NEXTJS_STANDALONE_BUILD === '1';
const prodAssetPrefix = isProd ? process.env.NEXTJS_ASSET_PREFIX : undefined;

console.log(`
  ⚙ Kausal Watch UI
    ↝ Initialising app
      ↝ NODE_ENV: ${process.env.NODE_ENV}
      ↝ NEXT_PUBLIC_DEPLOYMENT_TYPE: ${process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE}
      ↝ NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}
  `);

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
      } = require('@kausal-private/themes-private/setup.cjs');
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

void initializeThemes();

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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // TODO: This should be an environment variable
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'watch-media-prod.s3.kausal.tech',
      },
    ],
  },
  webpack(cfg, context) {
    const { webpack, isServer, nextRuntime } = context;
    const isEdge = isServer && nextRuntime === 'edge';
    cfg.plugins.push(
      new webpack.DefinePlugin({
        ...getCommonDefines(context.dir, true),
      })
    );
    if (isProd) {
      const sbomComponent = isServer ? (isEdge ? 'edge' : 'node') : 'browser';
      const webpackOutputPath = cfg.output.path;
      const sbomOutputPath = `${context.dir}/public/static/sbom/${sbomComponent}`;
      const buildVersion = (process.env.BUILD_ID || 'unknown').replaceAll('_', '-');
      cfg.plugins.push(
        new CycloneDxWebpackPlugin({
          outputLocation: path.relative(webpackOutputPath, sbomOutputPath),
          rootComponentVersion: `1.0.0-${buildVersion}`,
          rootComponentAutodetect: false,
          rootComponentName: `${getProjectIdFromPackageJson(context.dir)}-${sbomComponent}`,
          includeWellknown: false,
        })
      );
    }

    return cfg;
  },
};

module.exports = withNextIntl(config);

if (true) {
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
      errorHandler: (error) => {
        // When an error occurs during release creation or sourcemaps
        // upload, the plugin will call this function. Without this
        // handler, the build would fail completely.
        console.error('⚠️  There was an error communicating with the Sentry API');
        console.error(error.message);
      },
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: undefined,

      // Hides source maps from generated client bundles
      hideSourceMaps: true,
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
      automaticVercelMonitors: false,
    }
  );
}

function getCommonDefines(projectRoot, stringify) {
  function maybeStringify(value) {
    return stringify ? JSON.stringify(value) : value;
  }

  const defines = {
    'globalThis.__DEV__': isProd ? 'false' : 'true',
    'process.env.PROJECT_ID': maybeStringify(getProjectIdFromPackageJson(projectRoot)),
    'process.env.NEXTJS_ASSET_PREFIX': maybeStringify(prodAssetPrefix || ''),
    ...getSentryWebpackDefines(stringify),
  };
  return defines;
}

function getSentryWebpackDefines(stringify) {
  const defines = {};
  function setIfDefined(key, value) {
    if (!value) return;
    defines[`process.env.${key}`] = stringify ? JSON.stringify(value) : value;
  }
  const sentryDsnPlaceholder = process.env.SENTRY_DSN_PLACEHOLDER;
  const sentryDsn = process.env.SENTRY_DSN;
  setIfDefined('SENTRY_DSN', sentryDsnPlaceholder ?? sentryDsn);
  return defines;
}
