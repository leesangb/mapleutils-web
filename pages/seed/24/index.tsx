import {
    Avatar,
    Card,
    CardContent,
    Grid,
    ListItem,
    Paper,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { MusicPlayer, TrackInfo } from '@components/music-player';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { useCallback, useEffect } from 'react';
import { isHangulMatching } from '@tools/string';
import { useTheme } from '@mui/system';
import { TabContext, TabPanel } from '@mui/lab';
import useCopy from '@hooks/useCopy';
import { useTranslation } from 'next-i18next';
import { TOptions } from 'i18next';
import { seed24AudioData } from '@data/seed/24';
import VirtualizedFixedList from '@components/virtualized-list/VirtualizedFixedList';
import { Comments } from '@components/comments';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { useSeed24Tabs } from '@components/seed/24';


const seed24Translation: TOptions = { ns: 'seed24' };

const Seed24 = () => {
    const { height } = useWindowDimensions();
    const seoProps = useI18nSeoProps('seed24');
    const { t, i18n } = useTranslation();
    const isKMS = i18n.resolvedLanguage === 'kr';
    const { copy, CopySnackbar } = useCopy();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { tab, onChangeTab } = useSeed24Tabs();

    const rowRenderer = useCallback(
        (item: TrackInfo) => (
            <Tooltip arrow placement={'top'} title={<Typography>{item.name} 복사하기</Typography>}>
                <ListItem button onClick={() => copy(item.name)}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={3} sm={2} md={1}>
                            <Avatar variant={'rounded'} src={item.coverImg} alt={item.name} />
                        </Grid>
                        <Grid item xs={9} sm={2} md={2}>
                            <Typography variant={'h6'} component={'div'}>
                                {item.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Typography variant={'body1'} component={'div'}>
                                {item.hint}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </Tooltip>
        ),
        [],
    );

    const searchFilter = useCallback((item: TrackInfo, pattern: string) => isHangulMatching(pattern, item.name, item.hint), []);


    const handleChangeTab = (_: any, value: string) => {
        onChangeTab(value);
    };

    useEffect(() => {
        if (i18n.resolvedLanguage !== 'kr') {
            onChangeTab('bgm');
        }
    }, [i18n.resolvedLanguage, onChangeTab]);

    return (
        <>
            <Seo {...seoProps} image={'/images/24.png'} />
            <I18nTitleCard ns={'seed24'} />

            <TabContext value={tab}>
                <Paper variant={'outlined'}>
                    <Tabs value={tab} onChange={handleChangeTab} centered>
                        <Tab value={'bgm'} label={t('bgm', seed24Translation)} />
                        <Tab disabled={!isKMS} value={'hint'} label={t('hint', seed24Translation)} />
                    </Tabs>
                </Paper>

                <TabPanel sx={{ padding: `${theme.spacing(1)} 0` }} value={'bgm'}>
                    <Card elevation={0} variant={'outlined'} component={'section'}>
                        <CardContent>
                            <MusicPlayer tracks={seed24AudioData} />
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel sx={{ padding: `${theme.spacing(1)} 0` }} value={'hint'}>
                    <Card elevation={0} variant={'outlined'} component={'section'}>
                        <CardContent>
                            <VirtualizedFixedList items={seed24AudioData}
                                                  height={height - 400}
                                                  width={'100%'}
                                                  rowSize={smDown ? 110 : 60}
                                                  divider
                                                  searchFilter={searchFilter}
                                                  placeholder={'힌트 검색 (예: 리스항구, 푸른빛, ㅍㄹㅂ, ...) [Ctrl] + [F] 또는 [F3]으로 포커싱, 초성 검색 ✅'}
                                                  rowRenderer={rowRenderer} />
                        </CardContent>
                    </Card>
                </TabPanel>
                <CopySnackbar />
            </TabContext>

            <Comments pageKey={'seed24'} />
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed24'])),
        },
    };
};

export default Seed24;