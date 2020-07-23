require(`dotenv`).config({
    path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
    pathPrefix: "/pratikthanki.github.io",
    siteMetadata: {
        siteTitle: `Pratik Thanki`,
        siteTitleAlt: `Pratik Thanki`,
        siteHeadline: `Pratik Thanki`,
        siteUrl: `https://google.com/`,
        siteDescription: `Data, tech and the Cowboys.`,
        siteLanguage: `en`,
        siteImage: `/banner.jpg`,
        author: `@pratik_thanki`
    },
    plugins: [
        {
            resolve: `@lekoarts/gatsby-theme-minimal-blog`,
            options: {
                basePath: `/`,
                blogPath: `/blog`,
                tagsPath: `/tags`,
                mdx: true,
                formatString: `DD MMM YYYY`,
                showLineNumbers: false,
                feed: true,
                feedTitle: `Pratik Thanki`,
                navigation: [
                    {
                        title: `Blog`,
                        slug: `/blog`,
                    },
                    {
                        title: `Tags`,
                        slug: `/tags`,
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
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Pratik`,
                short_name: `Pratik`,
                description: `I write about stuff.`,
                lang: `en`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#6B46C1`,
                display: `standalone`,
                icon: 'static/favicon.png',
            },
        },
        shouldAnalyseBundle && {
            resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
            options: {
                analyzerMode: `static`,
                reportFilename: `_bundle.html`,
                openAnalyzer: false,
            },
        },
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify`,
    ].filter(Boolean),
}
