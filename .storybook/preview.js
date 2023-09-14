import { Fragment, Suspense } from 'react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import { setConfig } from 'next/config';
import { I18nextProvider } from 'react-i18next';
import { useGlobals } from '@storybook/client-api';
import { i18n } from './i18next.js';
import '../styles/default/main.scss';
import ThemedGlobalStyles from '../common/ThemedGlobalStyles';
import { mergeWithDefaultTheme } from '../common/theme';
import defaultTheme from 'public/static/themes/default/theme.json';

export const parameters = {};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'fi', right: '🇫🇮', title: 'Finnish' },
        { value: 'de', right: '🇩🇪', title: 'German' },
      ],
    },
  },
};

const publicRuntimeConfig = {
  aplansApiBaseURL: 'https://api.watch.kausal.tech/v1',
  defaultPlanIdentifier: 'sunnydale',
  defaultThemeIdentifier: 'default',
  instanceType: 'development',
  supportedLanguages: ['en', 'fi', 'de'],
};

setConfig({ publicRuntimeConfig });

let themes = [defaultTheme];

let additionalThemes = [];
try {
  additionalThemes = require('@kausal/themes-private/themes.json');
} catch (error) {
  console.error(error);
}

additionalThemes.forEach((value) => {
  const additionalTheme = require('public/static/themes/' +
    value +
    '/theme.json');
  themes.push(mergeWithDefaultTheme(additionalTheme));
});

export const decorators = [
  (storyFN) => <ThemedGlobalStyles>{storyFN()}</ThemedGlobalStyles>,
  withThemesProvider(themes, ThemeProvider),
  (story) => {
    const [{ locale }] = useGlobals();

    i18n.changeLanguage(locale);
    return (
      <Suspense fallback="Loading...">
        <Fragment key={locale}>
          <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
        </Fragment>
      </Suspense>
    );
  },
];
