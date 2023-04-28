// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLinaria = require('next-with-linaria');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
};

module.exports = withLinaria(nextConfig);
