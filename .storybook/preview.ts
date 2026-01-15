import type { Preview } from '@storybook/nextjs-vite';

import { withKausalThemes } from './withKausalThemes.decorator';

// Global loader to make themes available via context.loaded.themes
const preview: Preview = {
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
