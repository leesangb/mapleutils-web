import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Accordion> = {
    title: 'ds/surfaces/Accordion',
    component: Accordion,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
    args: {
        title: <>
            accordion
        </>,
        children: <>
            <h1>
                안녕하세요!
            </h1>
        </>,
    },
};

export default meta;
