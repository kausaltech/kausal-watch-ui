import { useContext } from 'react';
import PropTypes, { number, exact, string, oneOfType, bool, array, object } from 'prop-types';
import { ThemeContext } from 'styled-components';
import { cloneDeep, merge } from 'lodash';

import type { StandardProperties as css } from 'csstype';


/* eslint-disable */
const defaultTheme = require('public/static/themes/default/theme.json');

const themeCache = {};

const theme = {};

export function useTheme() {
  return useContext<Theme>(ThemeContext);
}

let cssv;

if (process.env.NODE_ENV === 'development') {
  const csstree = require('css-tree');

  cssv = (cssPropName) => (props, propName) => {
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
  cssv = () => () => {
    throw new Error('css validation attempted in production');
  };
}

export type Theme = {
  actionColor: string,
  actionColorFg: string,
  actionCompletedColor: string,
  actionLateColor: string,
  actionMergedColor: string,
  actionNotStartedColor: string,
  actionOnTimeColor: string,
  actionSeverelyLateColor: string,
  badgeBackground: css['color'],
  badgeColor: css['color'],
  badgeBorderRadius: string|number,
  badgeFontWeight: number,
  badgePaddingX: string,
  badgePaddingY: string,
  brandDark: css['color'],
  brandLight: css['color'],
  brandNavBackground: css['color'],
  brandNavColor: css['color'],
  breakpointLg: string,
  breakpointMd: string,
  breakpointSm: string,
  breakpointXl: string,
  btnBorderRadius: css['borderRadius'],
  btnBorderWidth: css['borderWidth'],
  cardBorderRadius: css['borderRadius'],
  cardBorderWidth: css['borderWidth'],
  causalityDecreasesColor: css['color'],
  causalityIncreasesColor: css['color'],
  causalityIsPartOfColor: css['color'],
  combinedIconsFilename: string,
  componentActiveBg: string,
  customSelectIndicator: string,
  fontFamily: string,
  fontFamilyContent: string,
  fontFamilyTiny: string,
  fontFamilyHeadings: string,
  fontFamilyFallback: string,
  fontFamilyFallbackHeadings: string,
  fontSizeBase: string,
  fontSizeLg: string,
  fontSizeMd: string,
  fontSizeSm: string,
  fontSizeXl: string,
  fontSizeXxl: string,
  fontUrl?: string,
  fontWeightBase: number,
  fontWeightBold: number,
  fontWeightNormal: number,
  navLogoVisible: boolean,
  navTitleVisible: boolean,
  footerLogoPlacement: string,
  footerLogoSize?: string,
  footerLogoLink?: string,
  footerBackgroundColor: css['color'],
  footerColor: css['color'],
  formLabelFontWeight: number,
  graphColors: {
    grey000: css['color'],
    grey005: css['color'],
    grey010: css['color'],
    grey020: css['color'],
    grey030: css['color'],
    grey040: css['color'],
    grey050: css['color'],
    grey060: css['color'],
    grey070: css['color'],
    grey080: css['color'],
    grey090: css['color'],
    grey100: css['color'],
    green010: css['color'],
    green030: css['color'],
    green050: css['color'],
    green070: css['color'],
    green090: css['color'],
    red010: css['color'],
    red030: css['color'],
    red050: css['color'],
    red070: css['color'],
    red090: css['color'],
    blue010: css['color'],
    blue030: css['color'],
    blue050: css['color'],
    blue070: css['color'],
    blue090: css['color'],
    yellow010: css['color'],
    yellow030: css['color'],
    yellow050: css['color'],
    yellow070: css['color'],
    yellow090: css['color'],
  },
  headingsColor: css['color'],
  headingsFontWeight: css['fontWeight'],
  iconActionsUrl: string,
  iconIndicatorsUrl: string,
  iconsUrl: string,
  imageOverlay: string,
  inputBg: string,
  inputBorderRadius: string,
  inputBorderWidth: string,
  inputBtnFocusColor: string,
  inputBtnPaddingX: string,
  inputBtnPaddingY: string,
  inputLineHeight: number,
  inputPaddingX: string,
  inputPaddingY: string,
  lineHeightBase: number,
  lineHeightLg: number,
  lineHeightMd: number,
  lineHeightSm: number,
  linkColor: css['color'],
  linkHoverColor: string,
  listGroupActiveBg: string,
  listGroupActiveBorderColor: string,
  name: string,
  navPillsLinkActiveBg: string,
  neutralDark: css['color'],
  neutralLight: css['color'],
  operationalIndicatorColor: css['color'],
  operationalIndicatorColorFg: css['color'],
  space: string,
  spaces: {
    s000: number,
    s025: string,
    s050: string,
    s100: string,
    s150: string,
    s200: string,
    s300: string,
    s400: string,
    s600: string,
    s800: string,
  },
  strategicIndicatorColor: string,
  strategicIndicatorColorFg: string,
  tableHeadBg: string,
  tableHoverBg: string,
  tacticalIndicatorColor: string,
  tacticalIndicatorColorFg: string,
  themeColors: {
    black: string,
    dark: string,
    light: string,
    white: string,
  },
  themeCustomStylesUrl: string,
  themeLogoUrl: string,
  themeLogoWhiteUrl: string,
  settings: {
    dashboard: {
      showResponsibles: boolean,
      showIndicators: boolean,
    },
    categories: {
      showIdentifiers: boolean,
      filterIndicatorsByAllLevels: boolean,
    },
    fundingInstruments: object[],
    otherLogos: object[],
    attentionBannerContent?: object,
    footerLogoOnly?: boolean,
    navigationLogoOnly?: boolean,
    a11y?: {
      responsibleBody?: string,
      feedbackEmail?: string
    },
    frontHero?: {
      cardPlacement?: string,
    },
  },
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
  badgeBackground: cssv('color'),
  badgeColor: cssv('color'),
  badgeBorderRadius: oneOfType([string, number]).isRequired,
  badgeFontWeight: number.isRequired,
  badgePaddingX: string.isRequired,
  badgePaddingY: string.isRequired,
  brandDark: string.isRequired,
  brandLight: string.isRequired,
  brandNavBackground: cssv('color'),
  brandNavColor: cssv('color'),
  breakpointLg: string.isRequired,
  breakpointMd: string.isRequired,
  breakpointSm: string.isRequired,
  breakpointXl: string.isRequired,
  btnBorderRadius: cssv('border-radius'),
  btnBorderWidth: cssv('border-width'),
  cardBorderRadius: cssv('border-radius'),
  cardBorderWidth: cssv('border-width'),
  causalityDecreasesColor: cssv('color'),
  causalityIncreasesColor: cssv('color'),
  causalityIsPartOfColor: cssv('color'),
  combinedIconsFilename: string.isRequired,
  componentActiveBg: string.isRequired,
  customSelectIndicator: string.isRequired,
  fontFamily: string.isRequired,
  fontFamilyContent: string.isRequired,
  fontFamilyTiny: string.isRequired,
  fontFamilyHeadings: string.isRequired,
  fontFamilyFallback: string.isRequired,
  fontFamilyFallbackHeadings: string.isRequired,
  fontSizeBase: string.isRequired,
  fontSizeLg: string.isRequired,
  fontSizeMd: string.isRequired,
  fontSizeSm: string.isRequired,
  fontSizeXl: string.isRequired,
  fontSizeXxl: string.isRequired,
  fontUrl: string,
  fontWeightBase: number.isRequired,
  fontWeightBold: number.isRequired,
  fontWeightNormal: number.isRequired,
  navLogoVisible: bool.isRequired,
  navTitleVisible: bool.isRequired,
  footerLogoPlacement: string.isRequired,
  footerLogoSize: string,
  footerLogoLink: string,
  footerBackgroundColor: cssv('color'),
  footerColor: cssv('color'),
  formLabelFontWeight: number.isRequired,
  graphColors: exact({
    grey000: cssv('color'),
    grey005: cssv('color'),
    grey010: cssv('color'),
    grey020: cssv('color'),
    grey030: cssv('color'),
    grey040: cssv('color'),
    grey050: cssv('color'),
    grey060: cssv('color'),
    grey070: cssv('color'),
    grey080: cssv('color'),
    grey090: cssv('color'),
    grey100: cssv('color'),
    green010: cssv('color'),
    green030: cssv('color'),
    green050: cssv('color'),
    green070: cssv('color'),
    green090: cssv('color'),
    red010: cssv('color'),
    red030: cssv('color'),
    red050: cssv('color'),
    red070: cssv('color'),
    red090: cssv('color'),
    blue010: cssv('color'),
    blue030: cssv('color'),
    blue050: cssv('color'),
    blue070: cssv('color'),
    blue090: cssv('color'),
    yellow010: cssv('color'),
    yellow030: cssv('color'),
    yellow050: cssv('color'),
    yellow070: cssv('color'),
    yellow090: cssv('color'),
  }).isRequired,
  headingsColor: cssv('color'),
  headingsFontWeight: oneOfType([string, number]).isRequired,
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
    dark: string.isRequired,
    light: string.isRequired,
    white: string.isRequired,
  }).isRequired,
  themeCustomStylesUrl: string.isRequired,
  themeLogoUrl: string.isRequired,
  themeLogoWhiteUrl: string.isRequired,
  settings: exact({
    dashboard: exact({
      showResponsibles: bool.isRequired,
      showIndicators: bool.isRequired,
    }),
    categories: exact({
      showIdentifiers: bool.isRequired,
      filterIndicatorsByAllLevels: bool.isRequired,
    }),
    fundingInstruments: array.isRequired,
    otherLogos: array.isRequired,
    attentionBannerContent: object,
    footerLogoOnly: bool,
    navigationLogoOnly: bool,
    a11y: exact({
      responsibleBody: string,
      feedbackEmail: string
    }),
    frontHero: exact({
      cardPlacement: string,
    }),
  }),
});

export function mergeWithDefaultTheme(newTheme) {
  // Merge with default theme recursively
  return merge(cloneDeep(defaultTheme), newTheme);
}

export function setTheme(newTheme) {
  const out = mergeWithDefaultTheme(newTheme);
  PropTypes.checkPropTypes({ theme: themeProp.isRequired }, { theme: out }, 'prop', 'GlobalTheme');

  Object.getOwnPropertyNames(theme).forEach((prop) => delete theme[prop]);
  Object.assign(theme, out);
}

export async function applyTheme(themeIdentifier) {
  let themeProps;
  try {
    const theme = await import(`public/static/themes/${themeIdentifier}/theme.json`);
    themeProps = theme.default;
  } catch (error) {
    console.error(`Theme with identifier ${themeIdentifier} not found`);
    console.error(error);
  }
  if (!themeProps) {
    themeProps = {};
  }
  setTheme(themeProps);
}

export function getThemeCSS(themeIdentifier: string) {
  return `/static/themes/${themeIdentifier}/main.css`;
}

export default theme;