import QuestionAnswerSimulatorContent from '@components/seed/39/QuestionAnswerSimulatorContent';
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
    Typography,
} from '@mui/material';
import { QuestionAnswer } from '@data/seed/39';
import { useEffect, useState } from 'react';
import { ChevronRightRounded, PlayArrowRounded, RestartAltRounded } from '@mui/icons-material';
import { isKeyboardTargetInput } from '@tools/keyboardEventHelper';
import { useTranslation } from 'next-i18next';

interface QuestionAnswerSimulatorProps {
    data: QuestionAnswer[];
}

const QuestionAnswerSimulator = ({ data }: QuestionAnswerSimulatorProps) => {
    const { t } = useTranslation();
    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
    const [num, setNum] = useState(0);
    const [hasPicked, setHasPicked] = useState<boolean>(false);
    const [focus, setFocus] = useState<number>(NaN);
    // const [includeDuplicates, setIncludeDuplicates] = useState<boolean>(false);
    const [openRestartModal, setOpenRestartModal] = useState<boolean>(false);
    const [correct, setCorrect] = useState<number>(0);
    const [length, setLength] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleNext = () => {
        setHasPicked(false);
        setLength(l => l + 1);
        setNum(Math.floor(Math.random() * questionAnswers.length));
    };

    const handlePick = () => {
        setHasPicked(true);
        for (let i = 0; i < 4; i++) {
            document.getElementById(`response-${i}`)?.blur();
        }
    };


    useEffect(() => {
        if (isNaN(focus))
            return;
        document.getElementById(`response-${focus}`)?.focus();
    }, [focus]);

    useEffect(() => {
        const useKeyboard = (e: KeyboardEvent) => {
            if (isKeyboardTargetInput(e))
                return;
            if (e.key === 'ArrowUp') {
                setFocus(f => isNaN(f) ? 0 : Math.max(0, f - 1));
            } else if (e.key === 'ArrowDown') {
                setFocus(f => isNaN(f) ? 0 : Math.min(5, f + 1));
            } else if (e.key === 'ArrowRight') {
                setFocus(4);
            }
        };
        window.addEventListener('keydown', useKeyboard);

        return () => {
            window.removeEventListener('keydown', useKeyboard);
        };
    }, [hasPicked]);

    const handleRestart = () => {
        handleCloseRestart();
        setIsPlaying(false);
    };

    const handlePlay = () => {
        setQuestionAnswers(data.sort(() => Math.random() - 0.5));
        setCorrect(0);
        setLength(0);
        setNum(0);
        setIsPlaying(true);
    };

    // const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    //     setIncludeDuplicates(e.target.checked);
    // };

    const handleCloseRestart = () => setOpenRestartModal(false);

    const handleOnRight = () => {
        if (!hasPicked) {
            setCorrect(correct => correct + 1);
        }
    };


    return (
        <Card variant={'outlined'} sx={{ width: '100%' }}>
            <CardContent sx={{ paddingBottom: 0 }}>
                {
                    isPlaying ? (
                        <>
                            {/*<div>*/}
                            {/*<LinearProgress sx={{ marginTop: 1 }} variant='determinate'*/}
                            {/*                value={Math.floor(num / questionAnswers.length * 100)} />*/}
                            {/*<Box display={'flex'} justifyContent={'space-between'} marginBottom={1}>*/}

                            {/*<Typography variant={'caption'} component={'p'}>*/}
                            {/*    (진행: {num + 1} / {questionAnswers.length})*/}
                            {/*</Typography>*/}
                            {/*</Box>*/}
                            {/*</div>*/}
                            <QuestionAnswerSimulatorContent onPick={handlePick} onRight={handleOnRight}
                                                            qa={questionAnswers[num]} key={num} />
                            <div>
                                <Typography variant={'caption'} component={'p'}
                                            align={'right'}
                                            gutterBottom>
                                    ({t('correctAnswerRate')}: {(correct / (hasPicked ? length + 1 : length) * 100 || 0).toFixed(2)}%)
                                </Typography>
                            </div>
                        </>
                    ) : (
                        <Grid container spacing={2} alignItems={'center'}>
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField type={'number'}*/}
                            {/*               label={'문제 수 (0 = 무한)'}*/}
                            {/*               value={length}*/}
                            {/*               onChange={(e) => setLength(parseInt(e.target.value))}*/}
                            {/*               fullWidth*/}
                            {/*               size={'small'}*/}
                            {/*               inputProps={{*/}
                            {/*                   step: 1,*/}
                            {/*                   min: 0,*/}
                            {/*                   type: 'number',*/}
                            {/*                   'aria-labelledby': 'x-axis-base-input',*/}
                            {/*               }} />*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={<Checkbox onChange={handleCheck} checked={includeDuplicates} />}*/}
                            {/*        label='중복문제 허용' />*/}
                            {/*</Grid>*/}

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
                            <DialogTitle>{t('title', { ns: 'seed39simulator' })}</DialogTitle>
                            <DialogContent>
                                {t('restartConfirm', { ns: 'seed39simulator' })}
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

export default QuestionAnswerSimulator;