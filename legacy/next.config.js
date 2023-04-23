/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const webpack = require('webpack');

module.exports = {
    reactStrictMode: true,
    i18n,
    webpack5: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // for opencv.js
            config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false, crypto: false };
            config.plugins.push(
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                }),
            );
        }
        return config;
    },
};
