import React from 'react';

import { DecoratorHelpers } from '@storybook/addon-themes';
import type { Decorator } from '@storybook/nextjs-vite';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'styled-components';

import a11yMessages from '@/../locales/en/a11y.json';
import actionsMessages from '@/../locales/en/actions.json';
import commonMessages from '@/../locales/en/common.json';
import { SharedIcons } from '@/components/common/Icon';
import PlanProvider from '@/components/providers/PlanProvider';
import { WorkflowProvider } from '@/context/workflow-selector';
import { MOCK_PLAN } from '@/stories/mocks/plan.mocks';
import { GlobalStyles } from '@/styles/GlobalStyles';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

const messages = { ...a11yMessages, ...actionsMessages, ...commonMessages };
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
    // Add full theme object to args for use in story
    Object.assign(context.args, { activeTheme: theme });

    // Use mainCssFile from theme.json which includes the hashed filename (e.g., "au-boroondara/main-BESBTGCQ.css")
    // Fallback to constructed path if mainCssFile is not available
    const cssFile = theme?.mainCssFile || `${theme?.name}/main.css`;

    return (
      <>
        <link rel="stylesheet" type="text/css" href={`/static/themes/${cssFile}`} />
        <SessionProvider>
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
            <ThemeProvider theme={theme}>
              <NextIntlClientProvider locale={'en'} messages={messages}>
                <PlanProvider plan={MOCK_PLAN}>
                  <GlobalStyles />
                  <SharedIcons />
                  {story(context)}
                </PlanProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
          </WorkflowProvider>
        </SessionProvider>
      </>
    );
  };
};
