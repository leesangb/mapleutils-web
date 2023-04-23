import { TrackInfo } from './music-player';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { TOptions } from 'i18next';
import { Locales } from '../../../tools/locales';
import { getCho } from '../../../tools/string';
import {
    Avatar,
    Box,
    Button,
    Card,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import PlayerButtons from './music-player/PlayerButtons';
import { isMobile } from '../../../tools/helper';
import PlayerVolumeSlider from './music-player/PlayerVolumeSlider';
import { useMusicPlayerContext } from './music-player/MusicPlayerContext';
import { AssignmentTurnedInRounded, SendRounded, TipsAndUpdatesRounded } from '@mui/icons-material';
import { css, styled } from '@mui/system';

interface Seed24SimulatorContentProps {
    music: TrackInfo;
}

const seed24I18nOptions: TOptions = { ns: 'seed24' };

const MusicCard = styled(Card)<{ error: boolean, ok: boolean }>(({ error, ok, theme }) => css`
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(1)};
  width: 100%;

  ${theme.breakpoints.up('sm')} {
    width: 400px;
  }

  ${ok && css`
    border: solid 1px ${theme.palette.success.light};
  `}

  ${error && css`
    animation: shake 0.325s;
    border: solid 1px ${theme.palette.error.light};

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

const Seed24SimulatorContent = ({ music }: Seed24SimulatorContentProps) => {
    const [response, setResponse] = useState<string>('');
    const { t, i18n } = useTranslation(['common', 'seed24', 'seed24simulator']);
    const [error, setError] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(false);
    const { setTrack } = useMusicPlayerContext();
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setResponse(e.target.value);
        setError(false);
        setOk(false);
    };

    const handleSubmit = () => {
        if (response === t(music.name, seed24I18nOptions)) {
            setOk(true);
        } else {
            setError(true);
        }
    };

    const handleHint = () => {
        const hint = i18n.resolvedLanguage === Locales.Korean
            ? getCho(music.name)
            : t(music.name, seed24I18nOptions)
                .split('')
                .map((c, i) => (i % 3 === 0 || c === ' ') ? c : '_')
                .join('');
        setResponse(hint);
        const field = document.getElementById('bgm-field') as HTMLInputElement;
        if (field) {
            field.focus();
        }
    };

    const handleAnswer = () => {
        setResponse(t(music.name, seed24I18nOptions));
        setOk(true);
        const field = document.getElementById('bgm-field') as HTMLInputElement;
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

    useEffect(() => {
        setTrack(music);
    }, []);

    return (
        <>
            <Typography variant={'h4'}
                        component={'h3'}
                        align={'center'}
                        whiteSpace={smUp && i18n.resolvedLanguage === Locales.Korean ? 'pre' : undefined}
                        sx={{ margin: 2 }}
                        gutterBottom>
                {i18n.resolvedLanguage === Locales.Korean
                    ? music.hint.replaceAll(/(\.|!)/g, '$1\n')
                    : music.hint}
            </Typography>
            <Box display={'flex'} justifyContent={'center'}>
                <MusicCard variant={'outlined'} error={error} ok={ok}>
                    {ok && <Box marginTop={2} marginLeft={1} marginRight={1}>
                        <Box display={'flex'} alignItems={'center'}>
                            <Avatar variant={'rounded'} src={music.coverImg} alt={music.name} sx={{ marginRight: 2 }} />
                            <Typography variant={'h4'}>{t(music.name, seed24I18nOptions)}</Typography>
                        </Box>
                    </Box>}
                    <PlayerButtons isSimulator />
                    {!isMobile && <PlayerVolumeSlider />}
                </MusicCard>
            </Box>


            <Box marginLeft={'auto'} marginRight={'auto'} width={smUp ? '900px' : '100%'}>
                <Box display={'flex'} justifyContent={'right'} marginTop={1} marginBottom={2}>
                    <Button startIcon={<TipsAndUpdatesRounded />}
                            onClick={handleHint}>{t('hint', { ns: 'seed24simulator' })}</Button>
                    <Button startIcon={<AssignmentTurnedInRounded />}
                            onClick={handleAnswer}>{t('answer', { ns: 'seed24simulator' })}</Button>
                </Box>
                <TextField label={t('bgmName', { ns: 'seed24simulator' })}
                           variant={'outlined'}
                           sx={{ marginBottom: 1 }}
                           id={'bgm-field'}
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

            </Box>
        </>
    );
};

export default Seed24SimulatorContent;
