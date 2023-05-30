import type { Meta, StoryObj } from '@storybook/react';

import { SearchField } from './SearchField';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SearchField> = {
    title: 'ds/inputs/SearchField',
    component: SearchField,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SearchField>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};

export const WithOnClear: Story = {
    args: {
        value: 'value',
    },
    render: (args) => {
        return <SearchField {...args} />;
    },
};
