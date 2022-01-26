import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PlayerTrackInformation from '@components/music-player/PlayerTrackInformation';
import PlayerTimeSlider from '@components/music-player/PlayerTimeSlider';
import PlayerButtons from '@components/music-player/PlayerButtons';
import PlayerVolumeSlider from '@components/music-player/PlayerVolumeSlider';


const NowPlaying = () => {
    return (
        <Box sx={theme => ({ padding: theme.spacing(3) })}>
            <Grid container justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
                <Grid item xs={12}>
                    <PlayerTrackInformation />
                </Grid>
                <Grid item xs={12}>
                    <PlayerTimeSlider />
                </Grid>
                <Grid item xs={12}>
                    <PlayerButtons />
                </Grid>
                <Grid item xs={12}>
                    <PlayerVolumeSlider />
                </Grid>
            </Grid>
        </Box>
    );
};

export default NowPlaying;