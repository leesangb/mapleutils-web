import { Seo, SeoProps } from '@components/seo';
import { MonsterCard, TitleCard } from '@components/card';
import { seed49Data, SeedLocation, SeedMobData } from '@data/seed/49';
import {
    Badge,
    Button,
    Card,
    CardContent,
    Collapse,
    Divider,
    Grid,
    Theme,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import NextImage from 'next/image';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { SearchBar } from '@components/input';
import { isHangulMatching, isMatching } from '@tools/string';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import useCopy from '@hooks/useCopy';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { Comments } from '@components/comments';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';
import { TFunction, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const seoProps = (t: TFunction, ns: string): SeoProps => ({
    title: t('seo.title', { ns }),
    keywords: t('seo.keywords', { ns }).split(', '),
    description: t('seo.description', { ns }),
    image: '/images/49.png',
});

interface Seed49Props {
    data: SeedLocation[];
}

interface ContentProps {
    mob: SeedMobData & { location: string };
    silhouette: boolean;
}

interface StyledImgProps {
    // maybe fix with transient props with styled component
    silhouette: number;
    filter: string;
}

const StyledImg = styled(NextImage)((props: StyledImgProps) => ({
    filter: props.silhouette ? props.filter : 'none',
    transition: '0.2s',
    pointerEvents: 'none',
}));

const getFilter = (theme: Theme): string => {
    if (theme.palette.mode === 'light') {
        return 'brightness(0%)';
    } else {
        return 'brightness(0%) drop-shadow(0 0 1px white)';
    }
};

const Content = (props: ContentProps) => {
    const { t } = useTranslation(['common', 'seed49']);
    const { mob } = props;
    const theme = useTheme();
    const [silhouette, setSilhouette] = useState(true);
    const filter = useMemo(() => getFilter(theme), [theme]);
    const { copy, CopySnackbar } = useCopy();

    return (
        <>
            <Tooltip title={t('clickToCopy')} arrow placement={'top'}>
                <MonsterCard tags={[t(mob.location, { ns: 'seed49' })]}
                             name={t(mob.name, { ns: 'seed49' })}
                             onClick={() => copy(t(mob.name, { ns: 'seed49' }))}
                             onMouseEnter={() => setSilhouette(false)}
                             onMouseLeave={() => setSilhouette(true)}>
                    <StyledImg width={mob.width}
                               height={mob.height}
                               src={mob.img}
                               silhouette={props.silhouette && silhouette ? 1 : 0}
                               filter={filter}
                               alt={t(mob.name, { ns: 'seed49' })} />
                </MonsterCard>
            </Tooltip>
            <CopySnackbar />
        </>
    );
};

const useSeed49Location = (data: SeedLocation[]) => {
    const { t } = useTranslation(['seed49']);
    const allLocations = useMemo(() => data.map(l => l.location).sort((a, b) => t(a).localeCompare(t(b))), [data]);
    const [locations, setLocations] = useState(allLocations);

    const onChangeLocations = useCallback((locations: string[]) => {
        setLocations(locations);
        LocalStorageHelper.save(LocalStorageKey.SEED_49_LOCATIONS, locations);
    }, []);

    useEffect(() => {
        const locations = LocalStorageHelper.load<string[] | null>(LocalStorageKey.SEED_49_LOCATIONS);
        onChangeLocations(locations ? locations.filter(location => allLocations.includes(location)) : allLocations);
    }, []);

    return {
        locations, onChangeLocations,

        allLocations,
    };
};


const Seed49 = ({ data }: Seed49Props) => {
    const { t, i18n } = useTranslation(['common', 'seed49']);
    const [silhouette, setSilhouette] = useState(true);
    const [collapse, setCollapse] = useState(true);
    const { locations, onChangeLocations, allLocations } = useSeed49Location(data);
    const { height } = useWindowDimensions();

    const [search, setSearch] = useState<string>('');
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const handleClear = () => setSearch('');

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
            <Seo {...seoProps(t, 'seed49')} />
            <TitleCard title={t('title', { ns: 'seed49' })} marginRight={1} />
            <Card variant={'outlined'}
                  sx={theme => ({
                      marginRight: theme.spacing(1),
                      marginBottom: theme.spacing(1),
                  })}>
                <CardContent>
                    <SearchBar placeholder={t('searchPlaceholder', { ns: 'seed49' })}
                               value={search} onChange={handleSearch} onClear={handleClear} />
                    <Grid justifyContent={'space-between'} sx={theme => ({ marginTop: theme.spacing(1) })} container
                          spacing={1}>
                        <Grid item>
                            <Button
                                disableElevation
                                variant={'contained'}
                                onClick={() => setSilhouette(s => !s)}>
                                {silhouette ? `${t('silhouette')} OFF` : `${t('silhouette')} ON`}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Badge badgeContent={locations.length} color={'primary'}
                                   invisible={locations.length === allLocations.length}>
                                <Button onClick={() => setCollapse(!collapse)}
                                        endIcon={collapse
                                            ? <KeyboardArrowDownRounded />
                                            : <KeyboardArrowUpRounded />}>
                                    {t('filters')}
                                </Button>
                            </Badge>
                        </Grid>
                    </Grid>
                    <Collapse in={!collapse} timeout={'auto'} unmountOnExit>
                        <Grid container sx={theme => ({ marginTop: theme.spacing(1) })} spacing={1}>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={'contained'}
                                    disableElevation
                                    onClick={() => onChangeLocations(allLocations)}>{t('selectAll')}</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={'contained'}
                                    disableElevation
                                    onClick={() => onChangeLocations(allLocations.filter(l => !locations.includes(l)))}>{t('invert')}</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            {
                                allLocations.map(location => <Grid key={location} item>
                                    <Button
                                        size={'small'}
                                        disableElevation
                                        variant={locations.includes(location) ? 'contained' : 'outlined'}
                                        onClick={() => locations.includes(location)
                                            ? onChangeLocations(locations.filter(l => l !== location))
                                            : onChangeLocations([...locations, location])
                                        }>
                                        {t(location, { ns: 'seed49' })}</Button>
                                </Grid>)
                            }
                        </Grid>
                    </Collapse>
                </CardContent>
            </Card>
            <Box sx={theme => ({ borderRadius: theme.spacing(2) })}
                 overflow={'scroll'}
                 maxHeight={height - 380}
                 height={height - 380}>
                <Masonry spacing={1} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
                    {
                        filtered.map(mob => <Content silhouette={silhouette} mob={mob} key={mob.name} />)
                    }
                </Masonry>
            </Box>
            {
                i18n.resolvedLanguage === 'kr'
                    ? <Comments title={t('comments')} pageKey={'seed49'} />
                    : (
                        <Typography variant={'caption'}>
                            Special thanks to <i>Billy | 2DBF</i> (GMS) for English translations
                        </Typography>
                    )
            }
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

