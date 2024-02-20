import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
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
    withThemeFromJSXProvider({
      themes: themes,
      defaultTheme: 'default',
      Provider: ThemeProvider,
      GlobalStyles: GlobalStyles,
    }),
  ],
};

export default preview;
