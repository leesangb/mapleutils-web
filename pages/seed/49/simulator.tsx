import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { seed49Data, seed49KmsFilter, SeedMobData } from '@data/seed/49';
import { Locales } from '@tools/locales';
import { Seo } from '@components/seo';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { I18nTitleCard } from '@components/card';
import { Comments } from '@components/comments';
import { Box } from '@mui/material';
import Seed49Simulator from '@components/seed/49/Seed49Simulator';

interface Seed49SimulatorProps {
    data: SeedMobData[];
}

const Seed49SimulatorPage = ({ data }: Seed49SimulatorProps) => {
    const seoProps = useI18nSeoProps('seed39simulator');
    return (
        <>
            <Seo {...seoProps} image={'/images/39.png'} />
            <I18nTitleCard ns={'seed39simulator'} />

            <Box display={'flex'} justifyContent={'center'}>
                <Seed49Simulator data={data} />
            </Box>

            <Comments pageKey={'seed39simulator'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed49'])),
            data: seed49Data.map(location => {
                if (locale === Locales.Korean) {
                    return {
                        location: location.location,
                        mobs: location.mobs.filter(mob => !seed49KmsFilter.has(mob.name)),
                    };
                }
                return location;
            }).filter(l => l.mobs.length).flatMap(l => l.mobs),
        },
    };
};

export default Seed49SimulatorPage;