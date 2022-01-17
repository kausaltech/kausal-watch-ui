const path = require('path');

const SUPPORTED_LANGUAGES = ['en', 'fi', 'sv'];

module.exports = {
  i18n: {
    defaultLocale: 'fi',
    locales: SUPPORTED_LANGUAGES,
    localeDetection: false,
  },
  localePath: './locales',
  localeExtension: 'yaml',
  saveMissing: process.env.NODE_ENV !== 'production',
  defaultNS: 'common',
  SUPPORTED_LANGUAGES,
};
