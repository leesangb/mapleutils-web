import { I18nTitleCard } from '../../../src/components/card';
import { Card, CardContent, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Seo } from '../../../src/components/seo';
import useI18nSeoProps from '../../../src/components/seo/useI18nSeoProps';
import NextImage from 'next/image';
import { Comments } from '../../../src/components/comments';
import VideoCapture2 from '../../../src/components/video-capture/VideoCapture2';


const Seed48 = () => {
    const { t } = useTranslation();
    const seoProps = useI18nSeoProps('seed48');
    return (
        <>
            <Seo {...seoProps} image={'/images/48.png'} />
            <I18nTitleCard ns={'seed48'} />
            <Card variant={'outlined'} sx={theme => ({ marginBottom: theme.spacing(1) })}>
                <CardContent>
                    <VideoCapture2 />
                </CardContent>
            </Card>
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography variant={'h3'}>{t('mapGuide', { ns: 'seed48' })}</Typography>
                    <NextImage src={'/images/seed/48.png'} width={3760} height={1270} />
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
