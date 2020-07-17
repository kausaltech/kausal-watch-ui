import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, withTheme } from 'styled-components';
import Fonts from './fonts';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fontFamilySansSerif};
  }

  a {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      color: ${(props) => props.theme.brandDark};
    }
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
