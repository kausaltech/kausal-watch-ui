'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: auto !important;
  }

  // Use themeable color on keyboard navigation focus
  :focus-visible {
    outline: 2px solid ${(props) => props.theme.inputBtnFocusColor};
    outline-offset: 2px;
  }

  body {
    font-family: ${(props) =>
      props.theme.fontFamily !== ''
        ? `${props.theme.fontFamily}, ${props.theme.fontFamilyFallback}`
        : props.theme.fontFamilyFallback};
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightBase};
    text-rendering: optimizeLegibility;
    background: ${(props) => props.theme.themeColors.white};
    color: ${(props) => props.theme.themeColors.black};
  }

  a {
    color: ${(props) => props.theme.linkColor};
    text-decoration: none;
    background-color: transparent;

    &:hover {
      color: ${(props) => props.theme.linkColor};
      text-decoration: underline;
    }
  }

  // To prevent browser tooltip on titled inline svgs
  svg {
    pointer-events: none;
  }

  h1, h2, h3 , h4, h5, h6 {
    font-family: ${(props) =>
      props.theme.fontFamilyHeadings !== ''
        ? `${props.theme.fontFamilyHeadings}, ${props.theme.fontFamilyFallbackHeadings}`
        : props.theme.fontFamilyFallbackHeadings};
    font-weight: ${(props) => props.theme.headingsFontWeight};
    line-height: ${(props) => props.theme.lineHeightMd};
    color: ${(props) => props.theme.headingsColor};
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizeXxl};
    text-transform: ${(props) => props.theme.headingsTextTransform};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeXl};
    text-transform: ${(props) => props.theme.headingsTextTransform};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizeLg};
  }

  h4 {
    font-size: ${(props) => props.theme.fontSizeMd};
  }

  h5 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }

  h6 {
    font-size: ${(props) => props.theme.fontSizeSm};
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  hr {
    margin: ${(props) => props.theme.spaces.s100} 0;
    color: ${(props) => props.theme.themeColors.dark};
    background-color: currentColor;
    border: 0;
  }

  hr:not([size]) {
    height: 1px;
  }

  .icon {
    fill: currentColor;
    vertical-align: -0.1em;
    overflow: hidden;
  }

  blockquote {
    margin-left: 2em;
    padding-left: 1em;
    border-left: #cccccc 3px solid;
  }

  .text-content {
    font-family: ${(props) =>
      `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};

    a {
      text-decoration: underline;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-all;
      word-break: break-word;

      &:hover {
        text-decoration: none;
      }
    }

    h2 {
      margin-top: ${(props) => props.theme.spaces.s200};
      margin-bottom: ${(props) => props.theme.spaces.s100};
      font-size: ${(props) => props.theme.fontSizeLg};
    }

    h3 {
      margin-top: ${(props) => props.theme.spaces.s200};
      margin-bottom: ${(props) => props.theme.spaces.s100};
      font-size: ${(props) => props.theme.fontSizeMd};
    }

    h4 {
      margin-top: ${(props) => props.theme.spaces.s150};
      margin-bottom: ${(props) => props.theme.spaces.s050};
      font-size: ${(props) => props.theme.fontSizeBase};

      &:first-child {
        margin-top: 0;
      }
    }

    h5 {
      font-size: ${(props) => props.theme.fontSizeBase}
    }

    ul {
      list-style: disc;
    }
  }

  .richtext-image {
    margin: ${(props) => props.theme.spaces.s300} auto;
    max-width: 100%;

    &.full-width {
      display: block;
      height: auto;
    }

    &.left {
      display: inline-block;
      margin: ${(props) => props.theme.spaces.s150};
      margin-left: 0;
      float: left;
    }

    &.right {
      display: inline-block;
      margin: ${(props) => props.theme.spaces.s150};
      margin-right: 0;
      float: right;
    }
  }

  thead {
    background-color: ${(props) => props.theme.tableHeadBg};
  }

  .table-hover > tbody > tr:hover {
    background-color: ${(props) => props.theme.tableHoverBg};
  }

  /* Alert headers follow alert text color */
  .alert {
    h1, h2, h3, h4, h5, h6 {
      color: inherit;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }
  /* Fix for flickering tooltip bug */
  .tooltip {
    pointer-events: none;
  }

  /* Larger tooltip for emission scope icon */
  .emission-scope-icon-tooltip {
    text-align: left;
    min-width: 20em;
  }

  /* Form styles overrides */

  /* Validaded invalid field has color background */
  .was-validated .form-control:invalid,
  .form-control.is-invalid,
  .was-validated .custom-select:invalid,
  .custom-select.is-invalid {
    background-color: rgba(${(props) => props.theme.graphColors.red070}, 0.15);
  }

  @media print {
    p,
    h1, h2, h3, h4, h5, h6,
    .card,
    .btn,
    .js-plotly-plot, .plot-container, .plotly,
    .causal-chain-visualisation
    {
      break-inside: avoid-page;
    }
  }

  .tooltip {
    line-height: 1.25;
  }

  // TODO: Temporary front-end fix to increase font-size for simple language
  .custom-leichte-sprache {
    font-size: 125%;
  }
`;
