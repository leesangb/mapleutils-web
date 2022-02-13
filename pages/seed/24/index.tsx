import { Card, CardContent } from '@mui/material';
import { MusicPlayer } from '@components/music-player';
import { seed24AudioData } from '@data/seed/24';
import { Seo, SeoProps } from '@components/seo';
import { TitleCard } from '@components/card';
import { Comments } from '@components/comments';

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
            <TitleCard title={'시드 24층'} />
            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>
                    <MusicPlayer tracks={seed24AudioData} />
                </CardContent>
            </Card>
            <Comments pageKey={'seed24'} />
        </>
    );
};

export default Seed24;