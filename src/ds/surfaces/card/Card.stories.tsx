import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
    title: 'ds/surfaces/Card',
    component: Card,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {},
};
