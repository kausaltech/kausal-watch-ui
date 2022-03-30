const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next',
    '@storybook/addon-a11y',
    'storybook-addon-styled-component-theme/dist/preset',
  ],
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
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-i18next': 'react-i18next'
    };
    if (configType === 'DEVELOPMENT') {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
};
