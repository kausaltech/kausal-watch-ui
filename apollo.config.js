module.exports = {
  client: {
    includes: [
      'pages/**/*.{js,tsx}',
      'components/**/*.{js,tsx}',
    ],
    service: {
      name: 'kausal-watch-backend',
      url: `${process.env.APLANS_API_BASE_URL || 'https://api.watch.kausal.tech/v1'}/graphql/`,
    },
  },
};
