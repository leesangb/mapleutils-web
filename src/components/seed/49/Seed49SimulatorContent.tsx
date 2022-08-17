import { SeedMobData } from '@data/seed/49';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, IconButton, InputAdornment, TextField, Theme, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { TOptions } from 'i18next';
import { css, styled } from '@mui/system';
import NextImage from 'next/image';
import { AssignmentTurnedInRounded, SendRounded, TipsAndUpdatesRounded } from '@mui/icons-material';
import { getCho } from '@tools/string';
import { Locales } from '@tools/locales';

interface Seed49SimulatorContentProps {
    mob: SeedMobData;
}

const seed49I18nOptions: TOptions = { ns: 'seed49' };


interface StyledImgProps {
    // maybe fix with transient props with styled component
    silhouette: number;
    filter: string;
}

const StyledCard = styled(Card)<{ error: boolean, ok: boolean }>(({ theme, error, ok }) => css`
  background-color: ${ok
          ? theme.palette.primary.light
          : error
                  ? theme.palette.error.light
                  : theme.palette.background.default};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(2)};
  transition: all 200ms ease-in-out;

  ${error && css`
    animation: shake 0.325s;

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
    }`}

`);

const StyledImg = styled(NextImage)((props: StyledImgProps) => css`
  filter: ${props.silhouette ? props.filter : 'none'};
  transition: all 200ms ease-in-out;
  pointer-events: none;

`);

const getFilterCss = (theme: Theme): string => {
    return theme.palette.mode === 'light'
        ? 'brightness(0%)'
        : 'brightness(0%) drop-shadow(0 0 1px white)';
};

const Seed49SimulatorContent = ({ mob }: Seed49SimulatorContentProps) => {
    const [response, setResponse] = useState<string>('');
    const { t, i18n } = useTranslation(['common', 'seed49', 'seed49simulator']);
    const theme = useTheme();
    const filterCss = useMemo(() => getFilterCss(theme), [theme]);
    const [error, setError] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setResponse(e.target.value);
        setError(false);
        setOk(false);
    };

    const handleSubmit = () => {
        if (response === t(mob.name, seed49I18nOptions)) {
            setOk(true);
        } else {
            setError(true);
        }
    };

    const handleHint = () => {
        const hint = i18n.resolvedLanguage === Locales.Korean
            ? getCho(mob.name)
            : t(mob.name, seed49I18nOptions)
                .split('')
                .map((c, i) => (i % 2 === 0 || c === ' ') ? c : '_')
                .join('');
        setResponse(hint);
        const field = document.getElementById('mob-field') as HTMLInputElement;
        if (field) {
            field.focus();
        }
    };

    const handleAnswer = () => {
        setResponse(t(mob.name, seed49I18nOptions));
        const field = document.getElementById('mob-field') as HTMLInputElement;
        if (field) {
            field.focus();
        }
    };

    useEffect(() => {
        const submit = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        };
        document.addEventListener('keydown', submit);
        return () => {
            document.removeEventListener('keydown', submit);
        };
    }, [response]);

    return (
        <>
            <Typography variant={'h5'} component={'h3'} gutterBottom>
                {t('question', { ns: 'seed49simulator' })}
            </Typography>
            <StyledCard variant={'outlined'} error={error} ok={ok}>
                <StyledImg width={mob.width}
                           height={mob.height}
                           src={mob.img}
                           silhouette={ok ? 0 : 1}
                           filter={filterCss}
                           alt={t(mob.name, seed49I18nOptions)} />
            </StyledCard>
            <Box display={'flex'} justifyContent={'right'} marginTop={1} marginBottom={2}>
                <Button startIcon={<TipsAndUpdatesRounded />}
                        onClick={handleHint}>{t('hint', { ns: 'seed49simulator' })}</Button>
                <Button startIcon={<AssignmentTurnedInRounded />}
                        onClick={handleAnswer}>{t('answer', { ns: 'seed49simulator' })}</Button>
            </Box>
            <TextField label={t('mobName', { ns: 'seed49simulator' })}
                       variant={'outlined'}
                       id={'mob-field'}
                       value={response}
                       onChange={handleChange}
                       error={!ok && error}
                       autoFocus
                       InputProps={{
                           endAdornment: (
                               <InputAdornment position='end'>
                                   <IconButton disabled={!response.length} size='small' aria-label='submit'
                                               onClick={handleSubmit}>
                                       <SendRounded />
                                   </IconButton>
                               </InputAdornment>
                           ),
                       }}
                       fullWidth
                       size={'small'} />
        </>
    );
};

export default Seed49SimulatorContent;