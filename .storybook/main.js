const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-addon-styled-component-theme/dist/register',
    '@storybook/addon-viewport/register',
  ],
  presets: [path.resolve(__dirname, "./next-preset.js")],
};
