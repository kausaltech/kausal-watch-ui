import { captureRequestError } from '@sentry/nextjs';

const productName = 'Kausal Watch UI';

export const register = async () => {
  if (!process.env.PROJECT_ID) {
    process.env.PROJECT_ID = 'watch-ui';
  }
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const nodeOtel = await import('@common/instrumentation/node');
    await nodeOtel.initAll(productName);
  } else {
    const edgeOtel = await import('@common/instrumentation/edge');
    await edgeOtel.initAll(productName);
  }
};

export const onRequestError = captureRequestError;
