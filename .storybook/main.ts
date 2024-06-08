import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        '@storybook/addon-styling',
        'storybook-addon-swc',
        '@chromatic-com/storybook',
    ],

    staticDirs: ['../public'],

    framework: {
        name: '@storybook/nextjs',
        options: {},
    },

    docs: {},

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};

export default config;
