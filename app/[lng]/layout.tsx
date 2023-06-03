import 'server-only';

import { PropsWithChildren } from 'react';
import { I18nPageProps, languages } from '@/i18n/settings';
import StyledComponentsRegistry from './components/StyledComponentsRegistry';
import Layout from './components/Layout';
import { ADSENSE_ID } from '@/components/adsense/lib/gtag';

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

const RootLayout = ({ children, params: { lng } }: PropsWithChildren<I18nPageProps>) => {
    return (
        <html lang={lng} data-theme={'light'}>
            <head>
                <script
                    data-ad-client={ADSENSE_ID}
                    async
                    src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <Layout>{children}</Layout>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
};

export default RootLayout;
