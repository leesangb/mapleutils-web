import { TrackInfo } from './music-player';
import { useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from '@mui/material';
import { ChevronRightRounded, PlayArrowRounded, RestartAltRounded } from '@mui/icons-material';
import Seed24SimulatorContent from './Seed24SimulatorContent';
import { useTranslation } from 'next-i18next';
import { useMusicPlayerContext } from './music-player/MusicPlayerContext';

interface Seed24SimulatorProps {
}

const Seed24Simulator = ({}: Seed24SimulatorProps) => {
    const { t } = useTranslation(['common', 'seed24', 'seed24simulator']);
    const [musics, setMusics] = useState<TrackInfo[]>([]);
    const [num, setNum] = useState(0);
    const [openRestartModal, setOpenRestartModal] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { tracks: data, setTrack } = useMusicPlayerContext();

    const handleNext = () => {
        setNum(Math.floor(Math.random() * musics.length));
        setTrack(null);
    };

    const handlePlay = () => {
        setMusics(data.sort(() => Math.random() - 0.5));
        setNum(0);
        setIsPlaying(true);
    };


    const handleRestart = () => {
        handleCloseRestart();
        setIsPlaying(false);
    };

    const handleCloseRestart = () => setOpenRestartModal(false);

    return (
        <Card elevation={0} variant={'outlined'} sx={{ width: '100%' }}>
            <CardContent sx={{ paddingBottom: 0 }}>
                {
                    isPlaying ? (
                        <>
                            <Seed24SimulatorContent music={musics[num]} key={musics[num].name} />
                        </>
                    ) : (
                        <Grid container spacing={2} alignItems={'center'}>
                            <Grid item xs={12}>
                                <Button onClick={handlePlay}
                                        variant={'contained'}
                                        disableElevation
                                        startIcon={<PlayArrowRounded />}
                                        sx={{ width: '100%' }}>
                                    {t('start')}
                                </Button>
                            </Grid>
                        </Grid>
                    )
                }
            </CardContent>
            {
                isPlaying && (
                    <>
                        <CardActions sx={{ justifyContent: 'space-between' }}>
                            <Button onClick={() => setOpenRestartModal(true)}
                                    startIcon={<RestartAltRounded />}>{t('restart')}</Button>
                            <Button id={'response-4'} onClick={handleNext}
                                    endIcon={<ChevronRightRounded />}>{t('next')}</Button>
                        </CardActions>
                        <Dialog open={openRestartModal} onClose={handleCloseRestart}>
                            <DialogTitle>{t('title', { ns: 'seed24simulator' })}</DialogTitle>
                            <DialogContent>
                                {t('restartConfirm', { ns: 'seed24simulator' })}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseRestart}>{t('cancel')}</Button>
                                <Button variant={'contained'} disableElevation
                                        onClick={handleRestart}>{t('restart')}</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )
            }
        </Card>
    );
};

export default Seed24Simulator;
