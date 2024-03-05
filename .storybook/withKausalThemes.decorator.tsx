import React from 'react';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';
import { CombinedIconSymbols } from '../components/common/Icon';
import { GlobalStyles } from '../styles/GlobalStyles';

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } =
  DecoratorHelpers;

export const withKausalThemes = ({ themes, defaultTheme }) => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (story, context) => {
    const selectedTheme = pluckThemeFromContext(context);
    const { themeOverride } = useThemeParameters();

    const selected = themeOverride || selectedTheme || defaultTheme;
    // Add full theme object to args for use in story
    Object.assign(context.args, { activeTheme: themes[selected] });

    return (
      <ThemeProvider theme={themes[selected]}>
        <GlobalStyles />
        <CombinedIconSymbols />
        {story(context)}
      </ThemeProvider>
    );
  };
};
