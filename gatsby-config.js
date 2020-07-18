require(`dotenv`).config({
    path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
    siteMetadata: {
        siteTitle: `Pratik`,
        siteTitleAlt: `Pratik`,
        siteHeadline: `Pratik`,
        siteUrl: `https://google.com/`,
        siteDescription: `I write about stuff`,
        siteLanguage: `en`,
        siteImage: `/banner.jpg`,
        author: `@pratik_thanki`
    },
    plugins: [{
            resolve: `@lekoarts/gatsby-theme-minimal-blog`,
            // See the theme's README for all available options
            options: {
                navigation: [{
                        title: `Blog`,
                        slug: `/blog`,
                    },
                    {
                        title: `About`,
                        slug: `/about`,
                    },
                ],
                externalLinks: [{
                        name: `Twitter`,
                        url: `https://twitter.com/Pratik_Thanki/`,
                    },
                    {
                        name: `GitHub`,
                        url: `https://github.com/pratikthanki/`,
                    },
                    {
                        name: `LinkedIn`,
                        url: `https://www.linkedin.com/in/pratikthanki9/`,
                    },
                    {
                        name: `Email`,
                        url: `mailto:pratikthanki1@gamil.com`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: `UA-118874438-1`,
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
                short_name: `minimal-blog`,
                description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#6B46C1`,
                display: `standalone`,
                icons: [{
                        src: `/android-chrome-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/android-chrome-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify`,
        shouldAnalyseBundle && {
            resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
            options: {
                analyzerMode: `static`,
                reportFilename: `_bundle.html`,
                openAnalyzer: false,
            },
        },
    ].filter(Boolean),
}