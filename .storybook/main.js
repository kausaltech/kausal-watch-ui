const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-next', 'storybook-addon-styled-component-theme/dist/register', '@storybook/addon-a11y'],
  framework: '@storybook/react',
  core: {
    builder: "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // <------
      path: false // <-----
    };
    return config;
  },
};