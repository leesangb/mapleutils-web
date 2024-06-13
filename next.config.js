// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: true,
    typescript: {
        tsconfigPath: './tsconfig.build.json',
    },
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

module.exports = nextConfig;
