import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@tools/createEmotionCache';
import { defaultTheme } from '@styles/muiTheme';
import { ADSENSE_ID, GA_TRACKING_ID } from '@components/adsense/lib/gtag';
import { isProduction } from '@tools/helper';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang={this.props.locale}>
                <Head>
                    <meta name='theme-color' content={defaultTheme.palette.background.default} />
                    <link
                        href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
                        rel='stylesheet'
                        type='text/css'
                    />
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                    />
                    <script
                        data-ad-client={ADSENSE_ID}
                        async
                        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                    />
                    {isProduction && (
                        <>
                            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                            <script
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                                }}
                            />
                        </>
                    )}
                    {(this.props as any).emotionStyleTags}
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
