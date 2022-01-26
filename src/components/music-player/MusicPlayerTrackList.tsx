import { Grid } from '@mui/material';
import MusicItem from '@components/music-player/MusicItem';
import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';

const MusicPlayerTrackList = () => {
    const { tracks } = useMusicPlayerContext();
    return (
        <Grid container spacing={1}>
            {tracks.map((audio) => (
                <Grid item key={audio.name} xs={12} sm={6} md={4}>
                    <MusicItem
                        src={audio.src}
                        label={audio.name}
                        icon={audio.coverImg}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default MusicPlayerTrackList;