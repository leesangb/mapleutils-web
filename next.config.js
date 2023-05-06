/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    reactStrictMode: true,
    typescript: {
        tsconfigPath: './tsconfig.build.json',
    },
};

module.exports = nextConfig;
