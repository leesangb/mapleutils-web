import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from './Tab';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tab> = {
    title: 'ds/surfaces/Tab',
    component: Tab,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
    args: {
        lang: 'ko',
        tabs: [
            {
                name: 'tab1',
                content: 'tab1 content',
            },
            {
                name: 'tab2',
                content: 'tab2 content',
            },
        ],
    },
};
