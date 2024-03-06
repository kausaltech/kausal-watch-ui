import type { StorybookConfig } from '@storybook/nextjs';

const fs = require('fs');
const path = require('path');

// Load all the directories in the themes directory
function loadDirectoryNames(directoryPath) {
  return fs.readdirSync(directoryPath).filter((file) => {
    return fs.statSync(path.join(directoryPath, file)).isDirectory();
  });
}

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
  const themePath = path.join(themesDirectory, themeName, 'theme.json');
  try {
    const data = fs.readFileSync(themePath);
    themes[themeName] = JSON.parse(data);
  } catch (err) {
    console.error(`⚠️ Error reading theme data for ${themeName}`, err);
  }
});

console.log('Loaded themes data', Object.keys(themes));

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true, // Enables SWC support
      },
    },
  },
  logLevel: 'info',
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
  env: (config) => ({
    ...config,
    THEMES: JSON.stringify(themes),
  }),
  async webpackFinal(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, '../');
    return config;
  },
};
export default config;
