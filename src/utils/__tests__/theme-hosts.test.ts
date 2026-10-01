/**
 * @jest-environment node
 */
import { ENABLED_INTEGRATION_SETTINGS, THEME_CSS_HOSTS } from '@/constants/theme-hosts';

import { enabledIntegrations, themeCssHosts } from '../../../scripts/generate-theme-hosts.mjs';

const THEME_PATH = 'public/static/themes';

/*
 * The committed lists are generated from whichever theme package is installed, and CI resolves
 * fewer themes than a developer machine with the private ones. So the policy has to cover what
 * the installed themes need; carrying an entry they do not need is harmless, missing one is not.
 */
describe('theme hosts', () => {
  it('covers every host the installed themes load from', () => {
    expect(THEME_CSS_HOSTS).toEqual(expect.arrayContaining(themeCssHosts(THEME_PATH)));
  });

  it('covers every integration the installed themes switch on', () => {
    expect(ENABLED_INTEGRATION_SETTINGS).toEqual(
      expect.arrayContaining(enabledIntegrations(THEME_PATH))
    );
  });
});
