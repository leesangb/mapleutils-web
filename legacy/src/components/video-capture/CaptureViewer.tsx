import { Chip, Grid, Slider, TextField, Typography } from '@mui/material';
import { ReplayRounded } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

interface CaptureViewerProps {
    x: number;
    y: number;
    ratio: number;
    onChangeX: (x: number) => void;
    onChangeY: (y: number) => void;
    onChangeRatio: (ratio: number) => void;
    onReset: () => void;
}

const CaptureViewer = (props: CaptureViewerProps) => {
    const { t } = useTranslation('seed48');
    const { x, y, ratio, onChangeX, onChangeY, onChangeRatio, onReset } = props;

    const handleBlur = (n: number, onChange: (n: number) => void, max: number) => () => {
        if (n < 0) {
            onChange(0);
        } else if (n > max) {
            onChange(max);
        }
    };
    return (
        <>
            <Typography align={'center'}>{t('advanced.title')}</Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={1}>
                            <Typography>{t('advanced.x')}</Typography>
                        </Grid>
                        <Grid item xs>
                            <Slider value={x}
                                    size={'small'}
                                    min={0}
                                    max={500}
                                    valueLabelDisplay={'auto'}
                                    onChange={(_, v) => onChangeX(v as number)}
                                    aria-labelledby='x-axis-base'
                            />
                        </Grid>
                        <Grid item>
                            <TextField variant={'outlined'}
                                       value={x}
                                       size={'small'}
                                       onChange={(e) => onChangeX(Number(e.target.value))}
                                       onBlur={handleBlur(x, onChangeX, 500)}
                                       inputProps={{
                                           step: 1,
                                           min: 0,
                                           max: 500,
                                           type: 'number',
                                           'aria-labelledby': 'x-axis-base-input',
                                       }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={1}>
                            <Typography>{t('advanced.y')}</Typography>
                        </Grid>
                        <Grid item xs>
                            <Slider value={y}
                                    size={'small'}
                                    min={0}
                                    max={500}
                                    valueLabelDisplay={'auto'}
                                    aria-labelledby={'y-axis-base'}
                                    onChange={(_, v) => onChangeY(v as number)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField variant={'outlined'}
                                       value={y}
                                       size={'small'}
                                       onChange={(e) => onChangeY(Number(e.target.value))}
                                       onBlur={handleBlur(y, onChangeY, 500)}
                                       inputProps={{
                                           step: 1,
                                           min: 0,
                                           max: 500,
                                           type: 'number',
                                           'aria-labelledby': 'y-axis-base-input',
                                       }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={1}>
                            <Typography>{t('ratio')}</Typography>
                        </Grid>
                        <Grid item xs>
                            <Slider value={ratio}
                                    size={'small'}
                                    min={0}
                                    max={200}
                                    valueLabelDisplay={'auto'}
                                    valueLabelFormat={(v) => v / 100}
                                    aria-labelledby={'ratio-base'}
                                    onChange={(_, v) => onChangeRatio(v as number)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField variant={'outlined'}
                                       value={ratio}
                                       size={'small'}
                                       onChange={(e) => onChangeRatio(Number(e.target.value))}
                                       onBlur={handleBlur(ratio, onChangeRatio, 200)}
                                       inputProps={{
                                           step: 1,
                                           min: 0,
                                           max: 200,
                                           type: 'number',
                                           'aria-labelledby': 'ratio-base-input',
                                       }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Chip icon={<ReplayRounded />} onClick={onReset} label={t('advanced.reset')} />
                </Grid>
            </Grid>
        </>
    );
};

export default CaptureViewer;