const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig) => {
    const nextConfig = require('../next.config.js');

    // merge whatever from nextConfig into the webpack config storybook will use
    return { ...baseConfig };
  },
};