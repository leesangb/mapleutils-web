import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { seed24AudioData } from '@data/seed/24';
import { TrackInfo } from '@components/seed/24/music-player';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { Box } from '@mui/material';
import { Comments } from '@components/comments';
import Seed24Simulator from '@components/seed/24/Seed24Simulator';
import { MusicPlayerProvider } from '@components/seed/24/music-player/MusicPlayerContext';

interface Seed24SimulatorPageProps {
    data: TrackInfo[];
}

const Seed24SimulatorPage = ({ data }: Seed24SimulatorPageProps) => {
    const seoProps = useI18nSeoProps('seed24simulator');

    return (
        <>
            <Seo {...seoProps} image={'/images/24.png'} />
            <I18nTitleCard ns={'seed24simulator'} />

            <Box display={'flex'} justifyContent={'center'}>
                <MusicPlayerProvider tracks={data}>
                    <Seed24Simulator data={data} />
                </MusicPlayerProvider>
            </Box>

            <Comments pageKey={'seed24simulator'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed24', 'seed24simulator'])),
            data: seed24AudioData,
        },
    };
};


export default Seed24SimulatorPage;