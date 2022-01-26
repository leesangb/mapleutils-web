import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { Grid, IconButton, Slider, Tooltip } from '@mui/material';
import { VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material';
import { useStore } from '@stores/StoreContext';


const PlayerVolumeSlider = () => {
    const { volume, setVolume } = useMusicPlayerContext();
    const { app } = useStore();

    const handleChangeVolume = (_: any, newValue: number | number[]) => {
        const value: number = newValue as number;
        setVolume(value);
        app.changeSeed24Volume(value);
    };

    return (
        <Grid container alignItems='center' spacing={1}>
            <Grid item xs={1}>
                <Tooltip title={'음소거'}>
                    <IconButton sx={theme => ({ marginTop: theme.spacing(-1) })} onClick={() => setVolume(0)}>
                        <VolumeDownRounded fontSize={'small'} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs>
                <Slider
                    min={0}
                    max={100}
                    valueLabelDisplay='auto'
                    value={volume}
                    onChange={handleChangeVolume}
                    sx={{
                        '& .MuiSlider-thumb': {
                            width: 24,
                            height: 24,
                            '&.Mui-active': {
                                width: 32,
                                height: 32,
                            },
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        },

                    }}
                    aria-labelledby='player-volume-slider'
                />
            </Grid>
            <Grid item xs={1}>
                <Tooltip title={'음량 최대'}>
                    <IconButton sx={theme => ({ marginTop: theme.spacing(-1) })} onClick={() => setVolume(100)}>
                        <VolumeUpRounded fontSize={'small'} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
};

export default PlayerVolumeSlider;