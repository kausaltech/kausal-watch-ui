import { useContext } from 'react';
import PropTypes, { number, exact, string, oneOfType } from 'prop-types';
import { ThemeContext } from 'styled-components';

/* eslint-disable */
const defaultTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/default/_theme-variables.scss');

if (process.env.THEME_IDENTIFIER) {
  /* eslint-disable */
  const customTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/' + process.env.THEME_IDENTIFIER + '/_theme-variables.scss');
  if (!process.browser && process.env.SYNC_THEME) {
    const fs = require('fs');
    const YAML = require('yaml');

    fs.writeFileSync(`styles/${process.env.THEME_IDENTIFIER}.yaml`, YAML.stringify(customTheme));
    fs.writeFileSync(`styles/${process.env.THEME_IDENTIFIER}.json`, JSON.stringify(customTheme, null, 4));
  }
  Object.assign(defaultTheme, customTheme);
}
/* eslint-enable */

const theme = {};

export function useTheme() {
  return useContext(ThemeContext);
}

let css;

if (process.env.NODE_ENV === 'development') {
  const csstree = require('css-tree');

  css = (cssPropName) => (props, propName) => {
    let val = props[propName];
    if (val === null || val === undefined) {
      val = '';
    } else if (!isNaN(val)) {
      val = val.toString();
    }
    const ast = csstree.parse(val, { context: 'value' });
    const ret = csstree.lexer.matchProperty(cssPropName, ast);
    if (ret.error) {
      throw new Error(`${propName} validation failed: ${ret.error.message}`);
    }
  };
} else {
  css = () => () => {
    throw new Error('css validation attempted in production');
  };
}
export const themeProp = exact({
  actionColor: string.isRequired,
  actionColorFg: string.isRequired,
  actionCompletedColor: string.isRequired,
  actionLateColor: string.isRequired,
  actionMergedColor: string.isRequired,
  actionNotStartedColor: string.isRequired,
  actionOnTimeColor: string.isRequired,
  actionSeverelyLateColor: string.isRequired,
  badgeBorderRadius: oneOfType([string, number]).isRequired,
  badgeFontWeight: number.isRequired,
  badgePaddingX: string.isRequired,
  badgePaddingY: string.isRequired,
  brandDark: string.isRequired,
  brandLight: string.isRequired,
  brandNavBackground: string.isRequired,
  breakpointLg: string.isRequired,
  breakpointMd: string.isRequired,
  breakpointSm: string.isRequired,
  breakpointXl: string.isRequired,
  btnBorderRadius: css('border-radius'),
  btnBorderWidth: css('border-width'),
  cardBorderRadius: css('border-radius'),
  cardBorderWidth: css('border-width'),
  causalityDecreasesColor: css('color'),
  causalityIncreasesColor: css('color'),
  causalityIsPartOfColor: css('color'),
  componentActiveBg: string.isRequired,
  customSelectIndicator: string.isRequired,
  fontFamily: string.isRequired,
  fontFamilyBase: string.isRequired,
  fontFamilyMonospace: string.isRequired,
  fontFamilySansSerif: string.isRequired,
  fontSizeBase: string.isRequired,
  fontSizeLg: string.isRequired,
  fontSizeMd: string.isRequired,
  fontSizeSm: string.isRequired,
  fontSizeXl: string.isRequired,
  fontSizeXxl: string.isRequired,
  fontUrl: string.isRequired,
  fontWeightBase: number.isRequired,
  fontWeightBold: number.isRequired,
  fontWeightNormal: number.isRequired,
  formLabelFontWeight: number.isRequired,
  iconActionsUrl: string.isRequired,
  iconIndicatorsUrl: string.isRequired,
  iconsUrl: string.isRequired,
  imageOverlay: string.isRequired,
  inputBg: string.isRequired,
  inputBorderRadius: string.isRequired,
  inputBorderWidth: string.isRequired,
  inputBtnFocusColor: string.isRequired,
  inputBtnPaddingX: string.isRequired,
  inputBtnPaddingY: string.isRequired,
  inputLineHeight: number.isRequired,
  inputPaddingX: string.isRequired,
  inputPaddingY: string.isRequired,
  lineHeightBase: number.isRequired,
  lineHeightLg: number.isRequired,
  lineHeightMd: number.isRequired,
  lineHeightSm: number.isRequired,
  linkColor: string.isRequired,
  linkHoverColor: string.isRequired,
  listGroupActiveBg: string.isRequired,
  listGroupActiveBorderColor: string.isRequired,
  name: string.isRequired,
  navPillsLinkActiveBg: string.isRequired,
  neutralDark: string.isRequired,
  neutralLight: string.isRequired,
  operationalIndicatorColor: string.isRequired,
  operationalIndicatorColorFg: string.isRequired,
  space: string.isRequired,
  spaces: exact({
    s000: number.isRequired,
    s025: string.isRequired,
    s050: string.isRequired,
    s100: string.isRequired,
    s150: string.isRequired,
    s200: string.isRequired,
    s300: string.isRequired,
    s400: string.isRequired,
    s600: string.isRequired,
    s800: string.isRequired,
  }).isRequired,
  strategicIndicatorColor: string.isRequired,
  strategicIndicatorColorFg: string.isRequired,
  tableHeadBg: string.isRequired,
  tableHoverBg: string.isRequired,
  tacticalIndicatorColor: string.isRequired,
  tacticalIndicatorColorFg: string.isRequired,
  themeColors: exact({
    black: string.isRequired,
    danger: string.isRequired,
    dark: string.isRequired,
    info: string.isRequired,
    light: string.isRequired,
    primary: string.isRequired,
    secondary: string.isRequired,
    success: string.isRequired,
    warning: string.isRequired,
    white: string.isRequired,
  }).isRequired,
  themeCustomStylesUrl: string.isRequired,
  themeLogoUrl: string.isRequired,
  themeLogoWhiteUrl: string.isRequired,
});

export function setTheme(newTheme) {
  const out = { ...defaultTheme, ...newTheme };
  PropTypes.checkPropTypes({ theme: themeProp.isRequired }, { theme: out }, 'prop', 'GlobalTheme');

  Object.getOwnPropertyNames(theme).forEach((prop) => delete theme[prop]);
  Object.assign(theme, out);
}

export default theme;
