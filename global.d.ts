import type { Theme as KausalTheme } from '@kausal/themes/types';

import type a11yMessages from './locales/en/a11y.json';
import type actionsMessages from './locales/en/actions.json';
import type commonMessages from './locales/en/common.json';
import type pathsMessages from './locales/en/paths.json';

// Use type safe message keys with `next-intl`
type CommonMessages = typeof commonMessages;
type ActionsMessages = typeof actionsMessages;
type PathsMessages = typeof pathsMessages;
type A11yMessages = typeof a11yMessages;

declare module '@emotion/react' {
  // Keep Emotion's theme parameter aligned with the application ThemeProvider.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Theme extends KausalTheme {}
}

declare interface IntlMessages
  extends CommonMessages, ActionsMessages, PathsMessages, A11yMessages {}
