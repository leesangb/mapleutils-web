import { Chip, Grid, Slider, Typography } from '@mui/material';
import { ReplayRounded } from '@mui/icons-material';

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
    const { x, y, ratio, onChangeX, onChangeY, onChangeRatio, onReset } = props;

    return (
        <>
            <Typography align={'center'}>위치 세부 조정</Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={1}>
                            <Typography>X 축</Typography>
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={x}
                                size={'small'}
                                min={0}
                                max={500}
                                valueLabelDisplay='auto'
                                onChange={(_, v) => onChangeX(v as number)}
                                aria-labelledby='x-axis-base'
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={1}>
                            <Typography>Y 축</Typography>
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={y}
                                size={'small'}
                                min={0}
                                max={500}
                                valueLabelDisplay='auto'
                                aria-labelledby='y-axis-base'
                                onChange={(_, v) => onChangeY(v as number)}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={1}>
                            <Typography>배율</Typography>
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={ratio}
                                size={'small'}
                                min={0}
                                max={200}
                                valueLabelDisplay='auto'
                                valueLabelFormat={(v) => v / 100}
                                onChange={(_, v) => onChangeRatio(v as number)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Chip icon={<ReplayRounded />} onClick={onReset} label={'설정 초기화'} />
                </Grid>
            </Grid>
        </>
    );
};

export default CaptureViewer;