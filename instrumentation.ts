import { getRuntimeConfig } from './common/environment';
import { getLogger } from './common/log';

const logger = getLogger('init');

logger.info({ config: getRuntimeConfig() }, 'Initializing app');

export const register = async () => {
  if (process.env.NODE_ENV !== 'production') return;
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node');
  }
};
