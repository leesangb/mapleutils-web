'use client';

import GlobalStyle from '@/ds/global.style';
import { Typography } from '@/ds/displays';
import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalsProvider } from '@/ds/surfaces/modal/ModalsProvider';
import AdSense, { AdSenseSlot } from '@/components/adsense/AdSense';
import { isProduction } from '@/utils/helper';
import Navigations from './Navigations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Comments } from '@/components/comments/Comments';
import { WindowPopupProvider } from '@/components/popup/WindowPopupProvider';

const currentYear = new Date().getFullYear();

const Layout = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(
        () => new QueryClient({ defaultOptions: { queries: { retry: 3, retryDelay: 1_000 } } }),
    );

    return (
        <>
            <GlobalStyle />
            <Navigations />
            <QueryClientProvider client={queryClient}>
                <WindowPopupProvider>
                    <ModalsProvider>
                        <Main>
                            {children}
                        </Main>
                        <Comments />
                    </ModalsProvider>
                </WindowPopupProvider>
            </QueryClientProvider>
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
                pauseOnFocusLoss={false}
                limit={3}
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
