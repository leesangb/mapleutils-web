import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import PlayerTrackInformation from './PlayerTrackInformation';
import PlayerTimeSlider from './PlayerTimeSlider';
import PlayerButtons from './PlayerButtons';
import PlayerVolumeSlider from './PlayerVolumeSlider';
import { isMobile } from '../../../../tools/helper';


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
