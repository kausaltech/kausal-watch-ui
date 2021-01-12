import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { I18nextProvider } from 'react-i18next';
import { setConfig } from 'next/config';
import { i18n } from './i18n';

import ThemedGlobalStyles from '../common/ThemedGlobalStyles';

const publicRuntimeConfig= {
  aplansApiBaseURL: 'https://api.watch.kausal.tech/v1',
  defaultPlanIdentifier: 'sunnydale',
  defaultThemeIdentifier: 'default',
  instanceType: 'development',
  supportedLanguages: ['en',],
};

setConfig({ publicRuntimeConfig });

require('../styles/default/main.scss');

let defaultTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/default/_theme-variables.scss');
let themes = [defaultTheme];

const additionalThemes = [
  'lpr-ilmasto',
  'hnh2035',
  'liiku',
  'lahti-ilmasto',
  'tampere-ilmasto',
];

additionalThemes.forEach((value) => {
  const additionalTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + value + '/_theme-variables.scss');
  themes.push(Object.assign({...defaultTheme}, additionalTheme),);
});

addDecorator((storyFN) => <ThemedGlobalStyles>{storyFN()}</ThemedGlobalStyles>);
addDecorator((storyFN) => <I18nextProvider i18n={i18n}>{storyFN()}</I18nextProvider>);
addDecorator(withThemesProvider(themes));
