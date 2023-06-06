import styled from 'styled-components';
import { theme } from '@/ds/theme';
import { CSSProperties, PropsWithChildren } from 'react';
import { media } from '@/ds';

interface AppBarProps {
    style?: CSSProperties;
    className?: string;
}

export const AppBar = ({ children }: PropsWithChildren<AppBarProps>) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

const Container = styled.header`
  top: 0;
  left: 0;
  background-color: ${theme.surface.default};
  backdrop-filter: blur(${theme.appBar.blur});
  -webkit-backdrop-filter: blur(${theme.appBar.blur});
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
  z-index: ${theme.zIndex.appBar};

  ${media.max('sm')} {
    padding: 16px 8px;
  }
`;
