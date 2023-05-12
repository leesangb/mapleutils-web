import styled from 'styled-components';
import { ReactNode, useRef, useState } from 'react';
import { keyframes } from '@/ds/keyframes';

type Tab = {
    name: string;
    content: ReactNode;
}

interface TabProps {
    name: string;
    tabs: Tab[];
    fadeMs?: number;
    initialTab?: number;
}

const getTabId = (tabListName: string, index: number) => `${tabListName}-tab-${index}`;
const getTabPanelId = (tabListName: string, index: number) => `${tabListName}-tabpanel-${index}`;

export const Tabs = ({ name: tabListName, tabs, fadeMs = 125, initialTab = 0 }: TabProps) => {
    const [activeTab, setActiveTab] = useState<number>(initialTab);
    const containerRef = useRef<HTMLDivElement>(null);

    const onTabClick = (index: number) => {
        if (activeTab === index || !containerRef.current) {
            return;
        }
        const currentTabPanel = containerRef.current.querySelector(`#${getTabPanelId(tabListName, activeTab)}`)!;
        currentTabPanel.classList.add('fadeOut');
        setTimeout(() => {
            currentTabPanel.classList.remove('fadeOut');
            setActiveTab(index);
        }, fadeMs);
    };

    return (
        <Container ref={containerRef}>
            <TabList>
                {
                    tabs.map((({ name }, i) => (
                        <Tab id={getTabId(tabListName, i)}
                            aria-selected={i === activeTab}
                            aria-controls={getTabPanelId(tabListName, i)}
                            onClick={() => onTabClick(i)}
                            tabIndex={i === activeTab ? 0 : -1}
                            key={name}>
                            {name}
                        </Tab>
                    )))
                }
            </TabList>
            {
                tabs.map(({ name, content }, i) => (
                    <TabContent key={name}
                        id={getTabPanelId(tabListName, i)}
                        tabIndex={0}
                        aria-labelledby={getTabId(tabListName, i)}
                        $fadeMs={fadeMs}
                        hidden={i !== activeTab}>
                        {content}
                    </TabContent>
                ))
            }
        </Container>
    );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.surface.default};
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 0 8px;
`;

const TabList = styled.div.attrs({ role: 'tablist' })`
  display: flex;
  gap: 8px;
  box-sizing: content-box;
  height: fit-content;
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  justify-content: center;
`;

const Tab = styled.button.attrs({ role: 'tab' })`
  list-style: none;
  border: none;
  cursor: pointer;
  height: fit-content;
  display: flex;
  padding: 12px 16px;
  width: 100px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.surface.active};
  }

  &[aria-selected="true"] {
    color: ${({ theme }) => theme.primary.default};

    &::after {
      background-color: ${({ theme }) => theme.primary.default};
      transform: scaleX(2);
    }
  }

  &::after {
    content: '';
    display: block;
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 10px;
    height: 2px;
    background-color: transparent;
    transition: all 0.2s ease-in-out;
    position: absolute;
    bottom: 4px;
    transform: scaleX(1);
  }
`;

const TabContent = styled.div<TransientProps<{ fadeMs: number }>>`
  display: block;
  padding: 8px;
  animation: ${keyframes.fadeIn} ${({ $fadeMs }) => `${$fadeMs}ms ease-in-out`};
  transition: opacity ${({ $fadeMs }) => $fadeMs}ms ease-in-out;

  &[hidden] {
    display: none;
  }

  &.fadeOut {
    opacity: 0;
  }
`;
