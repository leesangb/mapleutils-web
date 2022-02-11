import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import {
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
    Switch,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    FileCopyRounded,
    MoreVertRounded,
    PauseRounded,
    PlayArrowRounded,
    StopRounded,
    TipsAndUpdatesRounded,
} from '@mui/icons-material';
import { MouseEvent, useEffect, useState } from 'react';
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
        </>
    );
};


const PlayerButtons = () => {
    const { track, state, setState, onClip } = useMusicPlayerContext();

    const handlePlayPause = () => {
        if (track) {
            setState(state === 'playing' ? 'paused' : 'playing');
        }
    };

    const handleStop = () => {
        setState('stopped');
    };

    const handleClip = () => {
        onClip(track?.name);
    };

    useEffect(() => {
        const togglePlay = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault();
                handlePlayPause();
            }
        };
        window.addEventListener('keydown', togglePlay);
        return () => {
            window.removeEventListener('keydown', togglePlay);
        };
    });

    return (
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
            <Grid item>
                <Tooltip title={
                    <>
                        <Typography variant={'subtitle2'}>스페이스바로 재생/일시정지</Typography>
                        <Typography variant={'subtitle2'}>↑/↓로 볼륨 조절</Typography>
                        <Typography variant={'subtitle2'}>←/→로 위치 조절</Typography>
                    </>
                }>
                    <TipsAndUpdatesRounded sx={theme => ({ color: theme.palette.action.active })} />
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title={'정지'}>
                    <IconButton disabled={!track} onClick={handleStop}>
                        <StopRounded sx={theme => ({
                            width: theme.spacing(3),
                            height: theme.spacing(3),
                        })} />
                    </IconButton>
                </Tooltip>
                <IconButton sx={theme => ({ margin: theme.spacing(2) })}
                            disabled={!track}
                            onClick={handlePlayPause}>
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
            </Grid>
            <Grid item>
                <PlayerSettings />
            </Grid>
        </Grid>
    );
};

export default PlayerButtons;