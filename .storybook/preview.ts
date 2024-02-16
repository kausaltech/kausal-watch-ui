import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { getThemeCSS, loadTheme } from '../common/theme';
import defaultTheme from '../public/static/themes/default/theme.json';

const defaultThemeUrl = 'public/static/themes/default/theme.json';

/*
const theme = await import(
  `@/public/static/themes/default/theme.json`
);
*/

/*
  loaders: [
    async () => ({
      themedefault: await (await import(defaultThemeUrl)).json(),
    }),
  ],
  */
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
      themes: {
        light: defaultTheme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: GlobalStyles,
    }),
  ],
};

export default preview;
