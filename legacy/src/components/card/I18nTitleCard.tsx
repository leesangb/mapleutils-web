import { TitleCard } from './index';
import { useTranslation } from 'next-i18next';
import { PropsWithChildren } from 'react';

interface I18nTitleCardProps {
    /** i18n namespace containing key 'title' */
    ns: string;
}

const I18nTitleCard = ({ ns, children }: PropsWithChildren<I18nTitleCardProps>) => {
    const { t } = useTranslation(ns);
    return (
        <TitleCard title={t('title')}>
            {children}
        </TitleCard>
    );
};

export default I18nTitleCard;
