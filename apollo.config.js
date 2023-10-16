require('dotenv').config();

module.exports = {
  client: {
    includes: [
      'pages/**/*.{js,tsx}',
      'components/**/*.{js,tsx}',
      'common/**/*.{js,tsx}',
      'context/**/*.{js,tsx}',
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
