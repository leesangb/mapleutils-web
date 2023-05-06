import 'server-only';

import { PropsWithChildren } from 'react';
import '@/ds/style.linaria.global';
import { AppBar, Card, SideBar } from '@/ds/surfaces';
import { I18nPageProps, languages } from '@/i18n/settings';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { SideNavigations } from './components/SideNavigations';
import { AppNavigations } from './components/AppNavigations';
import { styled } from '@linaria/react';
import { theme } from '@/ds/theme';
import { Typography } from '@/ds/displays';

const currentYear = new Date().getFullYear();

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

const RootLayout = ({ children, params: { lng } }: PropsWithChildren<I18nPageProps>) => {
    return (
        <html lang={lng} data-theme={'light'}>
            <Body>
                <AppBar>
                    <AppNavigations />
                    <ThemeSwitcher />
                </AppBar>
                <SideBar>
                    <SideNavigations />
                </SideBar>
                <Main>
                    <Card as={'article'}>
                        {children}
                    </Card>
                </Main>
                <Footer>
                    <Typography fontSize={12}>
                    © {currentYear} mapleutils All rights reserved. mapleutils is not associated with NEXON
                    Korea.
                    </Typography>
                </Footer>
            </Body>
        </html>
    );
};

const Body = styled.body`
  margin: ${theme.appBar.height} 0 0 ${theme.sideBar.width};
`;

const Main = styled.main`
  padding: 16px;
`;

const Footer = styled.footer`
  padding: 16px;
`;

export default RootLayout;
