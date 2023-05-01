import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
    title: 'ds/inputs/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        children: 'Button',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Button',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        children: 'Button',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
        children: 'Button',
    },
};
