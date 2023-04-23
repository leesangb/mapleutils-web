import { useMusicPlayerContext } from './MusicPlayerContext';
import { Avatar, Stack, Typography } from '@mui/material';
import { MusicNoteRounded } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useTranslation } from 'next-i18next';

const PlayerTrackInformation = () => {
    const { t } = useTranslation();
    const { track, state } = useMusicPlayerContext();

    const isPlaying = state === 'playing';
    return (
        <Stack direction={'row'}
               sx={theme => ({ marginBottom: theme.spacing(3) })} alignItems={'center'}
               spacing={3}>
            <Box width={200} height={200} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Avatar variant={'rounded'}
                        sx={{
                            width: isPlaying ? 200 : 150,
                            height: isPlaying ? 200 : 150,
                            borderRadius: '22px',
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            filter: isPlaying ? undefined : 'grayscale(100%)',
                            pointerEvents: 'none',
                        }}
                        src={track?.coverImg}>
                    <MusicNoteRounded fontSize={'large'} />
                </Avatar>
            </Box>
            <Box>
                {
                    track
                        ? (
                            <>
                                <Typography variant={'h6'} gutterBottom component={'span'}>
                                    {t('nowPlaying', { ns: 'seed24' })}:
                                </Typography>
                                <Typography variant={'h2'}>{track?.name}</Typography>
                            </>
                        ) : (
                            <Typography variant='h6'>
                                {t('selectBGMToPlay', { ns: 'seed24' })}
                            </Typography>
                        )
                }
            </Box>
        </Stack>
    );
};

export default PlayerTrackInformation;
