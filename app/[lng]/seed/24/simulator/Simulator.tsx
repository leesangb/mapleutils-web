'use client';
import { useAudio } from '@/hooks/useAudio';
import { useTranslation } from '@/i18n/client';
import { TrackInfo } from '@/data/seed/24';
import { useEffect, useState } from 'react';
import { Tooltip, Typography } from '@/ds/displays';
import { Button } from '@/ds/inputs';
import { RiPauseFill, RiPlayFill } from 'react-icons/ri';
import { PlayerButton } from '@/components/buttons';
import { Card } from '@/ds/surfaces';
import styled from 'styled-components';
import { VolumeSlider } from '@/components/volume/VolumeSlider';
import { media } from '@/ds';
import { SimulatorForm } from '@/components/simulator/SimulatorForm';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { getCho } from '@/utils/string';

interface SimulatorProps {
    data: TrackInfo[];
}

export const Simulator = ({ data }: SimulatorProps) => {
    const { setTrack, setVolume, playState, play, pause, stop, volume } = useAudio();
    const { t } = useTranslation({ ns: 'seed24simulator' });
    const { locale } = useLocalizedPathname();
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => Math.floor(Math.random() * data.length));
    const currentTrack = data[currentTrackIndex];
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handlePlay = () => {
        setTrack(currentTrack.src);
    };

    useEffect(() => {
        if (isPlaying) {
            play();
        } else {
            stop();
        }
    }, [isPlaying]);

    useEffect(() => {
        setTrack(currentTrack.src);
    }, [currentTrack]);

    return (
        <>
            {isPlaying ? <Container>
                <Typography as={'h2'}>
                    {data[currentTrackIndex].hint}
                </Typography>
                <PlayContainer>
                    <Tooltip title={t(playState === 'playing' ? 'pause' : 'play')} size={'small'} placement={'top'}>
                        <PlayerButton style={{
                            fontSize: '42px',
                            width: '60px',
                            height: '60px',
                        }} disabled={!currentTrack} onClick={() => playState === 'playing' ? pause() : handlePlay()}>
                            {playState === 'playing' ? <RiPauseFill /> : <RiPlayFill />}
                        </PlayerButton>
                    </Tooltip>
                    <VolumeSlider value={volume} onChange={setVolume} />
                </PlayContainer>

                <SimulatorForm label={t('bgmName')}
                    answer={currentTrack.name}
                    hint={locale === 'ko'
                        ? getCho(currentTrack.name)
                        : currentTrack.name
                            .split('')
                            .map((c, i) => (i % 3 === 0 || c === ' ') ? c : '_')
                            .join('')}
                    onAnswer={() => {
                    }}
                    onNext={() => {
                        setCurrentTrackIndex((currentTrackIndex + 1) % data.length);
                    }}
                    onReset={() => {
                        setIsPlaying(false);
                    }}
                />
            </Container> : <>
                <Button onClick={() => setIsPlaying(true)}>{t('start')}</Button>
            </>}
        </>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const PlayContainer = styled(Card)`
  box-sizing: border-box;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  justify-content: center;

  ${media.max('sm')} {
    max-width: 100%;
  }
`;

const Form = styled.form`
`;
