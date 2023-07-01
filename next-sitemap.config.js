/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://mapleutils.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: [
        '/en/farm/*',
        '/zh-TW/farm/*',
        '/api/*',
    ],
};
