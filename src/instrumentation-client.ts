import * as Sentry from '@sentry/nextjs';

import { initBrowserRootLogger } from '@common/logging/browser';
import { initSentryBrowser } from '@common/sentry/client-init';

initBrowserRootLogger();
initSentryBrowser();

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
