import { useTranslation } from 'next-i18next';
import { Box, Button, CardActionArea, Grid, Hidden, Typography } from '@mui/material';
import { ReplayRounded } from '@mui/icons-material';
import { seed36Data } from '@data/seed/36';
import { useState } from 'react';
import { styled } from '@mui/system';
import NextImage from 'next/image';

type Step = 0 | 1 | 2 | 3 | undefined;
type Steps = [Step, Step, Step, Step, Step, Step, Step, Step]

const buildDefaultSteps = (): Steps => [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

const StyledImage = styled(NextImage)({
    pointerEvents: 'none',
});


const Seed36Steps = () => {
    const { t } = useTranslation();
    const [steps, setSteps] = useState<Steps>(buildDefaultSteps);

    const resetSteps = () => setSteps(buildDefaultSteps());
    const onChangeStep = (step: Step, index: number) => {
        setSteps(steps => steps.map((s, i) => i === index ? step : s) as Steps);
    };
    return (
        <>
            <Grid container>
                <Hidden smUp>
                    <Grid item xs={12}>
                        <Button sx={(theme) => ({ marginBottom: theme.spacing(1), float: 'right' })}
                                variant={'contained'} disableElevation
                                onClick={resetSteps}
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
                                    <Typography align={'center'} variant={'h3'}>
                                        {t('step', { ns: 'seed36', step: i + 1 })}
                                    </Typography>
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
                                                        onClick={() => onChangeStep(choice as Step, i)}>
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
                                                <Button variant={'contained'} disableElevation onClick={resetSteps}
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
        </>
    );
};

export default Seed36Steps;