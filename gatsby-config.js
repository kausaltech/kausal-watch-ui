module.exports = {
  siteMetadata: {
    title: 'Carbon Neutral Helsinki',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Carbon Neutral Helsinki',
        short_name: 'CNH',
        start_url: '/',
        background_color: '#009246',
        theme_color: '#009246',
        display: 'minimal-ui',
        icon: 'src/images/hel-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/action/*`] },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
