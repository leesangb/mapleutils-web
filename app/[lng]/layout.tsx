import 'server-only';

import { PropsWithChildren } from 'react';
import { I18nPageProps, languages } from '@/i18n/settings';
import StyledComponentsRegistry from './components/StyledComponentsRegistry';
import Layout from './components/Layout';
import { ADSENSE_ID, GA_TRACKING_ID } from '@/components/adsense/lib/gtag';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import Script from 'next/script';

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: {
            default: '메이플 유틸',
            template: '메이플 유틸 : %s',
        },
        viewport: {
            width: 'device-width',
            userScalable: false,
            minimumScale: 1,
            initialScale: 1,
        },
    };
};

const RootLayout = ({ children, params: { lng } }: PropsWithChildren<I18nPageProps>) => {
    return (
        <html lang={lng} data-theme={'light'}>
            <head>
                <Script
                    data-ad-client={ADSENSE_ID}
                    strategy={'afterInteractive'}
                    src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                />
                <GoogleAnalytics GA_TRACKING_ID={GA_TRACKING_ID} />
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
