/**
 * @jest-environment node
 */
import { existsSync } from 'node:fs';

import { THEME_CSS_HOSTS } from '@/constants/theme-hosts';

import { themeCssHosts } from '../../../scripts/generate-theme-hosts.mjs';

const THEME_PATH = 'public/static/themes';

/*
 * The policy allows what the theme CSS loads from, so a theme update that introduces a new host
 * has to regenerate the list. Skipped where the theme packages are not installed.
 */
const describeWithThemes = existsSync(THEME_PATH) ? describe : describe.skip;

describeWithThemes('theme hosts', () => {
  it('matches the hosts the installed themes load from', () => {
    expect(THEME_CSS_HOSTS).toEqual(themeCssHosts(THEME_PATH));
  });
});
