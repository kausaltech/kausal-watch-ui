const SUPPORTED_LANGUAGES = ['en', 'en-AU', 'fi', 'sv', 'de', 'de-CH', 'dk'];

module.exports = {
  i18n: {
    defaultLocale: 'fi',
    locales: SUPPORTED_LANGUAGES,
    localeDetection: false,
  },
  fallbackLng: {
    'en-AU': ['en'],
    'de-CH': ['de'],
    'default': ['en'],
  },
  localePath: './locales',
  localeExtension: 'json',
  saveMissing: process.env.NODE_ENV !== 'production',
  ns: ['common', 'actions', 'a11y'],
  defaultNS: 'common',
  fallbackNS: ['common', 'actions', 'a11y'],
  SUPPORTED_LANGUAGES,
};
