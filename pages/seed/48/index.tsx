import { TitleCard } from '@components/card';
import { Card, CardContent } from '@mui/material';
import { VideoCapture } from '@components/video-capture';
import { Comments } from '@components/comments';

const Seed48 = () => {
    return (
        <>
            <TitleCard title={'시드 48층'} showAnalytics />
            <Card variant={'outlined'}>
                <CardContent>
                    <VideoCapture />
                </CardContent>
            </Card>
            <Comments pageKey={'seed48'} />
        </>
    );
};

export default Seed48;