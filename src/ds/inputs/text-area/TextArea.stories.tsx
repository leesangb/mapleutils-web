import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextArea> = {
    title: 'ds/inputs/TextArea',
    component: TextArea,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        placeholder: 'Type some text here...',
    },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Base: Story = {
    args: {},
};

export const WithLabel: Story = {
    args: {
        label: 'label',
    },
};

export const WithLabelRequired: Story = {
    args: {
        label: 'label',
        required: true,
    },
};
