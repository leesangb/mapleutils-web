import { Grid, MenuItem, TextField } from '@mui/material';
import MusicItem from '@components/music-player/MusicItem';
import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { ChangeEvent } from 'react';

type OrderType = 'default' | 'nameAsc' | 'nameDesc';


const MusicPlayerTrackList = () => {
    const { tracks, trackOrder, onChangeOrder } = useMusicPlayerContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === 'default' || value === 'nameAsc' || value === 'nameDesc') {
            onChangeOrder(value);
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField sx={{ float: 'right' }} select label={'정렬'} size={'small'} value={trackOrder}
                           onChange={handleChange}>
                    <MenuItem value={'default'}>기본</MenuItem>
                    <MenuItem value={'nameAsc'}>가나다</MenuItem>
                    <MenuItem value={'nameDesc'}>가나다 (역순)</MenuItem>
                </TextField>
            </Grid>
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