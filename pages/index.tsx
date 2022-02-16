import type { NextPage } from 'next';
import { CharacterCard, TitleCard } from '@components/card';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from '@components/link';
import { KakaoTalkIcon } from '@components/icons';
import { Comments } from '@components/comments';
import { GitHub } from '@mui/icons-material';

const Home: NextPage = () => {
    return (
        <>
            <TitleCard title={'환영합니다!'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Grid container spacing={1}>
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
                                            href={'https://open.kakao.com/o/sDbLVFoc'}
                                            component={Link}
                                            target={'_blank'}
                                            size={'medium'}>
                                        크로아 상빈
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
                                            href={'https://github.com/leesangb/mapleutils-web'}
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
                                                   href={'https://github.com/leesangb/mapleutils-web/releases'}
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
                    </Grid>


                </CardContent>
            </Card>
            <Comments title={'피드백'} pageKey={'feedbacks'} defaultOpen />
        </>
    );
};

export default Home;
