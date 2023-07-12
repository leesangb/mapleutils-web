'use client';

import { TrackInfo } from '@/data/seed/24';
import styled from 'styled-components';
import { Tooltip, Typography } from '@/ds/displays';
import {
    RiCheckboxBlankLine,
    RiCheckboxFill,
    RiFileCopyFill,
    RiMore2Fill,
    RiPauseFill,
    RiPlayFill,
    RiQuestionLine,
    RiStopFill,
} from 'react-icons/ri';
import { minmax, toMinuteSecond } from '@/utils/number';
import { useAudio } from '@/hooks/useAudio';
import { useTranslation } from '@/i18n/client';
import { Button, RadioGroup, Slider } from '@/ds/inputs';
import { theme } from '@/ds';
import { TrackOrder, useSeed24Store } from '@/store/useSeed24Store';
import { copy } from '@/utils/clipboard';
import { toast } from 'react-toastify';
import { Popover } from '@/ds/surfaces/popover/Popover';
import { TrackButton } from './TrackButton';
import { TFunction } from 'i18next';
import { PlayerButton } from '@/components/buttons';
import { VolumeSlider } from '@/components/volume/VolumeSlider';

interface BgmContentProps {
    data: TrackInfo[];
}

const orderFunctions: Record<TrackOrder, (tracks: TrackInfo[], t: TFunction) => TrackInfo[]> = {
    default: tracks => [...tracks],
    nameAsc: (tracks, t) => [...tracks].sort((t1, t2) => t(t1.name).localeCompare(t(t2.name))),
    nameDesc: (tracks, t) => [...tracks].sort((t1, t2) => t(t2.name).localeCompare(t(t1.name))),
    nameLengthAsc: (tracks, t) => [...tracks].sort((t1, t2) => t(t1.name).length - t(t2.name).length),
    nameLengthDesc: (tracks, t) => [...tracks].sort((t1, t2) => t(t2.name).length - t(t1.name).length),
};

export const BgmContent = ({ data }: BgmContentProps) => {
    const { autoClip, check, setAutoClip, setCheck, order, setOrder } = useSeed24Store();
    const { audio, setTrack, setVolume, setTime, playState, play, pause, stop, volume } = useAudio();
    const { t } = useTranslation({ ns: 'seed24' });
    const currentTrack = data.find(track => audio?.src?.endsWith(track.src));

    const orderedTracks = orderFunctions[order](data, t);

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
                <Popover style={{ gridArea: 'more' }}>
                    <Popover.Trigger>
                        {({ open }) =>
                            <Tooltip title={t('more')} placement={'top'} size={'small'}>
                                <Button variant={'ghost'} onClick={() => open()}>
                                    <RiMore2Fill />
                                </Button>
                            </Tooltip>
                        }
                    </Popover.Trigger>
                    <Popover.Content style={{ display: 'flex', flexDirection: 'column', width: 'max-content' }}>
                        <Typography style={{ padding: '4px' }}>{t('settings')}</Typography>
                        <Button variant={'ghost'} onClick={() => setCheck(!check)}>
                            {check ? <RiCheckboxFill color={theme.primary.default} /> : <RiCheckboxBlankLine />}
                            {t('showCheck')}
                        </Button>
                        <Button variant={'ghost'} onClick={() => setAutoClip(!autoClip)}>
                            {autoClip ? <RiCheckboxFill color={theme.primary.default} /> : <RiCheckboxBlankLine />}
                            {t('autoClipOnPlay')}
                        </Button>
                        <hr style={{ margin: '4px 0' }} />
                        <Typography style={{ padding: '4px' }}>{t('sort')}</Typography>
                        <RadioGroup name={'order'}
                            getRender={(v) => <Typography as={'span'} fontSize={14}>{t(v)}</Typography>}
                            value={order}
                            onChange={setOrder}
                            options={['default', 'nameAsc', 'nameDesc', 'nameLengthAsc', 'nameLengthDesc']} />
                    </Popover.Content>
                </Popover>
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
                        <PlayerButton disabled={!currentTrack} onClick={() => {
                            if (!currentTrack)
                                return;
                            copy(currentTrack.name).then(() => {
                                toast.success(t('copyMessage', { text: currentTrack.name }));
                            });
                        }}>
                            <RiFileCopyFill />
                        </PlayerButton>
                    </Tooltip>
                </ButtonsContainer>

                <VolumeSlider value={volume} onChange={v => setVolume(v)} />

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
                {orderedTracks.map((track) => (
                    <TrackButton key={track.name}
                        track={track}
                        checkbox={check}
                        onClick={track => {
                            setTrack(track.src);
                            if (autoClip && track.src !== audio.src) {
                                copy(track.name).then(() => {
                                    toast.success(t('copyMessage', { text: track.name }));
                                });
                            }
                        }}
                        isPlaying={track.name === currentTrack?.name && playState === 'playing'} />
                ))}
            </TrackList>
        </Container>
    );
};

const Image = styled.img`
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

const Time = styled.div`
  display: grid;
  grid-area: time;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "time-slider time-slider"
    "current total";
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
        "help more buttons volume volume"
        "time time time time time";

  @media (max-width: 800px) {
    width: 100%;
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
        "title title title"
        "hint hint hint"
        "help buttons more"
        "time time time";
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
