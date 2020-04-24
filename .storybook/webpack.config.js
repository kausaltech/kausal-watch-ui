module.exports = ({ config }) => {
    config.plugins = config.plugins.filter(
        p => String(p.resourceRegExp) !== '/core-js/'
      );
  
    return config;
  };