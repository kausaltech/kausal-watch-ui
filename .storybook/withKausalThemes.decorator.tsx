import React from 'react';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { ThemeProvider } from '@emotion/react';

import { DecoratorHelpers } from '@storybook/addon-themes';
import type { Decorator } from '@storybook/nextjs-vite';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';

import ThemedGlobalStyles from '@common/themes/ThemedGlobalStyles';
import { initializeMuiTheme } from '@common/themes/mui-theme/theme';

import { DayjsLocaleProvider } from '@/common/dayjs';
import { SharedIcons } from '@/components/common/Icon';
import PlanProvider from '@/components/providers/PlanProvider';
import { WorkflowProvider } from '@/context/workflow-selector';
import { MOCK_PLAN } from '@/stories/mocks/plan.mocks';

import { getStorybookMessages } from './locales';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;
interface WithKausalThemesOptions {
  themes: Record<string, any>;
  defaultTheme: string;
}

export const withKausalThemes = ({ themes, defaultTheme }: WithKausalThemesOptions): Decorator => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (story, context) => {
    const selectedTheme = pluckThemeFromContext(context);
    // Access theme parameters directly from context (replaces deprecated useThemeParameters)
    const themeOverride = context.parameters.themes?.themeOverride;

    const selected = themeOverride || selectedTheme || defaultTheme;
    const theme = themes[selected];
    // From the locale toolbar (see globalTypes in preview.ts)
    const locale = (context.globals.locale as string | undefined) ?? 'en';
    const messages = getStorybookMessages(locale);
    const muiTheme = initializeMuiTheme(theme);

    // Add full theme object to args for use in story
    Object.assign(context.args, { activeTheme: theme });

    // Use mainCssFile from theme.json which includes the hashed filename (e.g., "au-boroondara/main-BESBTGCQ.css")
    // Fallback to constructed path if mainCssFile is not available
    const cssFile = theme?.mainCssFile || `${theme?.name}/main.css`;

    return (
      <>
        <link rel="stylesheet" type="text/css" href={`/static/themes/${cssFile}`} />
        {/*
         * An explicit `session` is what stops SessionProvider from fetching
         * `/api/auth/session` on mount. There is no such endpoint in Storybook
         * or under the Vitest browser runner, so the fetch returns an empty
         * body and next-auth logs a ClientFetchError for every story. Passing
         * `null` (rather than leaving it undefined) seeds the provider as
         * unauthenticated and skips the request.
         */}
        <SessionProvider session={null}>
          <WorkflowProvider
            initialWorkflow={undefined}
            workflowStates={[
              {
                id: 'PUBLISHED',
                description: 'Publiceret',
                __typename: 'WorkflowStateDescription',
              },
            ]}
          >
            <MuiThemeProvider theme={muiTheme}>
              <ThemeProvider theme={theme}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <DayjsLocaleProvider locale={locale}>
                    <PlanProvider plan={MOCK_PLAN}>
                      <ThemedGlobalStyles />
                      <SharedIcons />
                      {story(context)}
                    </PlanProvider>
                  </DayjsLocaleProvider>
                </NextIntlClientProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </WorkflowProvider>
        </SessionProvider>
      </>
    );
  };
};
