/* eslint-disable no-restricted-syntax */
const { secrets } = require('docker-secret');
const { mkdir } = require('node:fs/promises');
const lockfile = require('proper-lockfile');

const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withNextIntl = require('next-intl/plugin')('./config/i18n.ts');
const { withSentryConfig } = require('@sentry/nextjs');

if (process.env.DOTENV_CONFIG_PATH) {
  // Load CI environment variables defined in Ansible
  require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH });
}

const isProd = process.env.NODE_ENV === 'production';

const sentryAuthToken =
  secrets.SENTRY_AUTH_TOKEN || process.env.SENTRY_AUTH_TOKEN;

const standaloneBuild = process.env.NEXTJS_STANDALONE_BUILD === '1';

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
      } = require('@kausal/themes-private/setup.cjs');
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

initializeThemes();

const prodAssetPrefix = process.env.NEXTJS_ASSET_PREFIX;
const sentryDebug = !isProd || process.env.SENTRY_DEBUG === '1';

/**
 * @type {import('next').NextConfig}
 */
let config = {
  assetPrefix: isProd ? prodAssetPrefix : undefined,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: standaloneBuild ? 'standalone' : undefined,
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
  experimental: {
    outputFileTracingIncludes: standaloneBuild
      ? {
          '/': ['./node_modules/@kausal/themes*/**'],
        }
      : undefined,
  },
};

function initSentryWebpack(config) {
  /**
   * @type {import('@sentry/nextjs/types/config/types').SentryBuildOptions}
   */
  const sentryOptions = {
    silent: false,
    telemetry: false,
    authToken: sentryAuthToken,
    release: {
      setCommits: {
        auto: true,
      },
    },
    disableLogger: !sentryDebug,
    widenClientFileUpload: true,
    automaticVercelMonitors: false,
    reactComponentAnnotation: {
      enabled: true,
    },
  };

  // Make sure adding Sentry options is the last code to run before exporting, to
  // ensure that your source maps include changes from all other Webpack plugins
  return withSentryConfig(config, sentryOptions);
}

module.exports = initSentryWebpack(withNextIntl(config));
