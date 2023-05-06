import type { Meta, StoryObj } from '@storybook/react';

import { SideBar } from './SideBar';
import { Avatar } from '@/ds/displays';
import { AppBar } from '@/ds/surfaces';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SideBar> = {
    title: 'ds/surfaces/SideBar',
    component: SideBar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
    render: (args) => (<div style={{ height: '100vh' }}>
        <AppBar />
        <SideBar {...args}>
            <SideBar.Nav>
                {[...Array(100)].map((_, i) => <Avatar name={i.toString()} key={i} />)}
            </SideBar.Nav>
        </SideBar>
    </div>),
};
