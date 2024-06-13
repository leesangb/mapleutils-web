import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup } from '..';
import { useArgs } from '@storybook/preview-api';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RadioGroup> = {
    title: 'ds/inputs/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RadioGroup<{ v: number; k: string }>>;

export const Example: Story = {
    args: {
        name: 'hi',
        options: [1, 2, 3, 4].map((i) => ({ v: i, k: `option ${i}` })),
        value: { v: 1, k: '1+k' },
        getCompare: (a, b) => a.v === b.v,
        getRender: (value) => value.k,
        getOptionValue: (value) => value.k,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        return <RadioGroup {...args} onChange={(value) => setArgs({ value })} />;
    },
};
