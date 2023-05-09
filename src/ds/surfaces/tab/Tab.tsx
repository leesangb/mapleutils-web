import styled from 'styled-components';
import { ReactNode, useState } from 'react';
import { keyframes } from '@/ds/keyframes';

type Tab = {
    name: string;
    content: ReactNode;
}

interface TabProps {
    tabs: Tab[];
    fadeMs?: number;
}

export const Tab = ({ tabs, fadeMs = 125 }: TabProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const onTabClick = async (index: number) => {
        if (activeTab === index) {
            return;
        }
        const activeTabContent = document.querySelector<HTMLDivElement>(`[data-tab="${activeTab}"]`);
        if (!activeTabContent) {
            return;
        }
        activeTabContent.classList.add('fadeOut');
        await new Promise(resolve => setTimeout(resolve, fadeMs));
        setActiveTab(index);
        activeTabContent.classList.remove('fadeOut');
    };

    return (
        <div>
            <TabList>
                {
                    tabs.map((({ name }, i) => (
                        <TabListItem onClick={() => onTabClick(i)} key={name}>{name}</TabListItem>
                    )))
                }
            </TabList>
            <TabContents>
                {
                    tabs.map(({ name, content }, i) => (
                        <TabContent $fadeMs={fadeMs} data-tab={i} key={name}
                            className={i === activeTab ? 'active' : ''}>
                            {content}
                        </TabContent>
                    ))
                }
            </TabContents>
        </div>
    );
};

const TabList = styled.div`
  display: flex;
  box-sizing: content-box;
  height: fit-content;
  margin: 0;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  justify-content: center;
  background-color: ${({ theme }) => theme.surface.default};
`;

const TabListItem = styled.button`
  list-style: none;
  border: none;
  cursor: pointer;
  height: fit-content;
  display: flex;
  padding: 12px 16px;
  min-width: 64px;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.surface.active};
  }
`;

const TabContents = styled.div`
  background-color: ${({ theme }) => theme.surface.default};
  border: 1px solid ${({ theme }) => theme.contour};
  border-top: none;
  padding: 8px;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
`;

const TabContent = styled.div<TransientProps<{ fadeMs: number }>>`
  display: none;
  animation: ${keyframes.fadeIn} ${({ $fadeMs }) => $fadeMs}ms ease-in-out;

  &.active {
    display: block;
  }

  &.fadeOut {
    animation: ${keyframes.fadeOut} ${({ $fadeMs }) => $fadeMs}ms ease-in-out;
  }
`;
