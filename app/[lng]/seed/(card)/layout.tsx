import { PropsWithChildren } from 'react';
import { I18nPageProps } from '@/i18n/settings';
import { Card } from '@/ds/surfaces';

const SeedLayout = ({ children }: PropsWithChildren<I18nPageProps>) => {
    return (
        <Card>
            {children}
        </Card>
    );
};

export default SeedLayout;
