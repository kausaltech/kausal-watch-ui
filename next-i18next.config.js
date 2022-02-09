const SUPPORTED_LANGUAGES = ['en', 'fi', 'sv'];

module.exports = {
  i18n: {
    defaultLocale: 'fi',
    locales: SUPPORTED_LANGUAGES,
    localeDetection: false,
  },
  localePath: './locales',
  localeExtension: 'json',
  saveMissing: process.env.NODE_ENV !== 'production',
  ns: ['common', 'actions', 'a11y'],
  defaultNS: 'common',
  fallbackNS: ['common', 'actions', 'a11y'],
  SUPPORTED_LANGUAGES,
};
