import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { theme } from '@/ds/theme';
import { Button } from '@/ds/inputs';
import { Languages } from '@/i18n/settings';
import { Avatar, Link, Typography } from '@/ds/displays';

interface SideBarProps {
    open?: boolean;
}

export const SideBar = ({ children }: PropsWithChildren<SideBarProps>) => {
    return (
        <Aside>
            {children}
        </Aside>
    );
};

SideBar.Nav = styled.nav`
  display: flex;
  gap: 0;
  flex-direction: column;
`;

interface SideBarLinkProps {
    href: string;
    lang: Languages;
    active: boolean;
    title: string;
    subtitle?: string;
}

const SideBarLinkButton = styled(Button)`
  && {
    padding: 6px;
    gap: 8px;
    border: 0;
    background-color: transparent;
  }
`;

SideBar.Link = function SideBarLink({ href, lang, active, title, subtitle }: SideBarLinkProps) {
    return (
        <SideBarLinkButton as={Link} href={href}
            lang={lang}>
            <Avatar name={title}
                backgroundColor={active ? theme.primary.default : undefined} />
            {'  '}
            <Typography
                fontSize={12}
                as={'span'}>{subtitle}</Typography>
        </SideBarLinkButton>
    );
};

const Aside = styled.aside`
  position: fixed;
  width: ${theme.sideBar.width};
  margin-top: 16px;
  margin-left: calc(0px - ${theme.sideBar.width});
  padding: 12px 0;
  height: calc(100% - ${theme.appBar.height} - 56px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  border-top: 1px solid ${theme.contour};
  border-right: 1px solid ${theme.contour};
  border-bottom: 1px solid ${theme.contour};
  border-radius: 0 ${theme.borderRadius} ${theme.borderRadius} 0;
  background-color: ${theme.surface.default};
  backdrop-filter: blur(${theme.appBar.blur});
  align-items: center;
  gap: 8px;
  transition: width 0.125s ease-in-out;

  & > ${SideBar.Nav} {
    transition: width 0.125s ease-in-out;
    width: calc(100% - 17px);
  }

  & > ${SideBar.Nav} > a {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    white-space: pre;
  }

  &:hover {
    width: 192px;
  }

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.contour};
  }
`;
