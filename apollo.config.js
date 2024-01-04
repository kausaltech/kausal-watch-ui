require('dotenv').config();

module.exports = {
  client: {
    includes: [
      'lib/**/*.{js,ts,tsx}',
      'pages/**/*.{js,ts,tsx}',
      'components/**/*.{js,ts,tsx}',
      'common/**/*.{js,ts,tsx}',
      'context/**/*.{js,ts,tsx}',
      'e2e-tests/**/*.ts',
    ],
    service: {
      name: 'kausal-watch-backend',
      url: `${
        process.env.APLANS_API_BASE_URL || 'https://api.watch.kausal.tech/v1'
      }/graphql/`,
    },
  },
};
