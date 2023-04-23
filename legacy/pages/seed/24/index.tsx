import {
    Avatar,
    Button,
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
import { MusicPlayer, TrackInfo } from '../../../src/components/seed/24/music-player';
import { Seo } from '../../../src/components/seo';
import { I18nTitleCard } from '../../../src/components/card';
import useWindowDimensions from '../../../src/hooks/useWindowDimensions';
import { useCallback } from 'react';
import { isHangulMatching, isMatching } from '../../../src/tools/string';
import { useTheme } from '@mui/system';
import { TabContext, TabPanel } from '@mui/lab';
import useCopy from '../../../src/hooks/useCopy';
import { useTranslation } from 'next-i18next';
import { TOptions } from 'i18next';
import { seed24AudioData, seed24AudioDataGMS, seed24AudioDataTMS } from '@data/seed/24';
import VirtualizedFixedList from '../../../src/components/virtualized-list/VirtualizedFixedList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useI18nSeoProps from '../../../src/components/seo/useI18nSeoProps';
import { useSeed24Tabs } from '../../../src/components/seed/24';
import { Locales } from '../../../src/tools/locales';
import NextLink from 'next/link';
import { Comments } from '../../../src/components/comments';

const SCREEN_HEIGHT_OFFSET = 400; // magic number ?
const SMALL_SCREEN_ROW_SIZE = 110;
const MEDIUM_SCREEN_ROW_SIZE = 60;

const seed24Translation: TOptions = { ns: 'seed24' };

interface Seed24Props {
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

const Seed24 = ({ data }: Seed24Props) => {
    const { height } = useWindowDimensions();
    const seoProps = useI18nSeoProps('seed24');
    const { t, i18n } = useTranslation();
    const { copy, CopySnackbar } = useCopy();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { tab, onChangeTab } = useSeed24Tabs();

    const rowRenderer = useCallback(
        (item: TrackInfo) => (
            <Tooltip arrow placement={'top'} title={<Typography>{t('copyItem', { text: item.name })}</Typography>}>
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

    const searchFilter = useCallback((item: TrackInfo, pattern: string) => i18n.resolvedLanguage === Locales.Korean
        ? isHangulMatching(pattern, item.name, item.hint)
        : isMatching(pattern, item.name, item.hint), [i18n.resolvedLanguage]);


    const handleChangeTab = (_: any, value: string) => {
        onChangeTab(value);
    };

    return (
        <>
            <Seo {...seoProps} image={'/images/24.png'} />
            <I18nTitleCard ns={'seed24'}>
                <NextLink href={'/seed/24/simulator'} passHref>
                    <Button component={'a'}>
                        {t('goToSeed24Simulator')}
                    </Button>
                </NextLink>
            </I18nTitleCard>

            <TabContext value={tab}>
                <Paper variant={'outlined'}>
                    <Tabs value={tab} onChange={handleChangeTab} centered>
                        <Tab value={'bgm'} label={t('bgm', seed24Translation)} />
                        <Tab value={'hint'} label={t('hint', seed24Translation)} />
                    </Tabs>
                </Paper>

                <TabPanel sx={{ padding: `${theme.spacing(1)} 0` }} value={'bgm'}>
                    <Card elevation={0} variant={'outlined'} component={'section'}>
                        <CardContent>
                            <MusicPlayer tracks={data} />
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel sx={{ padding: `${theme.spacing(1)} 0` }} value={'hint'}>
                    <Card elevation={0} variant={'outlined'} component={'section'}>
                        <CardContent>
                            <VirtualizedFixedList items={data}
                                                  height={height - SCREEN_HEIGHT_OFFSET}
                                                  width={'100%'}
                                                  rowSize={smDown ? SMALL_SCREEN_ROW_SIZE : MEDIUM_SCREEN_ROW_SIZE}
                                                  divider
                                                  searchFilter={searchFilter}
                                                  placeholder={t('searchPlaceholder', { ns: 'seed24' })}
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
            data: audioDataMapping[locale],
            ...(await serverSideTranslations(locale, ['common', 'seed24'])),
        },
    };
};

export default Seed24;
