require('dotenv').config();

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
  client: {
    includes: [
      'app/**/*.{js,ts,tsx}',
      'common/**/*.{js,ts,tsx}',
      'components/**/*.{js,ts,tsx}',
      'context/**/*.{js,ts,tsx}',
      'fragments/**/*.{js,ts,tsx}',
      'pages/**/*.{js,ts,tsx}',
      'queries/**/*.{js,ts,tsx}',
    ],
    service: {
      name: 'kausal-watch-backend',
      url: `${apiUrl}/graphql/`,
    },
  },
};
