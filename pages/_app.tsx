import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@tools/createEmotionCache';
import Seo from '@components/seo/Seo';
import { observer } from 'mobx-react';
import { StoreProvider } from 'src/stores/StoreContext';
import Header from '@components/header/Header';
import { useDarkMode } from '@styles/muiTheme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const App = observer((props: AppProps) => {
    const { Component, pageProps } = props;
    const { theme, toggleDarkMode } = useDarkMode();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header themeType={theme.palette.mode} toggleDarkMode={toggleDarkMode}>
                <Component {...pageProps} />
            </Header>
        </ThemeProvider>
    );
});

function MyApp(props: MyAppProps) {
    const { emotionCache = clientSideEmotionCache, ...appProps } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Seo />
            <Head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                <meta name='google' content='notranslate' />
                <meta property='og:site_name' content='메이플 유틸' />
                <link rel='icon' href='/favicon.ico' />
                <link
                    href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
                    rel='stylesheet'
                    type='text/css'
                />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
            </Head>
            <StoreProvider>
                <App {...appProps} />
            </StoreProvider>
        </CacheProvider>
    );
}

export default MyApp;
