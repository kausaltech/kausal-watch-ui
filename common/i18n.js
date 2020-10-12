import NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import path from 'path';

const { supportedLanguages } = getConfig().publicRuntimeConfig;

const i18nNext = new NextI18Next({
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  localePath: path.resolve('./locales'),
  localeExtension: process.browser ? 'json' : 'yaml',
  otherLanguages: supportedLanguages,
  saveMissing: process.env.NODE_ENV !== 'production',
  defaultNS: 'common',
  fallbackNS: ['actions', 'a11y'],
  missingKeyHandler: (ng, ns, key) => {
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

function configureFromPlan(plan) {
  const { config } = i18nNext;
  const { primaryLanguage = 'fi', otherLanguages } = plan;

  const newConfig = {
    defaultLanguage: primaryLanguage,
    otherLanguages,
    localeSubpaths: Object.fromEntries(
      otherLanguages.map((lang) => [lang, lang]),
    ),
  };
  Object.assign(config, newConfig);
  Object.assign(i18n.options, newConfig);
}

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
  configureFromPlan,
};
