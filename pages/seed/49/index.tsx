import { Seo, SeoProps } from '@components/seo';
import { MonsterCard, TitleCard } from '@components/card';
import { seed49Data, SeedLocation, SeedMobData } from '@data/seed/49';
import { Masonry } from '@mui/lab';
import { Alert, Box, Button, Card, CardContent, Paper, Snackbar, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import NextImage from 'next/image';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { SearchBar } from '@components/input';
import { isHangulMatching } from '@tools/string';

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

    const [message, setMessage] = useState<string | null>(null);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage(null);
    };

    const onClip = useCallback(() => {
        setMessage(null);
        navigator.clipboard.writeText(mob.name)
            .then(() => {
                setMessage(`<${mob.name}>를(을) 복사했습니다!`);
            });
    }, [mob]);

    return (
        <>
            <Tooltip title={'클릭하여 복사하기'} arrow placement={'top'}>
                <MonsterCard tags={[mob.location]}
                             name={mob.name}
                             onClick={onClip}
                             onMouseEnter={() => setSilhouette(false)}
                             onMouseLeave={() => setSilhouette(true)}>
                    <StyledImg width={mob.width}
                               height={mob.height}
                               src={`/images/seed/49/${mob.name}.png`}
                               silhouette={props.silhouette && silhouette}
                               alt={mob.name} />
                </MonsterCard>
            </Tooltip>

            <Snackbar
                open={!!message}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Paper elevation={8}>
                    <Alert variant={'outlined'} severity={'success'}>{message}</Alert>
                </Paper>
            </Snackbar>
        </>
    );
};

const Seed49 = (props: Seed49Props) => {
    const { data } = props;
    const [silhouette, setSilhouette] = useState(true);

    const [search, setSearch] = useState<string>('');
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const handleClear = () => setSearch('');

    const filtered = useMemo(() =>
            data.flatMap(l => l.mobs.map(m => ({
                ...m,
                location: l.location,
            }))).filter(m => isHangulMatching(search, m.location, m.name))
                .sort((a, b) => a.name.localeCompare(b.name))
        , [search]);

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
                    <Box textAlign={'right'}>
                        <Button sx={theme => ({ marginTop: theme.spacing(1) })} disableElevation variant={'contained'}
                                onClick={() => setSilhouette(s => !s)}>
                            {silhouette ? '실루엣 OFF' : '실루엣 ON'}
                        </Button>

                    </Box>
                </CardContent>
            </Card>
            <Masonry spacing={1} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
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

