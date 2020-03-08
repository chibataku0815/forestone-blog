require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `フォレストーン ブログ`,
    author: `Chiba Takumi`,
    about: `株式会社Forestone 代表取締役社長/フロントエンジニア/デザイナー 全く別軸で移動販売車を購入してカフェを始めました。「Cafe More」というお店です。1号店・2号店絶賛営業中。趣味は音楽で、朝まで踊れる程度には好きです。DJも、たまにやります`,
    description: `デザイン・プログラミング・ガジェット・動画編集など雑多に忘備録`,
    siteUrl: `https://blog.fores-tone.co.jp`,
  },
  plugins: [
    // {
    //   resolve: "gatsby-plugin-web-font-loader",
    //   options: {
    //     google: {
    //       families: ["Noto+Sans+JP:100,300,400,500,700,900", "Material+Icons"],
    //     },
    //   },
    // },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        minify: true, // Breaks styles if not set to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-bracketed-spans',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-mermaid`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },

          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
    // {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     trackingIds: ["G-H21B3QHS1P"],
    //     head: true,
    //     anonymize: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        // publisherId: `pub-4481502722215803`,
        publisherId: `ca-pub-4481502722215803`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-H21B3QHS1P`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-gtag`,
    //   options: {
    //     // your google analytics tracking id
    //     trackingId: `G-H21B3QHS1P`,
    //     // Puts tracking script in the head instead of the body
    //     head: false,
    //     // enable ip anonymization
    //     anonymize: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Forestone - blog`,
        short_name: `Forestone`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    {
      resolve: `gatsby-plugin-typescript`,
    },
    {
      resolve: `gatsby-plugin-lodash`,
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Poppins',
              variants: ['300', '400', '500', '600', '700'],
              //subsets: ['latin']
              //text: 'Hello'
              //fontDisplay: 'swap',
              //strategy: 'selfHosted' // 'base64' || 'cdn'
            },
            {
              family: 'Noto+Sans+JP',
              variants: ['100', '300', '400', '500', '600', '700', '900'],
              fontDisplay: 'swap',
            },
          ],
        },
        //formats: ['woff2', 'woff'],
        useMinify: true,
        usePreload: true,
        //usePreconnect: false,
      },
    },
  ],
}
