import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

require('../styles/default/main.scss');

let theme2 = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/default/_theme-variables.scss');
theme2.name="loaded";

let theme = {
    name: "default",
    themeColors: {
        light: "#cccccc",
        red:"rgb(220, 53, 69)",
        yellow:"rgb(255, 193, 7)",
        green:"rgb(40, 167, 69)",
    },
}
const themes = [theme, theme2];
addDecorator(withThemesProvider(themes));
