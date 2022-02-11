import { Avatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { useStore } from '@stores/StoreContext';
import { useMemo, useRef } from 'react';

interface MusicItemProps {
    src: string;
    label: string;
    icon: string;
}


const MusicItem = (props: MusicItemProps) => {
    const { label, src, icon } = props;
    const { app } = useStore();
    const { setTrack, onClip } = useMusicPlayerContext();
    const buttonRef = useRef<HTMLDivElement>(null);

    const togglePlay = () => {
        if (buttonRef.current) {
            buttonRef.current.blur();
        }
        setTrack({ name: label, src, coverImg: icon });
        if (app.preference.seed['24'].autoClip) {
            onClip(label);
        }
    };

    return useMemo(() => (
        <ListItemButton ref={buttonRef} onClick={togglePlay}>
            <ListItemIcon>
                <Avatar sx={{ pointerEvents: 'none' }} src={icon} variant='rounded' />
            </ListItemIcon>
            <ListItemText>
                <Typography variant='h6' component='div'>
                    {label}
                </Typography>
            </ListItemText>
        </ListItemButton>
    ), []);
};

export default MusicItem;
