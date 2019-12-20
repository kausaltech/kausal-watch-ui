// NOTE: This require will be replaced with `@sentry/browser` when
// process.browser === true thanks to the webpack config in next.config.js
const Sentry = require('@sentry/node');

let sentryInitialized = false;

if (!sentryInitialized) {
  const sentryOptions = {
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE,
    maxBreadcrumbs: 50,
    attachStacktrace: true,
  };

  // When we're developing locally
  if (process.env.NODE_ENV !== 'production') {
    // Don't actually send the errors to Sentry
    sentryOptions.beforeSend = () => null;
  }

  Sentry.init(sentryOptions);
  sentryInitialized = true;
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
      scope.setExtra('statusCode', err.statusCode);
    }

    if (res && res.statusCode) {
      scope.setExtra('statusCode', res.statusCode);
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

module.exports = {
  Sentry: Sentry,
  captureException: captureException
};
