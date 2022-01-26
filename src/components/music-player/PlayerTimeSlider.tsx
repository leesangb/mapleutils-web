import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { Grid, Slider } from '@mui/material';
import { toMinuteSecond } from '@tools/time';

const PlayerTimeSlider = () => {
    const { time, setTime, duration } = useMusicPlayerContext();

    const handleChangeTime = (_: any, newValue: number | number[]) => {
        setTime((newValue as number));
    };

    return (
        <Grid container alignItems='center' spacing={2}>
            <Grid item>{toMinuteSecond(time)}</Grid>
            <Grid item xs>
                <Slider
                    value={time}
                    size={'small'}
                    onChange={handleChangeTime}
                    aria-labelledby={'player-time-slider'}
                    min={0}
                    max={duration}
                    sx={{
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
            </Grid>
            <Grid item>{toMinuteSecond(duration)}</Grid>
        </Grid>
    );
};

export default PlayerTimeSlider;
