import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { seed24AudioData, seed24AudioDataGMS, seed24AudioDataTMS } from '@data/seed/24';
import { TrackInfo } from '../../../src/components/seed/24/music-player';
import useI18nSeoProps from '../../../src/components/seo/useI18nSeoProps';
import { Seo } from '../../../src/components/seo';
import { I18nTitleCard } from '../../../src/components/card';
import { Box } from '@mui/material';
import Seed24Simulator from '../../../src/components/seed/24/Seed24Simulator';
import { MusicPlayerProvider } from '../../../src/components/seed/24/music-player/MusicPlayerContext';
import { Locales } from '../../../src/tools/locales';
import { Comments } from '../../../src/components/comments';

interface Seed24SimulatorPageProps {
    data: TrackInfo[];
}

interface LocalesAudioDataMapping {
    [key: string]: TrackInfo[];
}

const audioDataMapping: LocalesAudioDataMapping = {
    [Locales.Korean]: seed24AudioData,
    [Locales.English]: seed24AudioDataGMS,
    [Locales.TraditionalChinese]: seed24AudioDataTMS,
};

const Seed24SimulatorPage = ({ data }: Seed24SimulatorPageProps) => {
    const seoProps = useI18nSeoProps('seed24simulator');

    return (
        <>
            <Seo {...seoProps} image={'/images/24.png'} />
            <I18nTitleCard ns={'seed24simulator'} />

            <Box display={'flex'} justifyContent={'center'}>
                <MusicPlayerProvider tracks={data}>
                    <Seed24Simulator />
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
            data: audioDataMapping[locale],
        },
    };
};


export default Seed24SimulatorPage;
