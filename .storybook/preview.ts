import type { Preview } from '@storybook/nextjs-vite';

import { STORYBOOK_LOCALES, getLocaleLabel } from './locales';
import { withKausalThemes } from './withKausalThemes.decorator';

// Global loader to make themes available via context.loaded.themes
const preview: Preview = {
  // A locale switcher in the toolbar, next to the theme picker. The decorator
  // feeds the choice to next-intl and dayjs, so translations, number and date
  // formatting, chart locale packs and aria descriptions all follow it.
  globalTypes: {
    locale: {
      description: 'Locale',
      toolbar: {
        icon: 'globe',
        items: STORYBOOK_LOCALES.map((locale) => ({
          value: locale,
          title: getLocaleLabel(locale),
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'en',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    nextjs: {
      // Enable App Router support - this provides router mocks for useRouter, usePathname, useSearchParams
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
        segments: [],
      },
    },
  },
  loaders: [
    async () => {
      return { themes: process.env.THEMES ? JSON.parse(process.env.THEMES) : {} };
    },
  ],
  decorators: [
    // Access themes from loader via context.loaded.themes
    (Story, context) => {
      const themes = context.loaded?.themes as Record<string, any>;
      const decorator = withKausalThemes({
        themes: themes,
        defaultTheme: 'default',
      });
      return decorator(Story, context);
    },
  ],
};

export default preview;
