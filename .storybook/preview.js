import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import ThemedGlobalStyles from '../common/ThemedGlobalStyles';

require('../styles/default/main.scss');

let defaultTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/default/_theme-variables.scss');
defaultTheme.name="Default";

let liiku = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/liiku/_theme-variables.scss');
liiku.name ="Liiku";

let hnh2035 = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/hnh2035/_theme-variables.scss');
hnh2035.name ="Hnh2035";

const themes = [defaultTheme, hnh2035, liiku];
addDecorator(storyFN => <ThemedGlobalStyles>{storyFN()}</ThemedGlobalStyles>);
addDecorator(withThemesProvider(themes));
