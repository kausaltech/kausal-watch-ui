import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

require('../styles/default/main.scss');

let defaultTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/default/_theme-variables.scss');
defaultTheme.name="Default";

let testTheme = {
    name: "Test",
    themeColors: {
        light: "#cccccc",
        red:"rgb(220, 53, 69)",
        yellow:"rgb(255, 193, 7)",
        green:"rgb(40, 167, 69)",
    },
}

let helsinkiIlmastovahti = {
    name: "Helsingin Ilmastovahti",
    "helCopper": "rgb(0, 215, 167)",
    "helBus": "rgb(0, 0, 191)",
    "helCoat": "rgb(0, 114, 198)",
    "helFog": "rgb(159, 201, 235)",
    "helMetro": "rgb(253, 79, 0)",
    "helBrick": "rgb(189, 39, 25)",
    "helSuomenlinna": "rgb(245, 163, 199)",
    "helEngel": "rgb(255, 233, 119)",
    "helTram": "rgb(0, 146, 70)",
    "helSummer": "rgb(255, 198, 30)",
    "helSilver": "rgb(222, 223, 225)",
    "helGold": "rgb(194, 162, 81)",
    "helBlack": "rgb(35, 31, 32)",
    "helDark": "rgb(82, 90, 101)",
    "helGray": "rgb(171, 178, 189)",
    "helLight": "rgb(235, 237, 241)",
    "helWhite": "rgb(255, 255, 255)",
    "red": "rgb(224, 85, 99)",
    "yellow": "rgb(236, 161, 12)",
    "green": "rgb(60, 213, 95)",
    "cyan": "rgb(82, 164, 202)",
    "brandLight": "rgb(255, 206, 67)",
    "brandDark": "rgb(0, 121, 45)",
    "neutralLight": "rgb(255, 206, 67)",
    "neutralDark": "rgb(0, 121, 45)",
    "themeColors": {
      "primary": "rgb(0, 121, 45)",
      "secondary": "rgb(255, 206, 67)",
      "success": "rgb(60, 213, 95)",
      "info": "rgb(82, 164, 202)",
      "warning": "rgb(236, 161, 12)",
      "danger": "rgb(224, 85, 99)",
      "light": "rgb(235, 237, 241)",
      "dark": "rgb(82, 90, 101)",
      "black": "rgb(35, 31, 32)",
      "white": "rgb(255, 255, 255)"
    },
    "imageOverlay": "rgb(0, 121, 45)",
    "linkColor": "rgb(0, 121, 45)",
    "linkHoverColor": "rgb(0, 85, 32)",
    "componentActiveBg": "rgb(0, 121, 45)",
    "navPillsLinkActiveBg": "rgb(0, 121, 45)",
    "listGroupActiveBg": "rgb(0, 121, 45)",
    "listGroupActiveBorderColor": "rgb(0, 121, 45)",
    "brandNavBackground": "rgb(0, 121, 45)",
    "navbarDarkColor": "rgba(255, 255, 255, 0.5)",
    "navbarDarkHoverColor": "rgba(255, 255, 255, 0.75)",
    "navbarDarkActiveColor": "rgb(255, 255, 255)",
    "navbarDarkDisabledColor": "rgba(255, 255, 255, 0.25)",
    "navbarDarkTogglerIconBg": "str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\"), \"#\", \"%23\")",
    "navbarDarkTogglerBorderColor": "rgba(0, 0, 0, 0)",
    "navbarLightColor": "rgb(35, 31, 32)",
    "navbarLightHoverColor": "rgba(35, 31, 32, 0.7)",
    "navbarLightActiveColor": "rgba(35, 31, 32, 0.9)",
    "navbarLightDisabledColor": "rgba(35, 31, 32, 0.3)",
    "navbarLightTogglerIconBg": "str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#231f20' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\"), \"#\", \"%23\")",
    "navbarLightTogglerBorderColor": "rgba(0, 0, 0, 0)",
    "actionColor": "rgb(0, 121, 45)",
    "operationalIndicatorColor": "rgb(23, 235, 186)",
    "tacticalIndicatorColor": "rgb(183, 219, 247)",
    "strategicIndicatorColor": "rgb(0, 110, 178)",
    "actionColorFg": "rgb(255, 255, 255)",
    "operationalIndicatorColorFg": "rgb(35, 31, 32)",
    "tacticalIndicatorColorFg": "rgb(35, 31, 32)",
    "strategicIndicatorColorFg": "rgb(255, 255, 255)",
    "causalityIncreasesColor": "rgb(39, 183, 72)",
    "causalityDecreasesColor": "rgb(216, 42, 59)",
    "causalityIsPartOfColor": "rgb(128, 128, 128)",
    "breakpointSm": "576px",
    "breakpointMd": "768px",
    "breakpointLg": "992px",
    "breakpointXl": "1200px"
  }

const themes = [defaultTheme, helsinkiIlmastovahti];
addDecorator(withThemesProvider(themes));
