const SUPPORTED_LANGUAGES = [
  'en',
  'en-AU',
  'en-GB',
  'fi',
  'sv',
  'sv-FI',
  'de',
  'de-CH',
  'da',
  'es-US',
  'es',
];

module.exports = {
  i18n: {
    defaultLocale: 'fi',
    locales: SUPPORTED_LANGUAGES,
    localeDetection: false,
  },
  fallbackLng: {
    'en-AU': ['en'],
    'en-GB': ['en'],
    'de-CH': ['de'],
    'es-US': ['es'],
    'sv-FI': ['sv'],
    default: ['en'],
  },
  localePath: './locales',
  localeExtension: 'json',
  saveMissing: process.env.NODE_ENV !== 'production',
  ns: ['common', 'actions', 'a11y'],
  defaultNS: 'common',
  fallbackNS: ['common', 'actions', 'a11y'],
  SUPPORTED_LANGUAGES,
};
