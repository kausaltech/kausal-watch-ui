import React from 'react';

import type { Preview } from '@storybook/nextjs';
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

console.log('env', import.meta.env);
console.log('process.env', process.env);
export const themes = import.meta.env.THEMES ? JSON.parse(import.meta.env.THEMES) : [];
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
  decorators: [
    withKausalThemes({
      themes: themes,
      defaultTheme: 'default',
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
