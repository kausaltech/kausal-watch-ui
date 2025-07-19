import { initBrowserRootLogger } from '@common/logging/browser';
import { initSentryBrowser } from '@common/sentry/client-init';

initBrowserRootLogger();
initSentryBrowser();
