import React, { useEffect, useState } from 'react';

import type { Theme } from '@kausal/themes/types';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';

import { SharedIcons } from '@/components/common/Icon';
import { GlobalStyles } from '@/styles/GlobalStyles';

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

export function withKausalThemes({
  themes,
  defaultTheme,
}: {
  themes: string[];
  defaultTheme: string;
}) {
  initializeThemeState(themes, defaultTheme);
  return (Story, context) => {
    const selectedTheme = pluckThemeFromContext(context);
    const { themeOverride } = context.parameters.themes ?? {};
    const selected = themeOverride || selectedTheme || defaultTheme;
    // Add full theme object to args for use in story

    const allThemes = context.loaded.themes;
    const themeData = allThemes[selected];
    Object.assign(context.args, { activeTheme: themeData });
    return (
      <>
        <link rel="stylesheet" type="text/css" href={`/static/themes/${themeData.mainCssFile}`} />
        <ThemeProvider theme={themeData}>
          <SessionProvider session={null}>
            <GlobalStyles />
            <SharedIcons />
            {Story(context)}
          </SessionProvider>
        </ThemeProvider>
      </>
    );
  };
}
