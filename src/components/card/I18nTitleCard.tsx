import { TitleCard } from '@components/card/index';
import { useTranslation } from 'next-i18next';

interface I18nTitleCardProps {
    /** i18n namespace containing key 'title' */
    ns: string;
}

const I18nTitleCard = ({ ns }: I18nTitleCardProps) => {
    const { t } = useTranslation(ns);
    return <TitleCard title={t('title')} />;
};

export default I18nTitleCard;