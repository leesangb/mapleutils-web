import { Grid, MenuItem, TextField } from '@mui/material';
import MusicItem from '@components/seed/24/music-player/MusicItem';
import { useMusicPlayerContext } from '@components/seed/24/music-player/MusicPlayerContext';
import { ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';

const MusicPlayerTrackList = () => {
    const { t } = useTranslation();
    const { tracks, preference: { order, onChangeOrder } } = useMusicPlayerContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === 'default' || value === 'nameAsc' || value === 'nameDesc') {
            onChangeOrder(value);
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField sx={{ float: 'right' }} select label={t('sort')} size={'small'} value={order}
                           onChange={handleChange}>
                    <MenuItem value={'default'}>{t('default')}</MenuItem>
                    <MenuItem value={'nameAsc'}>{t('nameAsc')}</MenuItem>
                    <MenuItem value={'nameDesc'}>{t('nameDesc')}</MenuItem>
                </TextField>
            </Grid>
            {tracks.map((audio) => (
                <Grid item key={audio.name} xs={12} md={6} xl={4}>
                    <MusicItem
                        src={audio.src}
                        label={audio.name}
                        icon={audio.coverImg}
                        hint={audio.hint}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default MusicPlayerTrackList;