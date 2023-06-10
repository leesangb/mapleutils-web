import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
    title: 'ds/inputs/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};

export const WithStartAdornment: Story = {
    args: {
        adornment: {
            start: '❤️',
        },
    },
};

export const WithEndAdornment: Story = {
    args: {
        adornment: {
            end: '❤️',
        },
    },
};

export const WithStartAndEndAdornment: Story = {
    args: {
        adornment: {
            start: '❤️',
            end: '❤️',
        },
    },
};

export const WithLabel: Story = {
    args: {
        label: 'with label',
    },
};
