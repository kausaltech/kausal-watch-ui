const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // Support module imports relative to root
    newConfig.resolve.modules.push(path.resolve('./'));

    // SCSS
    newConfig.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader',  'postcss-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return newConfig;
  },
};
