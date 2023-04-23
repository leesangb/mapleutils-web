import { TitleCard } from '../src/components/card';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <>
            <TitleCard title={t('pageNotFound')} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default NotFound;
