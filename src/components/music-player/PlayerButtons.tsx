import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { Box } from '@mui/system';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Switch, Tooltip } from '@mui/material';
import { FileCopyRounded, MoreVertRounded, PauseRounded, PlayArrowRounded, StopRounded } from '@mui/icons-material';
import { MouseEvent, useState } from 'react';
import { useStore } from '@stores/StoreContext';

const PlayerSettings = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { app } = useStore();
    const [autoClip, setAutoClip] = useState(app.preference.seed['24'].autoClip);

    const id = open ? 'player-more-settings' : undefined;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleAutoClip = () => {
        setAutoClip(!autoClip);
        app.changeSeed24AutoClip(!autoClip);
    };

    return (
        <>
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                <Tooltip title={'더보기'}>
                    <IconButton onClick={handleClick}>
                        <MoreVertRounded />
                    </IconButton>
                </Tooltip>
                <Popover
                    PaperProps={{ variant: 'outlined', elevation: 0 }}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FileCopyRounded />
                            </ListItemIcon>
                            <ListItemText>음악 선택 시 자동 복사</ListItemText>
                            <Switch
                                edge='end'
                                onChange={toggleAutoClip}
                                checked={autoClip}
                                inputProps={{
                                    'aria-labelledby': 'switch-auto-clip-on-play',
                                }}
                            />
                        </ListItem>
                    </List>
                </Popover>
            </Box>
        </>
    );
};


const PlayerButtons = () => {
    const { track, state, setState, onClip } = useMusicPlayerContext();

    const handlePlayPause = () => {
        setState(state === 'playing' ? 'paused' : 'playing');
    };

    const handleStop = () => {
        setState('stopped');
    };

    const handleClip = () => {
        onClip(track?.name);
    };

    return (
        <Box sx={{ textAlign: 'center', position: 'relative' }}>
            <Tooltip title={'정지'}>
                <IconButton disabled={!track} onClick={handleStop}>
                    <StopRounded sx={theme => ({
                        width: theme.spacing(3),
                        height: theme.spacing(3),
                    })} />
                </IconButton>
            </Tooltip>
            <IconButton sx={theme => ({ margin: theme.spacing(2) })} disabled={!track} onClick={handlePlayPause}>
                {
                    state === 'playing'
                        ? (
                            <Tooltip title={'일시정지'}>
                                <PauseRounded sx={theme => ({
                                    width: theme.spacing(7),
                                    height: theme.spacing(7),
                                })} />
                            </Tooltip>
                        ) : (
                            <Tooltip title={'재생'}>
                                <PlayArrowRounded sx={theme => ({
                                    width: theme.spacing(7),
                                    height: theme.spacing(7),
                                })} />
                            </Tooltip>
                        )
                }
            </IconButton>
            <Tooltip title={'복사하기'}>
                <IconButton disabled={!track} onClick={handleClip}>
                    <FileCopyRounded sx={theme => ({
                        width: theme.spacing(3),
                        height: theme.spacing(3),
                    })} />
                </IconButton>
            </Tooltip>
            <Box sx={{ position: 'absolute', top: '30%', right: 0 }}>
                <PlayerSettings />
            </Box>
        </Box>
    );
};

export default PlayerButtons;