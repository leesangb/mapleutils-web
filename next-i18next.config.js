module.exports = {
    i18n: {
        defaultLocale: 'ko',
        locales: ['ko', 'en'],
        localeDetection: false,
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};