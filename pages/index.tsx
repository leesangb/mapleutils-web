import type { NextPage } from 'next';
import { CharacterCard, TitleCard } from '@components/card';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from '@components/link';
import { DiscordIcon, KakaoTalkIcon } from '@components/icons';
import { Comments } from '@components/comments';
import { GitHub } from '@mui/icons-material';
import { discordLink, githubLink, githubReleaseLink, kakaotalkLink } from '@tools/socialLinks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Locales } from '@tools/locales';


const English = () => {
    const { t } = useTranslation();

    return (
        <>
            <Grid item xs={12}>
                <Grid container alignItems={'center'} justifyContent={'space-between'}
                      spacing={2}
                      marginBottom={theme => theme.spacing(1)}>
                    <Grid item>
                        <Typography variant={'h5'} component={'span'}>
                            Bug reports or contact
                        </Typography>
                        <Button startIcon={<DiscordIcon />}
                                noLinkStyle
                                sx={theme => ({ margin: theme.spacing(1) })}
                                color={'inherit'}
                                rel={'noreferrer noopener'}
                                href={discordLink}
                                component={Link}
                                target={'_blank'}
                                size={'medium'}>
                            {t('discord')}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<GitHub />}
                                noLinkStyle
                                sx={theme => ({ margin: theme.spacing(1) })}
                                color={'inherit'}
                                rel={'noreferrer noopener'}
                                href={githubLink}
                                component={Link}
                                target={'_blank'}
                                size={'medium'}>
                            GitHub
                        </Button>
                        <Typography variant={'h6'} component={'span'}>issues and PR are welcome!</Typography>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<GitHub />}
                                noLinkStyle
                                sx={theme => ({ margin: theme.spacing(1) })}
                                color={'inherit'}
                                rel={'noreferrer noopener'}
                                href={githubReleaseLink}
                                component={Link}
                                target={'_blank'}
                                size={'medium'}>
                            go to release note
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} component={'p'}>
                            Special thanks to <i>Billy | 2DBF</i> (GMS) for English translations
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

const Korean = () => {
    const { t } = useTranslation();
    return (
        <>
            <Grid item xs={12} md={6}>
                <Grid container alignItems={'center'} marginBottom={theme => theme.spacing(1)}>
                    <Grid item>
                        <Typography variant={'h5'} component={'span'}>
                            각종 문의 및 버그 제보는
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<KakaoTalkIcon />}
                                noLinkStyle
                                sx={theme => ({ margin: theme.spacing(1) })}
                                color={'inherit'}
                                rel={'noreferrer noopener'}
                                href={kakaotalkLink}
                                component={Link}
                                target={'_blank'}
                                size={'medium'}>
                            크로아 상빈
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<DiscordIcon />}
                                noLinkStyle
                                sx={theme => ({ margin: theme.spacing(1) })}
                                color={'inherit'}
                                rel={'noreferrer noopener'}
                                href={discordLink}
                                component={Link}
                                target={'_blank'}
                                size={'medium'}>
                            {t('discord')}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant={'h5'} component={'span'}>
                            또는 댓글로 편하게 해주세요 😊
                        </Typography>
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item>
                        <Button startIcon={<GitHub />}
                                noLinkStyle
                                sx={theme => ({ margin: theme.spacing(1) })}
                                color={'inherit'}
                                rel={'noreferrer noopener'}
                                href={githubLink}
                                component={Link}
                                target={'_blank'}
                                size={'medium'}>
                            GitHub
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant={'h5'}>이슈 또는 PR도 환영입니다!</Typography>
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item><Button startIcon={<GitHub />}
                                       noLinkStyle
                                       sx={theme => ({ margin: theme.spacing(1) })}
                                       color={'inherit'}
                                       rel={'noreferrer noopener'}
                                       href={githubReleaseLink}
                                       component={Link}
                                       target={'_blank'}
                                       size={'medium'}>
                        릴리즈 노트 바로가기
                    </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item xs={6}>
                        <CharacterCard name={'상빈'}
                                       job={'듀블'}
                                       server={'크로아'} />
                    </Grid>
                    <Grid item xs={6}>
                        <CharacterCard name={'Lilly'}
                                       job={'호영'}
                                       server={'크로아'} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} align={'center'} component={'div'} fontWeight={'medium'}>
                            ↑ 인게임 문의는 여기로 ↑
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

const Home: NextPage = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <TitleCard title={t('welcome')} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Grid container spacing={1}>
                        {i18n.resolvedLanguage === Locales.Korean ? <Korean /> : <English />}
                    </Grid>


                </CardContent>
            </Card>
            <Comments title={'피드백'} pageKey={'feedbacks'} defaultOpen />
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default Home;
