import * as Sentry from "@sentry/nextjs";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const SENTRY_DSN = (
  publicRuntimeConfig?.sentryDsn || process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
);

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 50,
  environment: process.env.INSTANCE_TYPE || 'development',
  // debug: (process.env.NODE_ENV !== 'production') && SENTRY_DSN,
});
