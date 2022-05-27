module.exports = {
    i18n: {
        defaultLocale: 'kr',
        locales: ['kr', 'en'],
        localeDetection: false,
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};