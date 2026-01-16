import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';

import { loadThemes } from './themes.ts';

// Load themes at build time (Node.js context)
const themes = await loadThemes();
const projectRoot = process.cwd();

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      nextConfigPath: path.resolve(projectRoot, 'next.config.ts'),
    },
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  staticDirs: ['../public'],
  env: (config) => ({
    ...config,
    THEMES: JSON.stringify(themes),
  }),
  async viteFinal(config) {
    // Configure Vite to resolve imports from the public directory
    // and expose THEMES environment variable to client code
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          public: path.resolve(projectRoot, 'public'),
        },
      },
      define: {
        // Vite's define replaces process.env.THEMES with this string literal at build time
        // themes is an object, so we stringify it once to create a JSON string
        // In preview.ts, this will be parsed back to an object with JSON.parse()
        'process.env.THEMES': JSON.stringify(JSON.stringify(themes)),
      },
    });
  },
  // Note: Path aliases from tsconfig.json are automatically handled by @storybook/nextjs-vite
};
export default config;
