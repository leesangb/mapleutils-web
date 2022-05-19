import { TitleCard } from '@components/card';
import { Card, CardContent } from '@mui/material';
import { VideoCapture } from '@components/video-capture';
import { Comments } from '@components/comments';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Seo } from '@components/seo';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';


const Seed48 = () => {
    const { t } = useTranslation();
    const seoProps = useI18nSeoProps('seed48');
    return (
        <>
            <Seo {...seoProps} image={'/images/48.png'} />
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