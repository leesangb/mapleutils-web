'use client';

import styled from 'styled-components';
import { ReactNode } from 'react';
import { media } from '@/ds';

type BottomFloatingBarProps = {
    children: ReactNode;
}

export const BottomFloatingBar = ({children}: BottomFloatingBarProps) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

const Container = styled.aside`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.surface.default};
 
  height: 56px;
  border-top: 1px solid ${({ theme }) => theme.contour};
  border-left: 1px solid ${({ theme }) => theme.contour};
  border-right: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  display: flex;  
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: ${({ theme }) => theme.zIndex.appBar};
  padding: 0 8px;
  box-sizing: border-box;
  backdrop-filter: blur(${({ theme }) => theme.appBar.blur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.appBar.blur});
  
  ${media.max('sm')} {
    display: none;
  }
`;
