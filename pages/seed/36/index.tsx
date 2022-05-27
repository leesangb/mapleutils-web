import { Seo } from '@components/seo';
import { Box, Button, Card, CardActionArea, CardContent, Grid, Hidden, Typography } from '@mui/material';
import { I18nTitleCard } from '@components/card';
import { useState } from 'react';
import { seed36Data } from '@data/seed/36';
import { ReplayRounded } from '@mui/icons-material';
import { Comments } from '@components/comments';
import NextImage from 'next/image';
import { styled } from '@mui/system';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';

type Step = 0 | 1 | 2 | 3 | undefined;
type Steps = [Step, Step, Step, Step, Step, Step, Step, Step]

const buildDefaultSteps = (): Steps => [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

interface ContentProps {
    steps: Steps;
    resetSteps: () => void;
    onChangeStep: (step: Step, index: number) => void;
}

const StyledImage = styled(NextImage)({
    pointerEvents: 'none',
});

const Content = (props: ContentProps) => {
    const { t } = useTranslation();
    const { steps } = props;
    return (
        <Grid container>
            <Hidden smUp>
                <Grid item xs={12}>
                    <Button sx={(theme) => ({ marginBottom: theme.spacing(1), float: 'right' })}
                            variant={'contained'} disableElevation
                            onClick={props.resetSteps}
                            startIcon={<ReplayRounded />}>
                        {t('reset')}
                    </Button>
                </Grid>
            </Hidden>
            {steps.map((s, i) => (
                <Grid item xs={12} key={`step-${i}`}>
                    <Grid container spacing={1} alignItems='center'>
                        <Hidden smDown>
                            <Grid item sm={2}>
                                <Typography align={'center'} variant={'h3'}>{t('step', {
                                    ns: 'seed36',
                                    step: i + 1,
                                })}</Typography>
                            </Grid>
                        </Hidden>
                        {
                            seed36Data.map((mob, choice) => (
                                <Grid item xs={3} sm={2} key={`${i}-${choice}`}>
                                    <CardActionArea sx={theme => ({
                                        borderRadius: theme.shape.borderRadius,
                                        marginBottom: theme.spacing(2),
                                        height: theme.spacing(9),
                                        backgroundColor: steps[i] === choice
                                            ? theme.palette.primary.light
                                            : theme.palette.background.default,
                                        transition: '0.3s',
                                    })}
                                                    onClick={() => props.onChangeStep(choice as Step, i)}>
                                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                            <StyledImage src={mob.icon}
                                                         alt={mob.name}
                                                         width={mob.width}
                                                         height={mob.height} />
                                        </Box>
                                    </CardActionArea>
                                </Grid>
                            ))
                        }
                        {
                            i === 0 && (
                                <Hidden smDown>
                                    <Grid item sm={2}>
                                        <Box display={'flex'} justifyContent={'right'}>
                                            <Button variant={'contained'} disableElevation onClick={props.resetSteps}
                                                    startIcon={<ReplayRounded />}>
                                                {t('reset')}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Hidden>
                            )
                        }
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

const Seed36 = () => {
    const { t } = useTranslation();
    const seoProps = useI18nSeoProps('seed36');
    const [steps, setSteps] = useState<Steps>(buildDefaultSteps());

    const resetSteps = () => setSteps(buildDefaultSteps());
    const onChangeStep = (step: Step, index: number) => {
        setSteps(steps => steps.map((s, i) => i === index ? step : s) as Steps);
    };

    return (
        <>
            <Seo {...seoProps} image={'/images/36.png'} />
            <I18nTitleCard ns={'seed36'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Content steps={steps} onChangeStep={onChangeStep} resetSteps={resetSteps} />
                </CardContent>
            </Card>
            <Comments pageKey={'seed36'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed36'])),
        },
    };
};

export default Seed36;