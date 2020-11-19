import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import ThemedGlobalStyles from '../common/ThemedGlobalStyles';

require('../styles/default/main.scss');

let defaultTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/default/_theme-variables.scss');

let liiku = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/liiku/_theme-variables.scss');

let hnh2035 = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/hnh2035/_theme-variables.scss');

let lprilmasto = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/lpr-ilmasto/_theme-variables.scss');

const themes = [
    defaultTheme,
    Object.assign({...defaultTheme}, hnh2035),
    Object.assign({...defaultTheme}, liiku),
    Object.assign({...defaultTheme}, lprilmasto),
];
addDecorator(storyFN => <ThemedGlobalStyles>{storyFN()}</ThemedGlobalStyles>);
addDecorator(withThemesProvider(themes));
