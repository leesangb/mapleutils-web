'use client';

import GlobalStyle from '@/ds/global.style';
import { Typography } from '@/ds/displays';
import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalsProvider } from '@/ds/surfaces/modal/ModalsProvider';
import Navigations from './Navigations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Comments } from '@/components/comments/Comments';
import { WindowPopupProvider } from '@/components/popup/WindowPopupProvider';
import { Button } from '@/ds/inputs';
import { DISCORD_URL, GITHUB_URL, KAKAOTALK_URL } from '@/utils/constants';
import { RiDiscordFill, RiGithubFill, RiKakaoTalkFill } from 'react-icons/ri';
import { Widget } from '@/ds/surfaces/widget/Widget';
import { ScrollToTopButton } from '@/components/buttons';
import { AdLeft, AdRight, AdTop } from '@/components/adsense';

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
            <Widgets>
                <Widget>
                    <ScrollToTopButton />
                </Widget>
            </Widgets>

            <AdTop />
            <AdLeft />
            <AdRight />

            <Footer>
                <Links>
                    <Button href={KAKAOTALK_URL} size={'small'}><RiKakaoTalkFill fontSize={'16px'} /> 오픈카톡</Button>
                    <Button href={GITHUB_URL} size={'small'}><RiGithubFill fontSize={'16px'} /> Github</Button>
                    <Button href={DISCORD_URL} size={'small'}><RiDiscordFill fontSize={'16px'} /> Discord</Button>
                </Links>
                <Typography fontSize={12}>
                    © 2020 - {currentYear} mapleutils All rights reserved. mapleutils is not associated with NEXON
                    Korea.
                </Typography>
            </Footer>
        </>
    );
};

const Main = styled.main`
  grid-area: main;
  width: 100%;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  grid-area: footer;
  padding: 8px;
`;

const Links = styled.nav`
  display: flex;
  gap: 8px;
`;

const Widgets = styled.aside.attrs({ id: 'widgets' })`
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  z-index: ${({ theme }) => theme.zIndex.widget};
`;

export default Layout;
