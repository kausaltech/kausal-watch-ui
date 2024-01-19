const { apiUrl } = require('./common/environment');

require('dotenv').config();

module.exports = {
  client: {
    includes: [
      'app/**/*.{js,ts,tsx}',
      'lib/**/*.{js,ts,tsx}',
      'pages/**/*.{js,ts,tsx}',
      'components/**/*.{js,ts,tsx}',
      'common/**/*.{js,ts,tsx}',
      'context/**/*.{js,ts,tsx}',
      'e2e-tests/**/*.ts',
    ],
    service: {
      name: 'kausal-watch-backend',
      url: `${apiUrl}/graphql/`,
    },
  },
};
