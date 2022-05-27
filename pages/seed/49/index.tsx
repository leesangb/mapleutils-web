import { Seo } from '@components/seo';
import { seed49Data, SeedLocation } from '@data/seed/49';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo, useState } from 'react';
import { isHangulMatching, isMatching } from '@tools/string';
import { Masonry } from '@mui/lab';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { Comments } from '@components/comments';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seed49MobCard, Seed49Search, useSeed49Location } from '@components/seed/49';
import Display from '@components/display/Display';
import { I18nTitleCard } from '@components/card';


interface Seed49Props {
    data: SeedLocation[];
}

const MOB_CARDS_HEIGHT_OFFSET = 380; // magic number, need to compute this value later

const Seed49 = ({ data }: Seed49Props) => {
    const seoProps = useI18nSeoProps('seed49');
    const { t, i18n } = useTranslation(['common', 'seed49']);
    const [silhouette, setSilhouette] = useState(true);
    const { locations, onChangeLocations, allLocations } = useSeed49Location(data);
    const { height } = useWindowDimensions();

    const [search, setSearch] = useState<string>('');

    const filtered = useMemo(() =>
            data.filter(l => locations.includes(l.location))
                .flatMap(l => l.mobs.map(m => ({
                    ...m,
                    location: l.location,
                })))
                .filter(m => i18n.resolvedLanguage === 'kr'
                    ? isHangulMatching(search, m.location, m.name)
                    : isMatching(search, t(m.location, { ns: 'seed49' }), t(m.name, { ns: 'seed49' })))
                .sort((a, b) => t(a.name, { ns: 'seed49' }).localeCompare(t(b.name, { ns: 'seed49' })))
        , [search, locations, t, i18n.resolvedLanguage]);

    return (
        <>
            <Seo {...seoProps} image={'/images/49.png'} />
            <I18nTitleCard ns={'seed49'} />

            <Card variant={'outlined'}
                  sx={theme => ({ marginBottom: theme.spacing(1) })}>
                <CardContent>
                    <Seed49Search search={search}
                                  onSearch={setSearch}
                                  silhouette={silhouette}
                                  onChangeSilhouette={setSilhouette}
                                  locations={locations}
                                  onChangeLocations={onChangeLocations}
                                  allLocations={allLocations} />
                </CardContent>
            </Card>

            <Box sx={theme => ({ borderRadius: theme.spacing(2), overflowY: 'scroll' })}
                 maxHeight={height - MOB_CARDS_HEIGHT_OFFSET}
                 height={height - MOB_CARDS_HEIGHT_OFFSET}>
                <Masonry spacing={1} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
                    {
                        filtered.map(mob => <Seed49MobCard silhouette={silhouette} mob={mob} key={mob.name} />)
                    }
                </Masonry>
            </Box>

            <Comments title={t('comments')} pageKey={'seed49'} />

            <Display when={i18n.resolvedLanguage === 'en'}>
                <Typography variant={'caption'}>
                    Special thanks to <i>Billy | 2DBF</i> (GMS) for English translations
                </Typography>
            </Display>
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed49'])),
            data: seed49Data,
        },
    };
};

export default Seed49;

