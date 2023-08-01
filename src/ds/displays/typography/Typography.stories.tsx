import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './Typography';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Typography> = {
    title: 'ds/displays/Typography',
    component: Typography,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'color',
        },
    },
    args: {
        children: '다람쥐 바퀴에',
    },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
    args: {
        as: 'h1',
    },
};

export const H2: Story = {
    args: {
        as: 'h2',
    },
};

export const H3: Story = {
    args: {
        as: 'h3',
    },
};

export const H4: Story = {
    args: {
        as: 'h4',
    },
};

export const H5: Story = {
    args: {
        as: 'h5',
    },
};

export const H6: Story = {
    args: {
        as: 'h6',
    },
};

export const P: Story = {
    args: {
        as: 'p',
    },
};

export const Div: Story = {
    args: {
        as: 'div',
    },
};

export const Span: Story = {
    args: {
        as: 'span',
    },
};
