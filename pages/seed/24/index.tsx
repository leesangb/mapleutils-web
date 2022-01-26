import { Card, CardContent, Typography } from '@mui/material';
import MusicPlayer from '@components/music-player/MusicPlayer';
import { seed24AudioData } from '@data/seed/24';

const Seed24 = () => {

    return (
        <>
            <Card elevation={0} variant={'outlined'} sx={(theme) => ({ marginBottom: theme.spacing(1) })}>
                <CardContent>
                    <Typography variant={'h1'}>
                        시드 24층
                    </Typography>
                </CardContent>
            </Card>
            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>
                    <MusicPlayer tracks={seed24AudioData} />
                </CardContent>
            </Card>
        </>
    );
};

export default Seed24;