import { type Config } from 'prettier';

import defaultConfig from './kausal_common/configs/prettier.ts';

const config = {
  ...defaultConfig,
  overrides: [
    {
      files: ['src/common/__generated__/*'],
      excludeFiles: ['**'],
    },
  ],
} satisfies Config;
export default config;
