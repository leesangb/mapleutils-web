import { useMusicPlayerContext } from '@components/seed/24/music-player/MusicPlayerContext';
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
    CheckRounded,
    FileCopyRounded,
    MoreVertRounded,
    PauseRounded,
    PlayArrowRounded,
    StopRounded,
    TipsAndUpdatesRounded,
} from '@mui/icons-material';
import { MouseEvent, useEffect, useState } from 'react';
import { isKeyboardTargetInput } from '@tools/keyboardEventHelper';
import { useTranslation } from 'next-i18next';

const PlayerSettings = () => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { preference: { autoClip, check, onChangeAutoClip, onChangeCheck } } = useMusicPlayerContext();
    const open = Boolean(anchorEl);

    const id = open ? 'player-more-settings' : undefined;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleAutoClip = () => {
        onChangeAutoClip(!autoClip);
    };

    const toggleCheck = () => {
        onChangeCheck(!check);
    };

    return (
        <>
            <Tooltip title={t('more')}>
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
                        <ListItemText>{t('autoClipOnPlay')}</ListItemText>
                        <Switch
                            edge='end'
                            onChange={toggleAutoClip}
                            checked={autoClip}
                            inputProps={{
                                'aria-labelledby': 'switch-auto-clip-on-play',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckRounded />
                        </ListItemIcon>
                        <ListItemText>{t('showCheck')}</ListItemText>
                        <Switch
                            edge='end'
                            onChange={toggleCheck}
                            checked={check}
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
    const { t } = useTranslation();
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
            if (e.key === ' ' && !isKeyboardTargetInput(e)) {
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
                        <Typography variant={'subtitle2'}>{t('spaceToPausePlay')}</Typography>
                        <Typography variant={'subtitle2'}>{t('upDownVolume')}</Typography>
                        <Typography variant={'subtitle2'}>{t('seek')}</Typography>
                    </>
                }>
                    <TipsAndUpdatesRounded sx={theme => ({ color: theme.palette.action.active })} />
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title={t('stop')}>
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
                                <Tooltip title={t('pause')}>
                                    <PauseRounded sx={theme => ({
                                        width: theme.spacing(7),
                                        height: theme.spacing(7),
                                    })} />
                                </Tooltip>
                            ) : (
                                <Tooltip title={t('play')}>
                                    <PlayArrowRounded sx={theme => ({
                                        width: theme.spacing(7),
                                        height: theme.spacing(7),
                                    })} />
                                </Tooltip>
                            )
                    }
                </IconButton>
                <Tooltip title={t('copy')}>
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