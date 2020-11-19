// NOTE: This require will be replaced with `@sentry/browser` when
// process.browser === true thanks to the webpack config in next.config.js
const Sentry = require('@sentry/node');
const sentryIntegrations = require('@sentry/integrations');
const SentryTracing = require('@sentry/tracing');
const getConfig = require('next/config').default;

let sentryInitialized = false;

function initSentry(app) {
  let environment;
  const distDir = `${process.env.SENTRY_ROOTDIR}/.next`;
  const integrations = [
    new sentryIntegrations.RewriteFrames({
      iteratee: (frame) => {
        frame.filename = frame.filename.replace(distDir, 'app:///_next');
        return frame;
      },
    }),
  ];

  if (!process.browser) {
    integrations.push(new Sentry.Integrations.Http({ tracing: true }));
    integrations.push(new SentryTracing.Integrations.Express({ app }));
    environment = process.env.INSTANCE_TYPE || 'development';
  } else {
    let lastPath;

    integrations.push(new SentryTracing.Integrations.BrowserTracing({
      beforeNavigate: (context) => {
        const { pathname } = window.location;
        if (context.op == 'navigation') {
          // Do not send tracing events that only change the query string
          // (such as the action list page).
          if (lastPath === pathname) return undefined;
          lastPath = pathname;
        }
        return context;
      },
    }));
    const { publicRuntimeConfig } = getConfig();
    environment = publicRuntimeConfig.instanceType;
  }

  let sampleRate = parseFloat(process.env.SENTRY_TRACE_SAMPLE_RATE);
  if (Number.isNaN(sampleRate)) {
    sampleRate = 1.0;
  } else if (sampleRate < 0) {
    sampleRate = 0;
  } else if (sampleRate > 1.0) {
    sampleRate = 1.0;
  }
  const sentryOptions = {
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE,
    environment,
    maxBreadcrumbs: 50,
    attachStacktrace: true,
    integrations,
    tracesSampler: (samplingContext) => {
      /* FIXME */
      return sampleRate;
    },
  };

  // When we're developing locally
  if (process.env.NODE_ENV !== 'production' && !process.env.FORCE_SENTRY_SEND) {
    // Don't actually send the errors to Sentry
    sentryOptions.beforeSend = (event) => null;
  }

  Sentry.init(sentryOptions);
  sentryInitialized = true;
}

// On the browser side we initialize Sentry automatically
if (!sentryInitialized && process.browser) {
  initSentry(null);
}

function captureException(err, ctx) {
  ctx = ctx || {};
  const { req, res, errorInfo, query, pathname } = ctx;

  Sentry.configureScope((scope) => {
    if (err.message) {
      // De-duplication currently doesn't work correctly for SSR / browser errors
      // so we force deduplication by error message if it is present
      scope.setFingerprint([err.message]);
    }

    if (err.statusCode) {
      scope.setExtra('http_status', err.statusCode);
    }

    if (res && res.statusCode) {
      scope.setExtra('http_status', res.statusCode);
    }

    if (process.browser) {
      scope.setTag('ssr', false);
      scope.setExtra('query', query);
      scope.setExtra('pathname', pathname);
    } else {
      scope.setTag('ssr', true);
      if (req) {
        scope.setExtra('url', req.url);
        scope.setExtra('method', req.method);
        scope.setExtra('headers', req.headers);
        scope.setExtra('params', req.params);
        scope.setExtra('query', req.query);
      }
    }

    if (errorInfo) {
      Object.keys(errorInfo).forEach(key => scope.setExtra(key, errorInfo[key]));
    }
  });

  return Sentry.captureException(err);
}

function captureMessage(msg) {
  return Sentry.captureMessage(msg);
}

module.exports = {
  Sentry,
  captureException,
  captureMessage,
  initSentry,
};
