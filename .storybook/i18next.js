import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';

const ns = ['common', 'actions', 'a11y'];
const supportedLngs = ['en', 'fi', 'de'];

i18n.use(initReactI18next)
    .use(HttpApi)
    .init({
        debug: true,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        defaultNS: 'common',
        fallbackNS: ['common', 'actions', 'a11y'],
        ns,
        supportedLngs,
    });

supportedLngs.forEach((lang) => {
    ns.forEach((n) => {
        i18n.addResourceBundle(
            lang,
            n,
            require(`../locales/${lang}/${n}.json`)
        );
    });
});

export {i18n};
