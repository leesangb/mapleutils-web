import 'server-only';

import { PropsWithChildren } from 'react';
import { I18nPageProps, languages } from '@/i18n/settings';
import StyledComponentsRegistry from './components/StyledComponentsRegistry';
import Layout from './components/Layout';

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

const RootLayout = ({ children, params: { lng } }: PropsWithChildren<I18nPageProps>) => {
    return (
        <html lang={lng} data-theme={'light'}>
            <body>
                <StyledComponentsRegistry>
                    <Layout>{children}</Layout>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
};

export default RootLayout;
