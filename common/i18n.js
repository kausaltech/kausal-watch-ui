import NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import path from 'path';


const { localeConfig } = getConfig().publicRuntimeConfig;

const i18nNext = new NextI18Next({
  defaultLanguage: localeConfig.defaultLanguage,
  otherLanguages: localeConfig.otherLanguages,
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  localePath: path.resolve('./locales'),
  localeExtension: process.browser ? 'json' : 'yaml',
  localeSubpaths: Object.fromEntries(
    localeConfig.otherLanguages.map((lang) => [lang, lang]),
  ),
  saveMissing: process.env.NODE_ENV !== 'production',
  defaultNS: 'common',
  fallbackNS: ['actions'],
  missingKeyHandler: (ng, ns, key, fallbackValue) => {
    console.warn(`Missing i18n key '${key}' in namespace '${ns}'`);
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
