//import * as dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

const apiUrl = `${process.env.WATCH_BACKEND_URL || 'https://api.watch.kausal.tech'}/v1`;

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
