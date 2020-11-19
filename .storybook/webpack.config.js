const path = require('path');

module.exports = ({ config }) => {
    config.plugins = config.plugins.filter(
        p => String(p.resourceRegExp) !== '/core-js/'
      );
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve('./'),
    ];
    return config;
  };
  