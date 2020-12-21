module.exports = {
  siteMetadata: {
    title: "test",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
  ],
};
