import type { StorybookConfig } from '@storybook/nextjs';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    webpackFinal: async (config) => {
        // Replace TSX loader
        // @ts-ignore
        const tsxRule = config.module.rules.findIndex(rule => rule.test.toString().includes('tsx'));
        config.module.rules[tsxRule] = {
            // @ts-ignore
            test: config.module.rules[tsxRule].test,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                    },
                },
                {
                    loader: '@linaria/webpack-loader',
                    options: {
                        sourceMap: true,
                        babelOptions: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                                ['@babel/preset-react', { runtime: 'automatic' }],
                                '@linaria/babel-preset',
                            ],
                        },
                    },
                },
            ],
        };

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'styles.css',
            }),
        );
        // Replace CSS loader
        // @ts-ignore
        const cssKey = config.module.rules.findIndex(rule => rule.test.toString() === '/\\.css$/');
        config.module.rules[cssKey] = {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: 'css-loader',
                    options: { sourceMap: true },
                },
            ],
        };
        return config;
    },
};

export default config;
