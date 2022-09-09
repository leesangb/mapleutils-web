import { Seo } from '@components/seo';
import { seed49Data, seed49GmsFilter, seed49KmsFilter, SeedLocation } from '@data/seed/49';
import { Badge, Button, Card, CardContent, NoSsr, Typography } from '@mui/material';
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
import { Locales } from '@tools/locales';
import useSeed49Favorite from '@components/seed/49/useSeed49Favorite';
import useBookmarkStore from '@store/useBookmarkStore';
import { LocalStorageKey } from '@tools/localStorageHelper';
import NextLink from 'next/link';


interface Seed49Props {
    data: SeedLocation[];
}

const MOB_CARDS_HEIGHT_OFFSET = 380; // magic number, need to compute this value later

const Seed49 = ({ data }: Seed49Props) => {
    const keywords = useMemo(() => data.flatMap(l => l.mobs.map(m => m.name)), [data]);
    const seoProps = useI18nSeoProps('seed49', keywords);
    const { t, i18n } = useTranslation(['common', 'seed49']);
    const [silhouette, setSilhouette] = useState(true);
    const { locations, onChangeLocations, allLocations } = useSeed49Location(data);
    const { showOnlyFavorite, onChangeShowOnlyFavorite } = useSeed49Favorite();
    const favorites = useBookmarkStore[LocalStorageKey.SEED_49_BOOKMARKS](store => store.bookmarks);
    const { height } = useWindowDimensions();

    const [search, setSearch] = useState<string>('');

    const filtered = useMemo(() =>
            data.filter(l => locations.includes(l.location))
                .flatMap(l => l.mobs.map(m => ({
                    ...m,
                    location: l.location,
                })))
                .filter(m => showOnlyFavorite ? favorites.has(m.name) : true)
                .filter(m => i18n.resolvedLanguage === Locales.Korean
                    ? isHangulMatching(search, m.location, m.name)
                    : isMatching(search, t(m.location, { ns: 'seed49' }), t(m.name, { ns: 'seed49' })))
                .sort((a, b) => t(a.name, { ns: 'seed49' }).localeCompare(t(b.name, { ns: 'seed49' })))
        , [search, locations, t, i18n.resolvedLanguage, showOnlyFavorite]);

    return (
        <>
            <Seo {...seoProps} image={'/images/49.png'} />
            <I18nTitleCard ns={'seed49'}>
                <NextLink href={'/seed/49/simulator'} passHref>
                    <Badge variant={'dot'} color={'error'}>
                        <Button component={'a'}>
                            {t('goToSeed49Simulator')}
                        </Button>
                    </Badge>
                </NextLink>
            </I18nTitleCard>

            <Card variant={'outlined'}
                  sx={theme => ({ marginBottom: theme.spacing(1) })}>
                <CardContent>
                    <Seed49Search search={search}
                                  showOnlyFavorite={showOnlyFavorite}
                                  onChangeShowOnlyFavorite={onChangeShowOnlyFavorite}
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
                <NoSsr>
                    <Masonry defaultColumns={4} defaultHeight={height - MOB_CARDS_HEIGHT_OFFSET} defaultSpacing={1}
                             spacing={1}
                             columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
                        {
                            filtered.map(mob => <Seed49MobCard silhouette={silhouette} mob={mob} key={mob.name} />)
                        }
                    </Masonry>
                </NoSsr>
            </Box>

            <Comments title={t('comments')} pageKey={'seed49'} />

            <Display when={i18n.resolvedLanguage === Locales.English}>
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
            data: seed49Data.map(location => {
                if (locale === Locales.Korean) {
                    return {
                        location: location.location,
                        mobs: location.mobs.filter(mob => !seed49KmsFilter.has(mob.name)),
                    };
                }
                if (locale === Locales.English) {
                    return {
                        location: location.location,
                        mobs: location.mobs.filter(mob => !seed49GmsFilter.has(mob.name)),
                    };
                }
                return location;
            }).filter(l => l.mobs.length),
        },
    };
};

export default Seed49;

