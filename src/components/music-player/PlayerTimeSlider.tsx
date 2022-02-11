import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { Slider, Typography } from '@mui/material';
import { toMinuteSecond } from '@tools/time';
import { Box } from '@mui/system';
import { useEffect } from 'react';

const PlayerTimeSlider = () => {
    const { time, setTime, duration } = useMusicPlayerContext();

    const changeTime = (value: number) => {
        setTime(value);
    };

    const handleChangeTime = (_: any, newValue: number | number[]) => {
        changeTime((newValue as number));
    };

    useEffect(() => {
        const timeUpDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                changeTime(time - 5);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                changeTime(time + 5);
            }
        };
        window.addEventListener('keydown', timeUpDown);
        return () => {
            window.removeEventListener('keydown', timeUpDown);
        };
    });

    return (
        <Box alignItems='center' justifyContent={'space-between'}>
            <Slider
                disabled={duration <= 0}
                value={time}
                size={'small'}
                onChange={handleChangeTime}
                getAriaValueText={toMinuteSecond}
                valueLabelFormat={toMinuteSecond}
                valueLabelDisplay='auto'
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
            <Box sx={theme => ({ marginTop: theme.spacing(-1) })} display={'flex'} justifyContent={'space-between'}>
                <Typography variant={'subtitle2'}>
                    {toMinuteSecond(time)}
                </Typography>
                <Typography variant={'subtitle2'}>
                    {toMinuteSecond(duration)}
                </Typography>
            </Box>
        </Box>
    );
};

export default PlayerTimeSlider;
