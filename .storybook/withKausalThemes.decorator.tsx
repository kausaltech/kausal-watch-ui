import React from 'react';

import { DecoratorHelpers } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';

import { SharedIcons } from '@/components/common/Icon';
import { GlobalStyles } from '@/styles/GlobalStyles';

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

export function withKausalThemes({ themes, defaultTheme }) {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (Story, context) => {
    console.log('context', context);
    const selectedTheme = pluckThemeFromContext(context);
    const { themeOverride } = context.parameters.themes ?? {};

    const selected = themeOverride || selectedTheme || defaultTheme;
    // Add full theme object to args for use in story
    Object.assign(context.args, { activeTheme: themes[selected] });

    return (
      <>
        <link
          rel="stylesheet"
          type="text/css"
          href={`/static/themes/${themes[selected].mainCssFile}`}
        />
        <ThemeProvider theme={themes[selected]}>
          <GlobalStyles />
          <SharedIcons />
          {Story(context)}
        </ThemeProvider>
      </>
    );
  };
}
