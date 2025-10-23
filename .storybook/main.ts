import * as fs from 'node:fs';
import * as path from 'node:path';

import type { Theme } from '@kausal/themes/types';
import type { StorybookConfig } from '@storybook/nextjs-vite';

// Load all the directories in the themes directory
function loadDirectoryNames(directoryPath) {
  return fs.readdirSync(directoryPath).filter((file) => {
    return fs.statSync(path.join(directoryPath, file)).isDirectory();
  });
}

const __dirname = import.meta.dirname;

function loadThemes(): Record<string, Theme> {
  const themesDirectory = path.join(__dirname, '../public/static/themes');
  const themesList = ['default'];
  try {
    themesList.push(...loadDirectoryNames(themesDirectory));
  } catch (err) {
    console.error(
      '⚠️ Error reading themes directory, please try clearing the broken symlinks from /public/static/themes',
      err
    );
  }

  // Populate available theme data
  const themes = {};
  themesList.forEach((themeName) => {
    const themeFile = path.join(themesDirectory, themeName, 'theme.json');
    if (!fs.existsSync(themeFile)) {
      return;
    }
    const themePath = path.join(themesDirectory, themeName, 'theme.json');
    try {
      const data = fs.readFileSync(themePath, { encoding: 'utf8' });
      themes[themeName] = JSON.parse(data);
    } catch (err) {
      console.error(`⚠️ Error reading theme data for ${themeName}`, err);
    }
  });

  console.log('Loaded themes data', Object.keys(themes));
  return themes;
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-themes', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      builder: {
        //useSWC: true, // Enables SWC support
      },
    },
  },

  logLevel: 'info',
  staticDirs: ['../public'],

  env: (envConfig) => {
    const out = {
      ...envConfig,
      PROJECT_ID: 'watch-ui',
      THEMES: JSON.stringify(loadThemes()),
    };
    return out;
  },

  /*   async webpackFinal(config) {
    if (config?.resolve?.alias) {
      config.resolve.alias['@'] = path.resolve(__dirname, '../');
    }
    return config;
  },
 */
  async viteFinal(config) {
    config.resolve!.alias!['~bootstrap'] = path.resolve(__dirname, '../node_modules/bootstrap');
    config.css = {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: [
            'import',
            'legacy-js-api',
            'color-functions',
            'global-builtin',
            'color-4-api',
            'abs-percent',
            'mixed-decls',
          ],
          quiteDeps: true,
        },
      },
    };
    return config;
  },
};

export default config;
