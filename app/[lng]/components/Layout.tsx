'use client';

import GlobalStyle from '@/ds/global.style';
import { AppBar, SideBar } from '@/ds/surfaces';
import { AppNavigations } from './AppNavigations';
import { ThemeSwitcher } from './ThemeSwitcher';
import { SideNavigations } from './SideNavigations';
import { Typography } from '@/ds/displays';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalsProvider } from '@/ds/surfaces/modal/ModalsProvider';
import AdSense, { AdSenseSlot } from '@/components/adsense/AdSense';
import { isProduction } from '@/utils/helper';

const currentYear = new Date().getFullYear();

const Layout = ({ children }: PropsWithChildren) => {

    return (
        <>
            <GlobalStyle />
            <AppBar>
                <AppNavigations />
                <ThemeSwitcher />
            </AppBar>
            <SideBar>
                <SideNavigations />
            </SideBar>
            <ModalsProvider>
                <Main>
                    {children}
                </Main>
            </ModalsProvider>
            <Aside>
                <AdSense slot={AdSenseSlot.RightContent}
                    format={'auto'}
                    responsive
                    width={250} height={600} fixed />
            </Aside>
            <ToastContainer
                style={{ position: 'fixed', bottom: 0, left: '16px' }}
                position='bottom-left'
                autoClose={3000}
                newestOnTop
                closeOnClick
                draggable
                pauseOnHover
            />
            <Footer>
                <Typography fontSize={12}>
                    © {currentYear} mapleutils All rights reserved. mapleutils is not associated with NEXON
                    Korea.
                </Typography>
            </Footer>
        </>
    );
};

const Main = styled.main`
  grid-area: main;
`;

const Footer = styled.footer`
  grid-area: footer;
  padding: 16px;
`;

const Aside = styled.aside`
  grid-area: ads;
  width: fit-content;
  height: fit-content;
  border: ${isProduction ? 'none' : '1px solid red'};
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default Layout;
