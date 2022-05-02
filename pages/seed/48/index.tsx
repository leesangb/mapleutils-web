import { TitleCard } from '@components/card';
import { Card, CardContent } from '@mui/material';
import { VideoCapture } from '@components/video-capture';
import { Comments } from '@components/comments';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Seed48 = () => {
    return (
        <>
            <TitleCard title={'시드 48층'} />
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