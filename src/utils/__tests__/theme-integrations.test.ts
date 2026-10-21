/**
 * @jest-environment node
 */
import { ENABLED_INTEGRATION_SETTINGS } from '@/constants/theme-integrations';

import { enabledIntegrations } from '../../../scripts/generate-theme-integrations.mjs';

/*
 * The committed list is generated from whichever theme package is installed, and CI resolves
 * fewer themes than a developer machine with the private ones. So it has to cover what the
 * installed themes switch on; carrying an extra entry is harmless, missing one is not.
 */
it('covers every integration the installed themes switch on', () => {
  expect(ENABLED_INTEGRATION_SETTINGS).toEqual(
    expect.arrayContaining(enabledIntegrations('public/static/themes'))
  );
});
