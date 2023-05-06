import { PropsWithChildren } from 'react';
import { I18nPageProps } from '@/i18n/settings';

const SeedLayout = ({ children }: PropsWithChildren<I18nPageProps>) => {
    return (
        <>
            {children}
        </>
    );
};

export default SeedLayout;
