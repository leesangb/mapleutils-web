import { useTranslation } from 'next-i18next';
import { Box, Button, CardActionArea, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { seed36Data } from '@data/seed/36';
import { useState } from 'react';
import { styled } from '@mui/system';
import NextImage from 'next/image';
import { AlignHorizontalLeftRounded, AlignVerticalTopRounded, ReplayRounded } from '@mui/icons-material';
import { useSeed36Store } from '../../../store/useSeed36Store';

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

    const { setAlignment, alignment } = useSeed36Store();
    const isVertical = alignment === 'vertical';

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        if (!newAlignment) {
            return;
        }
        setAlignment(newAlignment as 'vertical' | 'horizontal');
    };

    return (
        <section>
            <Box display={'flex'} alignItems={'center'} marginBottom={1}>
                <ToggleButtonGroup size={'small'}
                                   value={alignment}
                                   exclusive
                                   onChange={handleAlignment}>
                    <ToggleButton value='vertical'>
                        <AlignVerticalTopRounded /> {t('vertical', { ns: 'seed36' })}
                    </ToggleButton>
                    <ToggleButton value='horizontal'>
                        <AlignHorizontalLeftRounded /> {t('horizontal', { ns: 'seed36' })}
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button sx={(theme) => ({ marginLeft: 'auto', marginBottom: theme.spacing(1) })}
                        variant={'contained'} disableElevation
                        onClick={resetSteps}
                        startIcon={<ReplayRounded />}>
                    {t('reset')}
                </Button>
            </Box>
            <Box display={'flex'} flexDirection={isVertical ? 'column' : 'row'}>
                {steps.map((step, i) =>
                    <Box key={`step${i}`}
                         display={'flex'}
                         alignItems={isVertical ? 'center' : undefined}
                         width={'100%'}
                         margin={isVertical ? undefined : '4px'}
                         flexDirection={isVertical ? 'row' : 'column'}>
                        <Typography variant={'h3'} align={'center'} margin={'4px'} minWidth={'fit-content'}>
                            {t('step', { ns: 'seed36', step: i + 1 })}
                        </Typography>
                        <Box display={'flex'} flexBasis={'auto'} flexGrow={1}
                             flexDirection={isVertical ? 'row' : 'column'}>
                            {
                                seed36Data.map((mob, choice) =>
                                    <CardActionArea key={mob.name + i}
                                                    sx={theme => ({
                                                        borderRadius: theme.shape.borderRadius,
                                                        ...(isVertical ? {
                                                            marginLeft: theme.spacing(1),
                                                        } : {
                                                            marginLeft: theme.spacing(0.5),
                                                            marginRight: theme.spacing(0.5),
                                                        }),
                                                        marginBottom: theme.spacing(1),
                                                        height: theme.spacing(9),
                                                        backgroundColor: steps[i] === choice
                                                            ? theme.palette.primary.light
                                                            : theme.palette.background.default,
                                                        transition: '0.3s',
                                                    })}
                                                    onClick={() => onChangeStep(choice as Step, i)}>
                                        <Box display={'flex'} justifyContent={'center'}
                                             alignItems={'center'}>
                                            <StyledImage src={mob.icon}
                                                         alt={mob.name}
                                                         width={mob.width}
                                                         height={mob.height} />
                                        </Box>
                                    </CardActionArea>)
                            }
                        </Box>
                    </Box>)}
            </Box>
        </section>
    );
};

export default Seed36Steps;
