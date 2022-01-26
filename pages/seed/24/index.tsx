import { Card, CardContent, Typography } from '@mui/material';
import { MusicPlayer } from '@components/music-player';
import { seed24AudioData } from '@data/seed/24';
import { Seo, SeoProps } from '@components/seo';

const seoProps: SeoProps = {
    title: '더 시드 24층',
    keywords: ['24층', 'bgm', '브금', '족보'],
    description: '더 시드 24층 브금 모음',
    image: '/images/24.png',
};

const Seed24 = () => {
    return (
        <>
            <Seo {...seoProps} />
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