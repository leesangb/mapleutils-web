import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import PlayerTrackInformation from '@components/seed/24/music-player/PlayerTrackInformation';
import PlayerTimeSlider from '@components/seed/24/music-player/PlayerTimeSlider';
import PlayerButtons from '@components/seed/24/music-player/PlayerButtons';
import PlayerVolumeSlider from '@components/seed/24/music-player/PlayerVolumeSlider';
import { isMobile } from '@tools/helper';


const NowPlaying = () => {
    return (
        <Box sx={theme => ({ padding: theme.spacing(3) })}>
            <Stack justifyContent={'center'} alignContent={'center'}>
                <PlayerTrackInformation />
                <PlayerTimeSlider />
                <PlayerButtons />
                {!isMobile && <PlayerVolumeSlider />}
            </Stack>
        </Box>
    );
};

export default NowPlaying;