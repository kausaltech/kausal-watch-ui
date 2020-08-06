import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, withTheme } from 'styled-components';
import Fonts from './fonts';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fontFamilySansSerif};
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightBase};
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      color: ${(props) => props.theme.brandDark};
    }
  }

  h1, h2, h3 , h4, h5 {
    line-height: ${(props) => props.theme.lineHeightMd};
    color: inherit;
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
      margin-top: 1.5rem;
      font-size: ${(props) => props.theme.fontSizeLg};
    }

    h4 {
      margin-top: 1.25rem;
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
`;

function ThemedGlobalStyles(props) {
  const {
    theme, children,
  } = props;

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
  theme: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
};

export default withTheme(ThemedGlobalStyles);
