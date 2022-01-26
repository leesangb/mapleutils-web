import { useMusicPlayerContext } from '@components/music-player/MusicPlayerContext';
import { Avatar, Stack, Typography } from '@mui/material';
import { MusicNoteRounded } from '@mui/icons-material';
import { Box } from '@mui/system';

const PlayerTrackInformation = () => {
    const { track } = useMusicPlayerContext();
    return (
        <Stack direction={'row'} sx={theme => ({ marginBottom: theme.spacing(3) })} alignItems={'center'}
               spacing={3}>
            <Avatar variant={'rounded'}
                    sx={{ width: 200, height: 200, borderRadius: '22px' }}
                    src={track?.coverImg}>
                <MusicNoteRounded fontSize={'large'} />
            </Avatar>
            <Box>
                {
                    track
                        ? (
                            <>
                                <Typography variant={'h6'} gutterBottom component={'span'}>
                                    현재 플레이중:
                                </Typography>
                                <Typography variant={'h2'}>{track?.name}</Typography>
                            </>
                        ) : (
                            <Typography variant='h6'>
                                재생 할 곡을 선택 해 주세요!
                            </Typography>
                        )
                }
            </Box>
        </Stack>
    );
};

export default PlayerTrackInformation;