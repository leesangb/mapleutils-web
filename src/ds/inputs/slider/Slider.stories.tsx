import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Slider> = {
    title: 'ds/inputs/Slider',
    component: Slider,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Slider>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {
    args: {
        min: 0,
        max: 100,
    },

    render: (args) => {
        return <Slider {...args} />;
    },
};
