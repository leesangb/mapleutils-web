import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tabs> = {
    title: 'ds/surfaces/Tabs',
    component: Tabs,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        name: 'tab-example',
        fadeMs: 125,
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
