import type { StorybookConfig } from '@storybook/nextjs-vite';
import { promises as fs } from 'fs';
import path from 'path';

import { loadThemes } from './themes.ts';

// Load themes at build time (Node.js context)
const themes = await loadThemes();
const projectRoot = process.cwd();

/**
 * Optional, machine-local (gitignored) list of backend instances and their
 * plans, used by dev-tool stories such as IndicatorExplorer. Shape:
 * [{ "name": "EU", "apiUrl": "https://api...", "plans": ["plan-id", ...] }]
 */
async function loadLocalInstances() {
  try {
    const data = await fs.readFile(path.join(projectRoot, '.env.instances.local.json'), 'utf8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}
const localInstances = await loadLocalInstances();

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
        alias: [
          { find: '@/public', replacement: path.resolve(projectRoot, 'public') },
          { find: '@common', replacement: path.resolve(projectRoot, 'kausal_common/src') },
          { find: '@', replacement: path.resolve(projectRoot, 'src') },
          { find: 'public', replacement: path.resolve(projectRoot, 'public') },
        ],
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
        },
      },
      server: {
        fs: {
          allow: [path.resolve(projectRoot, '.storybook'), projectRoot],
        },
      },
      define: {
        // Vite's define replaces process.env.THEMES with this string literal at build time
        // themes is an object, so we stringify it once to create a JSON string
        // In preview.ts, this will be parsed back to an object with JSON.parse()
        'process.env.THEMES': JSON.stringify(JSON.stringify(themes)),
        // null when .env.instances.local.json does not exist
        'process.env.LOCAL_INSTANCES': JSON.stringify(JSON.stringify(localInstances)),
      },
    });
  },
  // Note: Path aliases from tsconfig.json are automatically handled by @storybook/nextjs-vite
};
export default config;
