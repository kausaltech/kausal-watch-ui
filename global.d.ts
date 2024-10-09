// Use type safe message keys with `next-intl`
type CommonMessages = typeof import('./locales/en/common.json');
type ActionsMessages = typeof import('./locales/en/actions.json');
type PathsMessages = typeof import('./locales/en/paths.json');
type A11yMessages = typeof import('./locales/en/a11y.json');

declare interface IntlMessages
  extends CommonMessages,
    ActionsMessages,
    PathsMessages,
    A11yMessages {}
