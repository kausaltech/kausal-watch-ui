import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, withTheme } from 'styled-components';
import { themeProp } from 'common/theme';
import Fonts from './fonts';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fontFamilySansSerif};
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightBase};
    text-rendering: optimizeLegibility;
    background: ${(props) => props.theme.themeColors.white};
  }

  a {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      color: ${(props) => props.theme.brandDark};
    }
  }

  // To prevent browser tooltip on titled inline svgs
  svg {
    pointer-events: none;
  }

  h1, h2, h3 , h4, h5 {
    line-height: ${(props) => props.theme.lineHeightMd};
    color: inherit;
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizeXxl};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeXl};
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

    h3 {
      margin-top: ${(props) => props.theme.spaces.s150};
      font-size: ${(props) => props.theme.fontSizeLg};
    }

    h4 {
      margin-top: ${(props) => props.theme.spaces.s150};
      font-size: ${(props) => props.theme.fontSizeMd};

      &:first-child {
        margin-top: 0;
      }
    }

    h5 {
      font-size: ${(props) => props.theme.fontSizeBase}
    }
  }

  thead {
    background-color: ${(props) => props.theme.tableHeadBg};
  }

  .table-hover > tbody > tr:hover {
    background-color: ${(props) => props.theme.tableHoverBg};
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
    background-color: rgba(${(props) => props.theme.themeColors.danger}, 0.15);
  }


  .form-control, .custom-select {
    &:hover {
      border-color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

function ThemedGlobalStyles({ theme, children }) {
  if (typeof window !== 'undefined') {
    const { fontUrl, fontFamily } = theme;
    Fonts(fontFamily, fontUrl);
  }

  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}

ThemedGlobalStyles.defaultProps = {
  children: '',
};

ThemedGlobalStyles.propTypes = {
  theme: themeProp.isRequired,
  children: PropTypes.node,
};

export default withTheme(React.memo(ThemedGlobalStyles));
