import { type FullConfig } from '@playwright/test';

import { displayConfiguration } from './common/context';

async function globalSetup(config: FullConfig) {
  displayConfiguration();
}

export default globalSetup;
