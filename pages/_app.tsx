import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@tools/createEmotionCache';
import Seo from '@components/seo/Seo';
import { useDarkMode } from '@styles/muiTheme';
import GlobalLayout from '@components/layout/GlobalLayout';
import { useEffect } from 'react';
import { isProduction } from '@tools/helper';
import * as gtag from '@components/adsense/lib/gtag';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const { theme, toggleDarkMode } = useDarkMode();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalLayout toggleDarkMode={toggleDarkMode}>
                <Component {...pageProps} />
            </GlobalLayout>
        </ThemeProvider>
    );
};

function MyApp(props: MyAppProps) {
    const { emotionCache = clientSideEmotionCache, ...appProps } = props;
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            /* invoke analytics function only for production */
            if (isProduction) gtag.pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <CacheProvider value={emotionCache}>
            <Seo />
            <Head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                <meta name='google' content='notranslate' />
                <meta property='og:site_name' content='메이플 유틸' />
                <link rel='icon' href='/favicon.ico' />
                <meta name='naver-site-verification' content='c1ee52e4a060d1327e8953770828d7769dfd599d' />
            </Head>
            <App {...appProps} />
        </CacheProvider>
    );
}

export default appWithTranslation(MyApp);
