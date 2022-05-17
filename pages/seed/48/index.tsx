import { TitleCard } from '@components/card';
import { Card, CardContent } from '@mui/material';
import { VideoCapture } from '@components/video-capture';
import { Comments } from '@components/comments';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { TFunction } from 'i18next';
import { Seo, SeoProps } from '@components/seo';


const seoProps = (t: TFunction): SeoProps => ({
    title: t('seo.title', { ns: 'seed48' }),
    keywords: t('seo.keywords', { ns: 'seed48' }),
    description: t('seo.description', { ns: 'seed48' }),
    image: '/images/48.png',
});

const Seed48 = () => {
    const { t } = useTranslation();
    return (
        <>
            <Seo {...seoProps(t)} />
            <TitleCard title={t('title', { ns: 'seed48' })} />
            <Card variant={'outlined'}>
                <CardContent>
                    <VideoCapture />
                </CardContent>
            </Card>
            <Comments pageKey={'seed48'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed48'])),
        },
    };
};

export default Seed48;