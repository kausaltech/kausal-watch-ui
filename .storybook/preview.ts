import type { Preview } from '@storybook/react';
import { withKausalThemes } from './withKausalThemes.decorator';
import '@/styles/default/main.scss';
const themes = process.env.THEMES ? JSON.parse(process.env.THEMES) : [];

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
  ],
};

export default preview;
