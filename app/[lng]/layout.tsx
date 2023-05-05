'use client';

import { PropsWithChildren, useRef } from 'react';
import { AppBar } from '@/ds/surfaces';
import '@/ds/style.linaria.global';
import NextLink from 'next/link';
import { Button } from '@/ds/inputs';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { I18nPageProps, languages } from '@/i18n/settings';

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

const RootLayout = ({
    children,
    params: {
        lng,
    },
}: PropsWithChildren<I18nPageProps>) => {
    const html = useRef<HTMLHtmlElement>(null);
    const [theme, setTheme] = useLocalStorageState<'light' | 'dark'>('theme', 'light');

    const toggleTheme = () => {
        if (!html.current) {
            return;
        }

        const newTheme = theme === 'light' ? 'dark' : 'light';
        html.current.dataset.theme = newTheme;
        setTheme(newTheme);
    };
    
    return (
        <html ref={html} lang={lng} data-theme={theme}>
            <body>
                <AppBar as={'nav'}>
                    <NextLink href={'/'}>
                home
                    </NextLink>
                    <NextLink href={'/seed'}>
                seed
                    </NextLink>
                    <Button onClick={toggleTheme}>
                theme
                    </Button>
                </AppBar>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
