import { type FullConfig } from '@playwright/test';

import { displayConfiguration } from './common/context.ts';

async function globalSetup(config: FullConfig) {
  displayConfiguration();
}

export default globalSetup;
