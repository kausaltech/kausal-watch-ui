// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { pathsGqlUrl } = require('./common/environment');

const JS = '*.{js,jsx,ts,tsx,mjs}';

module.exports = {
  client: {
    includes: [
      'common/paths/**/*.{js,ts,tsx}',
      'components/paths/**/*.{js,ts,tsx}',
      'context/paths/**/*.{js,ts,tsx}',
      'queries/paths/**/*.{js,ts,tsx}',
    ],
    excludes: ['components/paths/contentblocks/**/*.{js,ts,tsx}'],
    service: {
      name: 'kausal-paths',
      url: `${pathsGqlUrl}`,
    },
  },
};
