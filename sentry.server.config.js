const Sentry = require('@sentry/nextjs');

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 50,
  environment: process.env.INSTANCE_TYPE || 'development',
  // debug: (process.env.NODE_ENV !== 'production') && SENTRY_DSN,
  beforeSend: (event, hint) => {
    const error = hint.originalException;
    if (error && error.statusCode && error.statusCode === 404) {
      // eslint-disable-next-line no-console
      console.warn('Ignoring page-not-found error on the server');
      return null;
    }
    return event;
  },
});
