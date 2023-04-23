module.exports = {
    i18n: {
        defaultLocale: 'ko',
        locales: ['ko', 'en', 'zh_tw'],
        localeDetection: false,
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};