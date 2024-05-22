import React from 'react';
import type { Preview } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import commonMessages from '@/locales/en/common.json';
import a11yMessages from '@/locales/en/a11y.json';
import actionsMessages from '@/locales/en/actions.json';
import { withKausalThemes } from './withKausalThemes.decorator';
import PlanProvider from '../components/providers/PlanProvider';
import { MOCK_PLAN } from '../stories/mocks/plan.mocks';
import '@/styles/default/main.scss';

export const themes = process.env.THEMES ? JSON.parse(process.env.THEMES) : [];
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
            <Story />
          </PlanProvider>
        </NextIntlClientProvider>
      </SessionProvider>
    ),
  ],
};

export default preview;
