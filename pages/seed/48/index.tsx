import { TitleCard } from '@components/card';
import { Card, CardContent } from '@mui/material';
import { VideoCapture } from '@components/video-capture';

const Seed48 = () => {
    return (
        <>
            <TitleCard title={'시드 48층'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <VideoCapture />
                </CardContent>
            </Card>
        </>
    );
};

export default Seed48;