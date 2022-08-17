import QuestionAnswerSimulatorContent from '@components/seed/39/QuestionAnswerSimulatorContent';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { QuestionAnswer } from '@data/seed/39';
import { useEffect, useMemo, useState } from 'react';
import { ChevronRightRounded } from '@mui/icons-material';
import { isKeyboardTargetInput } from '@tools/keyboardEventHelper';

interface QuestionAnswerSimulatorProps {
    data: QuestionAnswer[];
}

const QuestionAnswerSimulator = ({ data }: QuestionAnswerSimulatorProps) => {
    const questionAnswers = useMemo(() => data.sort(() => Math.random() - 0.5), []);
    const [num, setNum] = useState(0);
    const [hasPicked, setHasPicked] = useState<boolean>(false);
    const [focus, setFocus] = useState<number>(NaN);

    const handleNext = () => {
        setHasPicked(false);
        setNum(num => (num + 1) % questionAnswers.length);
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
                setFocus(f => isNaN(f) ? 0 : (f - 1 + 5) % 5);
            } else if (e.key === 'ArrowDown') {
                setFocus(f => isNaN(f) ? 0 : (f + 1) % 5);
            } else if (e.key === 'ArrowLeft') {
                setFocus(f => f === 4 ? 3 : 0);
            } else if (e.key === 'ArrowRight') {
                setFocus(4);
            }
        };
        window.addEventListener('keydown', useKeyboard);

        return () => {
            window.removeEventListener('keydown', useKeyboard);
        };
    }, [hasPicked]);

    return (
        <Card variant={'outlined'}>
            <CardContent sx={{ paddingBottom: 0 }}>
                <QuestionAnswerSimulatorContent onPick={handlePick} qa={questionAnswers[num]} key={num} />
            </CardContent>
            <CardActions sx={{ textAlign: 'right', justifyContent: 'right' }}>
                <Button id={'response-4'} onClick={handleNext} endIcon={<ChevronRightRounded />}>다음</Button>
            </CardActions>
        </Card>
    );
};

export default QuestionAnswerSimulator;