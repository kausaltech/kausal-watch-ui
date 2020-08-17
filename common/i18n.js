import NextI18Next from 'next-i18next';
import path from 'path';

const i18nNext = new NextI18Next({
  defaultLanguage: 'fi',
  otherLanguages: ['en'],
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  localePath: path.resolve('./locales'),
  localeExtension: 'yaml',
  localeSubpaths: {
    en: 'en',
  },
});

const {
  appWithTranslation,
  withTranslation,
  i18n,
  Link,
  Router,
  Trans,
  useTranslation,
  withNamespaces,
  initPromise,
} = i18nNext;

export {
  appWithTranslation,
  withTranslation,
  i18n,
  Link,
  Router,
  Trans,
  useTranslation,
  withNamespaces,
  initPromise,
};
