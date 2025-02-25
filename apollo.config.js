require('dotenv').config();

const { apiUrl } = require('./common/environment');

module.exports = {
  client: {
    includes: [
      'app/**/*.{js,ts,tsx}',
      'common/**/*.{js,ts,tsx}',
      'components/**/*.{js,ts,tsx}',
      'context/**/*.{js,ts,tsx}',
      'e2e-tests/**/*.ts',
      'fragments/**/*.{js,ts,tsx}',
      'pages/**/*.{js,ts,tsx}',
      'queries/**/*.{js,ts,tsx}',
    ],
    excludes: [
      'common/paths/**/*.{js,ts,tsx}',
      'components/paths/**/*.{js,ts,tsx}',
      'context/paths/**/*.{js,ts,tsx}',
      'queries/paths/**/*.{js,ts,tsx}',
    ],
    service: {
      name: 'kausal-watch-backend',
      url: `${apiUrl}/graphql/`,
    },
  },
};
