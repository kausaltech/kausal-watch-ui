const dotenv = require('dotenv');

dotenv.config();

const backendUrl = process.env.WATCH_BACKEND_URL || 'https://api.watch.kausal.tech';

module.exports = {
  client: {
    includes: ['src/**/*.{js,ts,tsx}', 'e2e-tests/**/*.{js,ts,tsx}'],
    excludes: ['src/*/paths/**/*.{js,ts,tsx}'],
    service: {
      name: 'kausal-watch-backend',
      url: `${backendUrl}/v1/graphql/`,
    },
  },
};
