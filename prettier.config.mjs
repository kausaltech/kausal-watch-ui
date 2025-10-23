import defaultConfig from './kausal_common/configs/prettier.mjs';

/**
 * @type {import('prettier').Config}
 */
const config = {
  ...defaultConfig,
  overrides: [
    {
      files: ['**/__generated__/*'],
      excludeFiles: ['**'],
    },
  ],
};
export default config;
