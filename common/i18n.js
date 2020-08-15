const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'fi',
  otherLanguages: ['en'],
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  localePath: 'public/static/locales',
  localeExtension: 'yaml',
  localeSubpaths: {
    en: 'en',
  },
});
