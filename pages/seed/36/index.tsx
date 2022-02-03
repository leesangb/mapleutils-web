import { Seo, SeoProps } from '@components/seo';
import { Box, Button, Card, CardActionArea, CardContent, Grid, Hidden, Typography } from '@mui/material';
import { TitleCard } from '@components/card';
import { useState } from 'react';
import { seed36Data } from '@data/seed/36';
import { ReplayRounded } from '@mui/icons-material';

const seoProps: SeoProps = {
    title: '더 시드 36층',
    keywords: ['36층', '메모', '기록'],
    description: '더 시드 36층 메모지',
    image: '/images/36.png',
};

type Step = 0 | 1 | 2 | 3 | undefined;
type Steps = [Step, Step, Step, Step, Step, Step, Step, Step]

const buildDefaultSteps = (): Steps => [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

interface ContentProps {
    steps: Steps;
    resetSteps: () => void;
    onChangeStep: (step: Step, index: number) => void;
}

const Content = (props: ContentProps) => {
    const { steps } = props;
    return (
        <Grid container>
            {steps.map((s, i) => (
                <Grid item xs={12} key={`step-${i}`}>
                    <Grid container spacing={2} alignItems='center'>
                        <Hidden smDown>
                            <Grid item sm={2}>
                                <Typography align={'center'} variant={'h3'}>{i + 1} 단계</Typography>
                            </Grid>
                        </Hidden>
                        {
                            seed36Data.map((mob, choice) => (
                                <Grid item xs={3} sm={2} key={`${i}-${choice}`}>
                                    <CardActionArea sx={theme => ({
                                        borderRadius: theme.shape.borderRadius,
                                        marginBottom: theme.spacing(2),
                                        height: theme.spacing(9),
                                        bgcolor: steps[i] === choice
                                            ? theme.palette.primary.light
                                            : theme.palette.background.default,
                                        transition: '0.3s',
                                    })}
                                                    onClick={() => props.onChangeStep(choice as Step, i)}>
                                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                            <img src={mob.icon} alt={mob.name} />
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
                                                초기화
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
    const [steps, setSteps] = useState<Steps>(buildDefaultSteps());

    const resetSteps = () => setSteps(buildDefaultSteps());
    const onChangeStep = (step: Step, index: number) => {
        setSteps(steps => steps.map((s, i) => i === index ? step : s) as Steps);
    };

    return (
        <>
            <Seo {...seoProps} />
            <TitleCard title={'시드 36층'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Content steps={steps} onChangeStep={onChangeStep} resetSteps={resetSteps} />
                </CardContent>
            </Card>
        </>
    );
};

export default Seed36;