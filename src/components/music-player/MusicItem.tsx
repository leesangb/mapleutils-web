import { Avatar, Badge, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { useStore } from '@stores/StoreContext';
import { useMemo, useRef, useState } from 'react';
import { CheckRounded, PauseRounded, PlayArrowRounded } from '@mui/icons-material';

interface MusicItemProps {
    src: string;
    label: string;
    icon: string;
}


const MusicItem = (props: MusicItemProps) => {
    const { label, src, icon } = props;
    const { app } = useStore();
    const { setTrack, onClip, track, state, setState } = useMusicPlayerContext();
    const buttonRef = useRef<HTMLDivElement>(null);
    const isSelected = useMemo(() => track?.name === label, [track, label]);
    const isPlaying = useMemo(() => state === 'playing', [state]);
    const check = app.preference.seed['24'].check;

    const [isPlayed, setIsPlayed] = useState<boolean>(false);

    const togglePlay = () => {
        setIsPlayed(true);
        if (buttonRef.current) {
            buttonRef.current.blur();
        }
        if (isSelected) {
            setState(isPlaying ? 'paused' : 'playing');
        } else {
            setTrack({ name: label, src, coverImg: icon });
            if (app.preference.seed['24'].autoClip) {
                onClip(label);
            }
        }
    };

    return useMemo(() => (
        <ListItemButton ref={buttonRef} onClick={togglePlay}>
            <ListItemIcon>
                <Badge anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                       badgeContent={(
                           <Avatar sx={theme => ({
                               width: theme.spacing(2.5),
                               height: theme.spacing(2.5),
                               backgroundColor: theme.palette.success.light,
                           })}>
                               <CheckRounded fontSize={'small'} />
                           </Avatar>
                       )}
                       invisible={!check || !isPlayed}>
                    <Avatar sx={{ pointerEvents: 'none' }}
                            src={icon}
                            variant='rounded' />
                </Badge>
            </ListItemIcon>
            <ListItemText>
                <Typography variant='h6' component='div'>
                    {label}
                </Typography>
            </ListItemText>
            {isSelected && isPlaying ? <PauseRounded color={'action'} /> : <PlayArrowRounded color={'action'} />}
        </ListItemButton>
    ), [isPlaying, isSelected, check, isPlayed]);
};

export default MusicItem;
