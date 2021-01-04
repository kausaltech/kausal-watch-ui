const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-addon-styled-component-theme/dist/register',
    '@storybook/addon-a11y',
  ],
  presets: [path.resolve(__dirname, "./next-preset.js")],
};
