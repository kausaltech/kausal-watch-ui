import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import { setConfig } from 'next/config';
import { I18nextProvider } from 'react-i18next';
import {i18n} from './i18next.js';
import '../styles/default/main.scss';
import ThemedGlobalStyles from '../common/ThemedGlobalStyles';
import defaultTheme from 'public/static/themes/default/theme.json';

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
  },
};

const publicRuntimeConfig= {
  aplansApiBaseURL: 'https://api.watch.kausal.tech/v1',
  defaultPlanIdentifier: 'sunnydale',
  defaultThemeIdentifier: 'default',
  instanceType: 'development',
  supportedLanguages: ['en',],
};

setConfig({ publicRuntimeConfig });

let themes = [defaultTheme];

const additionalThemes = [
  'lpr-ilmasto',
  'hnh2035',
  'liiku',
  'hame-ilmasto',
  'tampere-ilmasto',
  'helsinki-kierto',
  'ktstrat',
  'hsy-kestava',
  'kpr',
  'viitasaari-ilmasto',
];

additionalThemes.forEach((value) => {
  const additionalTheme = require('public/static/themes/' + value + '/theme.json');
  themes.push(Object.assign({...defaultTheme}, additionalTheme),);
});

addDecorator((storyFN) => <ThemedGlobalStyles>{storyFN()}</ThemedGlobalStyles>);
addDecorator((storyFN) => <I18nextProvider i18n={i18n}>{storyFN()}</I18nextProvider>);
addDecorator(withThemesProvider(themes), ThemeProvider);
