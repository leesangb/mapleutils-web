import styled from 'styled-components';
import { theme } from '@/ds/theme';
import { CSSProperties, PropsWithChildren } from 'react';

interface AppBarProps {
    style?: CSSProperties;
    className?: string;
}

export const AppBar = ({ children }: PropsWithChildren<AppBarProps>) => {
    return (
        <Container>{children}</Container>
    );
};

const Container = styled.header`
  margin-top: calc(0px - ${theme.appBar.height});
  margin-left: calc(0px - ${theme.sideBar.width});
  background-color: ${theme.surface.default};
  backdrop-filter: blur(${theme.appBar.blur});
  border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
  padding: 16px;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${theme.contour};
  height: ${theme.appBar.height};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
