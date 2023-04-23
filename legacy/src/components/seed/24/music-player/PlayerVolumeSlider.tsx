import { useMusicPlayerContext } from './MusicPlayerContext';
import { Box, IconButton, Slider, Tooltip } from '@mui/material';
import { VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material';
import { useEffect } from 'react';
import { isKeyboardTargetInput } from '../../../../tools/keyboardEventHelper';
import { useTranslation } from 'next-i18next';


const PlayerVolumeSlider = () => {
    const { t } = useTranslation();
    const { preference: { volume, onChangeVolume } } = useMusicPlayerContext();

    const changeVolume = (value: number) => {
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        onChangeVolume(value);
    };

    const handleChangeVolume = (_: any, newValue: number | number[]) => {
        const value: number = newValue as number;
        changeVolume(value);
    };

    useEffect(() => {
        const volumeUpDown = (e: KeyboardEvent) => {
            const isInput = isKeyboardTargetInput(e);
            if (e.key === 'ArrowUp' && !isInput) {
                e.preventDefault();
                changeVolume(volume + 5);
            } else if (e.key === 'ArrowDown' && !isInput) {
                e.preventDefault();
                changeVolume(volume - 5);
            }
        };
        window.addEventListener('keydown', volumeUpDown);
        return () => {
            window.removeEventListener('keydown', volumeUpDown);
        };
    });

    return (
        <Box display={'flex'} alignItems={'center'}>
            <Tooltip title={t('minVolume')}>
                <IconButton
                    sx={theme => ({ marginRight: theme.spacing(2) })}
                    onClick={() => onChangeVolume(0)}>
                    <VolumeDownRounded fontSize={'small'} />
                </IconButton>
            </Tooltip>
            <Slider
                min={0}
                max={100}
                valueLabelDisplay='auto'
                value={volume}
                onChange={handleChangeVolume}
                sx={{
                    '& .MuiSlider-thumb': {
                        width: 24,
                        height: 24,
                        '&.Mui-active': {
                            width: 32,
                            height: 32,
                        },
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    },

                }}
                aria-labelledby='player-volume-slider'
            />
            <Tooltip title={t('maxVolume')}>
                <IconButton
                    sx={theme => ({ marginLeft: theme.spacing(2) })}
                    onClick={() => onChangeVolume(100)}>
                    <VolumeUpRounded fontSize={'small'} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default PlayerVolumeSlider;
