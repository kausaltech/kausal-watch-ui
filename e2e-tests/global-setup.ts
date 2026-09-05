import { type FullConfig } from '@playwright/test';

import { displayConfiguration } from './common/context.ts';

function globalSetup(_config: FullConfig) {
  displayConfiguration();
}

export default globalSetup;
