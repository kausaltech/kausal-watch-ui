const Sentry = require('@sentry/nextjs');
//const SentryTracing = require('@sentry/tracing');
const getConfig = require('next/config').default;

/*
function initSentry(app) {
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
*/

function captureException(err, ctx) {
  ctx = ctx || {};
  const { req, res, errorInfo, query, pathname } = ctx;

  Sentry.configureScope((scope) => {
    /*
    if (err.message) {
      // De-duplication currently doesn't work correctly for SSR / browser errors
      // so we force deduplication by error message if it is present
      scope.setFingerprint([err.message]);
    }
    */
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
      /*
      if (req) {
        scope.setExtra('url', req.url);
        scope.setExtra('method', req.method);
        scope.setExtra('headers', req.headers);
        scope.setExtra('params', req.params);
        scope.setExtra('query', req.query);
      }
      */
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
};
