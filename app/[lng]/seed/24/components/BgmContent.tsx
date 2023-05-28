'use client';

import { TrackInfo } from '@/data/seed/24';
import styled from 'styled-components';
import { Tooltip, Typography } from '@/ds/displays';
import {
    RiFileCopyFill,
    RiPauseFill,
    RiPlayFill,
    RiQuestionLine,
    RiStopFill,
    RiVolumeDownFill,
    RiVolumeUpFill,
} from 'react-icons/ri';
import { minmax, toMinuteSecond } from '@/utils/number';
import { useAudio } from '@/hooks/useAudio';
import { useTranslation } from '@/i18n/client';
import { Button, Slider } from '@/ds/inputs';
import { media } from '@/ds';
import { useSeed24Store } from '@/store/useSeed24Store';

interface BgmContentProps {
    data: TrackInfo[];
}

export const BgmContent = ({ data }: BgmContentProps) => {
    const { autoClip, check } = useSeed24Store();
    const { audio, setTrack, setVolume, setTime, playState, play, pause, stop, volume } = useAudio();
    const { t } = useTranslation({ ns: 'seed24' });
    const currentTrack = data.find(track => audio?.src?.endsWith(track.src));
    return (
        <Container>
            <Player>
                <Title as={'h1'}>
                    {currentTrack
                        ? <>
                            <Image src={currentTrack.coverImg} alt={currentTrack.name} />
                            {currentTrack.name}
                        </> : <>
                            {t('selectBGMToPlay')}
                        </>}
                </Title>
                <Hint>
                    {currentTrack?.hint}
                </Hint>
                <Tooltip style={{ gridArea: 'help' }} tooltipStyle={{ whiteSpace: 'pre-line' }}
                    placement={'top'}
                    title={`${t('spaceToPausePlay')}
                    ${t('upDownVolume')}
                    ${t('seek')}
                `}>
                    <RiQuestionLine />
                </Tooltip>
                <ButtonsContainer>
                    <Tooltip title={t('stop')} size={'small'} placement={'top'}>
                        <PlayerButton disabled={!currentTrack} onClick={stop}><RiStopFill /></PlayerButton>
                    </Tooltip>
                    <Tooltip title={t(playState === 'playing' ? 'pause' : 'play')} size={'small'} placement={'top'}>
                        <PlayerButton style={{
                            fontSize: '42px',
                            width: '60px',
                            height: '60px',
                        }} disabled={!currentTrack} onClick={() => playState === 'playing' ? pause() : play()}>
                            {playState === 'playing' ? <RiPauseFill /> : <RiPlayFill />}
                        </PlayerButton>
                    </Tooltip>
                    <Tooltip title={t('copy')} size={'small'} placement={'top'}>
                        <PlayerButton disabled={!currentTrack}>
                            <RiFileCopyFill />
                        </PlayerButton>
                    </Tooltip>
                </ButtonsContainer>

                <Volume>
                    <Tooltip title={t('minVolume')} size={'small'} placement={'top'}>
                        <Button variant={'ghost'} onClick={() => setVolume(0)}>
                            <RiVolumeDownFill />
                        </Button>
                    </Tooltip>
                    <VolumeSlider value={volume}
                        onChange={e => setVolume(Number(e.target.value))} />
                    <Tooltip title={t('maxVolume')} size={'small'} placement={'top'}>
                        <Button variant={'ghost'} onClick={() => setVolume(100)}>
                            <RiVolumeUpFill />
                        </Button>
                    </Tooltip>
                </Volume>

                {audio && <Time>
                    <TimeSlider value={audio.time}
                        disabled={audio.duration === 0}
                        onChange={e => setTime(minmax(0, audio.duration, Number(e.target.value)))}
                        max={audio.duration} />
                    <span>
                        {toMinuteSecond(audio.time)}
                    </span>
                    <span style={{ textAlign: 'right' }}>
                        {toMinuteSecond(audio.duration)}
                    </span>
                </Time>}
            </Player>
            <TrackList>
                {data.map((track) => (
                    <Tooltip key={track.name} title={track.hint} as={'li'} placement={'top'} size={'medium'}>
                        <TrackButton onClick={() => {
                            setTrack(track.src);
                        }}>
                            <Image src={track.coverImg} alt={track.name} />
                            <span>
                                {track.name}
                            </span>
                            {track.name === currentTrack?.name && playState === 'playing'
                                ? <RiPauseFill />
                                : <RiPlayFill />}
                        </TrackButton>
                    </Tooltip>
                ))}
            </TrackList>
        </Container>
    );
};

const Image = styled.img`
  image-rendering: pixelated;
  border-radius: 0;
`;

const Title = styled(Typography)`
  grid-area: title;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 32px;
  gap: 8px;
  min-height: 48px;
  margin: 16px 0;
`;

const Hint = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  height: 14px;
  line-height: 1;
  grid-area: hint;
  text-overflow: ellipsis;
`;

const Volume = styled.div`
  width: 100%;
  grid-area: volume;
  gap: 8px;
  display: flex;
  justify-items: center;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

const Time = styled.div`
  display: grid;
  grid-area: time;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "time-slider time-slider"
    "current total";
`;

const VolumeSlider = styled(Slider).attrs({ min: 0, max: 100 })`
  width: 100%;
`;

const TimeSlider = styled(Slider).attrs({ min: 0 })`
  grid-area: time-slider;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  grid-area: buttons;
  align-items: center;
  justify-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, 1fr);
`;

const PlayerButton = styled.button`
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  width: 48px;
  height: 48px;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    transform: scale(0.9);
    background-color: ${({ theme }) => theme.surface.active};
  }

  &:disabled {
    background-color: transparent;
    cursor: not-allowed;
    transform: scale(0.7);
    color: ${({ theme }) => theme.text.disabled};
  }
`;

const Container = styled.div`
  display: grid;
  gap: 16px;
  align-items: center;
  justify-items: center;
  grid-template-areas:
            "player"
            "track-list";
`;

const Player = styled.section`
  grid-area: player;
  max-width: 700px;
  display: grid;
  gap: 8px;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 3fr 1fr 1fr;
  grid-template-areas:
        "title title title title title"
        "hint hint hint hint hint"
        "help help buttons volume volume"
        "time time time time time";

  @media (max-width: 800px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-areas:
        "title"
        "hint"
        "buttons"
        "time";
  }
`;

const TrackList = styled.ol`
  grid-area: track-list;
  display: grid;
  width: 100%;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 8px;
  grid-template-columns: 1fr 1fr 1fr 1fr;


  ${media.max('lg')} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${media.max('md')} {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const TrackButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px 8px 8px;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.surface.active};
    transform: scale(0.98);
  }

  & > span {
    flex-grow: 1;
  }
`;
