import { Seo, SeoProps } from '@components/seo';
import { MonsterCard, TitleCard } from '@components/card';
import { seed49Data, SeedLocation, SeedMobData } from '@data/seed/49';
import { Button, Card, CardContent, Collapse, Divider, Grid, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import NextImage from 'next/image';
import { ChangeEvent, useMemo, useState } from 'react';
import { SearchBar } from '@components/input';
import { isHangulMatching } from '@tools/string';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import useCopy from '@hooks/useCopy';

const seoProps: SeoProps = {
    title: '더 시드 49층',
    keywords: ['49층', '족보', '몬스터', '실루엣', '도로시 챌린저', '도챌', '1급', '도로시'],
    description: '더 시드 49층 족보',
    image: '/images/49.png',
};

interface Seed49Props {
    data: SeedLocation[];
}

interface ContentProps {
    mob: SeedMobData & { location: string };
    silhouette: boolean;
}

interface StyledImgProps {
    silhouette: boolean;
}

const StyledImg = styled(NextImage)((props: StyledImgProps) => ({
    filter: props.silhouette ? 'brightness(0%)' : 'none',
    transition: '0.2s',
    pointerEvents: 'none',
}));

const Content = (props: ContentProps) => {
    const { mob } = props;
    const [silhouette, setSilhouette] = useState(true);
    const { copy, CopySnackbar } = useCopy();

    return (
        <>
            <Tooltip title={'클릭하여 복사하기'} arrow placement={'top'}>
                <MonsterCard tags={[mob.location]}
                             name={mob.name}
                             onClick={() => copy(mob.name)}
                             onMouseEnter={() => setSilhouette(false)}
                             onMouseLeave={() => setSilhouette(true)}>
                    <StyledImg width={mob.width}
                               height={mob.height}
                               src={`/images/seed/49/${mob.name}.png`}
                               silhouette={props.silhouette && silhouette}
                               alt={mob.name} />
                </MonsterCard>
            </Tooltip>
            <CopySnackbar />
        </>
    );
};

const Seed49 = (props: Seed49Props) => {
    const { data } = props;
    const [silhouette, setSilhouette] = useState(true);
    const allLocations = useMemo(() => data.map(l => l.location).sort((a, b) => a.localeCompare(b)), [data]);
    const [locations, setLocations] = useState(allLocations);
    const [collapse, setCollapse] = useState(true);

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
                }))).filter(m => isHangulMatching(search, m.location, m.name))
                .sort((a, b) => a.name.localeCompare(b.name))
        , [search, locations]);

    return (
        <>
            <Seo {...seoProps} />
            <TitleCard title={'시드 49층'} marginRight={1} />
            <Card variant={'outlined'}
                  sx={theme => ({
                      marginRight: theme.spacing(1),
                      marginBottom: theme.spacing(1),
                  })}>
                <CardContent>
                    <SearchBar placeholder={'몬스터 또는 마을 검색 (예: 주황버섯, ㅎㄴㅅㄴ, ...) [Ctrl] + [F] 또는 [F3]으로 포커싱, 초성 검색 ✅'}
                               value={search} onChange={handleSearch} onClear={handleClear} />
                    <Grid justifyContent={'space-between'} sx={theme => ({ marginTop: theme.spacing(1) })} container
                          spacing={1}>
                        <Grid item>
                            <Button
                                disableElevation
                                variant={'contained'}
                                onClick={() => setSilhouette(s => !s)}>
                                {silhouette ? '실루엣 OFF' : '실루엣 ON'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setCollapse(!collapse)}
                                    endIcon={collapse
                                        ? <KeyboardArrowDownRounded />
                                        : <KeyboardArrowUpRounded />}>
                                필터
                            </Button>
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
                                    onClick={() => setLocations(allLocations)}>전체 선택</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={'contained'}
                                    disableElevation
                                    onClick={() => setLocations(allLocations.filter(l => !locations.includes(l)))}>반전</Button>
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
                                            ? setLocations(locations.filter(l => l !== location))
                                            : setLocations([...locations, location])
                                        }>
                                        {location}</Button>
                                </Grid>)
                            }
                        </Grid>
                    </Collapse>
                </CardContent>
            </Card>
            <Masonry spacing={1} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
                {
                    filtered.map(mob => <Content silhouette={silhouette} mob={mob} key={mob.name} />)
                }
            </Masonry>


        </>
    );
};

export const getStaticProps = () => {
    return {
        props: {
            data: seed49Data,
        },
    };
};

export default Seed49;

