import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import PlayerTrackInformation from '@components/music-player/PlayerTrackInformation';
import PlayerTimeSlider from '@components/music-player/PlayerTimeSlider';
import PlayerButtons from '@components/music-player/PlayerButtons';
import PlayerVolumeSlider from '@components/music-player/PlayerVolumeSlider';


const NowPlaying = () => {
    return (
        <Box sx={theme => ({ padding: theme.spacing(3) })}>
            <Stack justifyContent={'center'} alignContent={'center'}>
                <PlayerTrackInformation />
                <PlayerTimeSlider />
                <PlayerButtons />
                <PlayerVolumeSlider />
            </Stack>
        </Box>
    );
};

export default NowPlaying;