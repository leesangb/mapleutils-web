import { styled } from '@mui/material/styles';
import { Button as MuiButton, ButtonProps, darken, Typography } from '@mui/material';
import { css } from '@mui/system';
import { useMemo, useState } from 'react';
import { CheckRounded, ClearRounded } from '@mui/icons-material';
import { QuestionAnswer } from '@data/seed/39';
import { useTranslation } from 'react-i18next';

const Button = styled(MuiButton)<ButtonProps>(({ theme, color }) => css`
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  margin: ${theme.spacing(0.5)} 0;
  width: 100%;
  justify-content: left;
  color: ${(!color || color === 'inherit') && theme.palette.mode === 'light' ? 'black' : 'white'};
  background-color: ${!color || color === 'inherit' ? theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700] : theme.palette[color].light};

  ${color === 'error' && css`animation: shake 0.325s;`}
  :hover {
    color: ${(!color || color === 'inherit') && theme.palette.mode === 'light' ? 'black' : 'white'};
    background-color: ${!color || color === 'inherit' ? darken(theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700], 0.1) : darken(theme.palette[color].light, 0.1)}
  }

  span {
    margin-left: auto;
    margin-right: 0;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(0deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(0deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(0deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(0deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(0deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(0deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(0deg);
    }
  }
`);

interface QuestionAnswerSimulatorContentProps {
    qa: QuestionAnswer;
    onPick?: (choice: number) => void;
    onRight?: () => void;
}

const QuestionAnswerSimulatorContent = ({ qa, onPick, onRight }: QuestionAnswerSimulatorContentProps) => {
    const { i18n } = useTranslation();
    const [pick, setPick] = useState<number>(NaN);

    const hasPicked = !isNaN(pick);
    const handleChoice = (choice: number) => () => {
        // if (hasPicked)
        //     return;
        if (onPick) {
            onPick(choice);
        }
        setPick(choice);
        if (onRight && choice === qa.answer) {
            onRight();
        }
    };


    return useMemo(() => (
        <>
            <Typography variant={'h5'} gutterBottom>
                {qa.question}
            </Typography>
            {
                qa.choices.map((choice, index) => (
                        <Button
                            id={`response-${index}`}
                            onClick={handleChoice(index)}
                            disableElevation
                            variant={'text'}
                            color={hasPicked
                                ? index === pick
                                    ? qa.answer === index
                                        ? 'success'
                                        : 'error'
                                    : qa.answer === index
                                        ? 'primary'
                                        : 'inherit'
                                : 'inherit'
                            }
                            endIcon={hasPicked
                                ? index === pick
                                    ? qa.answer === index
                                        ? <CheckRounded />
                                        : <ClearRounded />
                                    : qa.answer === index
                                        ? <CheckRounded />
                                        : undefined
                                : undefined
                            }
                            key={`${index}-${choice}`}>{index + 1}. {choice}
                        </Button>
                    ),
                )
            }

        </>
    ), [qa, pick, i18n.resolvedLanguage]);
};

export default QuestionAnswerSimulatorContent;