import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { theme } from '@/ds/theme';
import { Button } from '@/ds/inputs';
import { Languages } from '@/i18n/settings';
import { Avatar, Typography } from '@/ds/displays';
import { keyframes, media } from '@/ds';

export const SideBar = ({ children, ...props }: PropsWithChildren) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
};

interface SideBarLinkProps {
    href: string;
    lang: Languages;
    active: boolean;
    title: string;
    subtitle?: string;
}

const SideBarLinkButton = styled(Button)`
  padding: 6px;
  margin: 0 8px;
  gap: 16px;
  border: 0;
  background-color: transparent;
`;

SideBar.Link = function SideBarLink({ href, lang, active, title, subtitle }: SideBarLinkProps) {
    return (
        <SideBarLinkButton href={href} lang={lang}>
            <Avatar name={title}
                backgroundColor={active ? theme.primary.default : undefined} />
            {'  '}
            <Typography
                fontSize={12}
                as={'span'}>{subtitle}</Typography>
        </SideBarLinkButton>
    );
};

const Container = styled.div`
  position: fixed;
  width: ${theme.sideBar.width};
  top: calc(${theme.appBar.height} + 16px);
  left: 0;
  box-sizing: border-box;
  padding: 12px 0;
  height: calc(100% - ${theme.appBar.height} - 56px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  border-top: 1px solid ${theme.contour};
  border-right: 1px solid ${theme.contour};
  border-bottom: 1px solid ${theme.contour};
  border-radius: 0 ${theme.borderRadius} ${theme.borderRadius} 0;
  background-color: ${theme.surface.default};
  backdrop-filter: blur(${theme.appBar.blur});
  -webkit-backdrop-filter: blur(${theme.appBar.blur});
  align-items: center;
  gap: 8px;
  transition: width 0.125s ease-in-out;
  will-change: width;
  z-index: ${theme.zIndex.sideBar};

  @media (hover: hover) {
    &:hover {
      width: 192px;
    }
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

  ${media.max('sm')} {
    display: none;
    top: ${theme.appBar.height};
    left: 0;
    width: 100%;
    animation: ${keyframes.slideInDown} 0.125s ease-in-out;
    height: calc(70vh);

    @media (hover: hover) {
      &:hover {
        width: 100%;
      }
    }


    &[data-mobile-animation='opened'] {
      display: flex;
    }

    &[data-mobile-animation='closing'] {
      display: flex;
      animation: ${keyframes.slideOutUp} 0.125s ease-in-out;
    }
  }
`;
