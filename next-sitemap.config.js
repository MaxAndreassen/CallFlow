/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://cocktailrecipe.co',
    generateRobotsTxt: true, // (optional)
    // ...other options
    robotsTxtOptions: {
        additionalSitemaps: [
          'https://cocktailrecipe.co/server-sitemap-index.xml', // <==== Add here
        ],
    }
  }