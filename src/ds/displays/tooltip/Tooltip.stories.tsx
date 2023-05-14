import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tooltip> = {
    title: 'ds/displays/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    args: {
        title: 'Tooltip',
        children: <button>다람쥐 바퀴에</button>,
    },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
    args: {},
};
