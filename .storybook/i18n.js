import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    lng: 'en',
    defaultLanguage: 'en',
    otherLanguages: [],
    localeSubpaths: [{'en':'en'}],
    defaultNS: 'common',
    fallbackNS: ['actions', 'a11y'],
  });

export { i18n };
