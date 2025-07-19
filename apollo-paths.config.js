// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const backendUrl = process.env.PATHS_BACKEND_URL || 'https://api.paths.kausal.dev';

const JS = '*.{js,jsx,ts,tsx,mjs}';

module.exports = {
  client: {
    includes: ['src/*/paths/**/*.{js,ts,tsx}'],
    excludes: ['src/components/paths/contentblocks/**/*.{js,ts,tsx}'],
    service: {
      name: 'kausal-paths',
      url: `${backendUrl}/v1/graphql/`,
    },
  },
};
