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
            <Main>
                {children}
            </Main>
            <ToastContainer
                position='bottom-left'
                autoClose={5000}
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
  padding: 16px;
`;

const Footer = styled.footer`
  padding: 16px;
`;

export default Layout;
