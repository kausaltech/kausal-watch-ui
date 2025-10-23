import React from 'react';

import type { Preview, ReactPreview } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';

import PlanProvider from '@/components/providers/PlanProvider';
import { WorkflowProvider } from '@/context/workflow-selector';
import '@/styles/default/main.scss';

import a11yMessages from '../locales/en/a11y.json';
import actionsMessages from '../locales/en/actions.json';
import commonMessages from '../locales/en/common.json';
import { MOCK_PLAN } from '../stories/mocks/plan.mocks';
import { withKausalThemes } from './withKausalThemes.decorator';

const themes = import.meta.env.STORYBOOK_THEMES ? import.meta.env.STORYBOOK_THEMES.split(',') : [];

const messages = { ...a11yMessages, ...actionsMessages, ...commonMessages };

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [
    async (context) => {
      const allThemes = {};

      for (const themeId of themes) {
        try {
          const theme = await import(`../public/static/themes/${themeId}/theme.json`);
          allThemes[themeId] = theme.default;
        } catch (error) {
          console.error(`> Theme with identifier ${themeId} not found`);
          console.error(error);
          continue;
        }
      }
      return {
        themes: allThemes,
      };
    },
  ],
  decorators: [
    withKausalThemes({
      defaultTheme: 'default',
      themes,
    }),
    (Story) => (
      <SessionProvider>
        <NextIntlClientProvider locale={'en'} messages={messages}>
          <PlanProvider plan={MOCK_PLAN}>
            <WorkflowProvider workflowStates={[]}>
              <Story />
            </WorkflowProvider>
          </PlanProvider>
        </NextIntlClientProvider>
      </SessionProvider>
    ),
  ],
};

export default preview;
