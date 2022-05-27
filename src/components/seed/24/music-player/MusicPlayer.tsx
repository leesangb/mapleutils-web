import { Grid } from '@mui/material';
import { MusicPlayerProvider } from '@components/seed/24/music-player/MusicPlayerContext';
import NowPlaying from '@components/seed/24/music-player/NowPlaying';
import MusicPlayerTrackList from '@components/seed/24/music-player/MusicPlayerTrackList';
import { TrackInfo } from '@components/seed/24/music-player/TrackInfo';

interface MusicPlayerProps {
    tracks: TrackInfo[];
}

const MusicPlayer = ({ tracks }: MusicPlayerProps) => {
    return (
        <MusicPlayerProvider tracks={tracks}>
            <Grid
                container direction={'row'} alignItems={'center'} spacing={3}>
                <Grid item xs={12} lg={5}>
                    <NowPlaying />
                </Grid>
                <Grid item xs={12} lg={7}>
                    <MusicPlayerTrackList />
                </Grid>
            </Grid>
        </MusicPlayerProvider>
    );
};

export default MusicPlayer;