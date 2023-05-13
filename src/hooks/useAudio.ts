'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAudioOptions {
    initialVolume?: number;
    loop?: boolean;
}

interface AudioInfo {
    src: string;
    volume: number;
    time: number;
    duration: number;
}

const newAudio = ({ initialVolume = 0.5, loop = true }: UseAudioOptions) => {
    if (typeof window === 'undefined') {
        return null;
    }
    const audio = document.createElement('audio');
    audio.loop = loop;
    audio.currentTime = 0;
    audio.volume = initialVolume;
    return audio;
};

export const useAudio = ({
    initialVolume = 0.5,
    loop = true,
}: UseAudioOptions = {}) => {
    const { current: audio } = useRef<HTMLAudioElement>(newAudio({ initialVolume, loop }));
    const [track, setTrack] = useState<AudioInfo>(() => ({
        src: '',
        volume: initialVolume,
        time: 0,
        duration: 0,
    }));
    const [playState, setPlayState] = useState<'playing' | 'paused' | 'stopped'>('stopped');

    const play = useCallback((callback?: () => void) => {
        if (!audio)
            return;
        audio.play().then(() => {
            setPlayState('playing');
            callback?.();
        });
    }, []);

    const pause = useCallback(() => {
        if (!audio) {
            return;
        }
        audio.pause();
        setPlayState('paused');
    }, []);

    const stop = useCallback(() => {
        if (!audio) {
            return;
        }
        audio.pause();
        audio.currentTime = 0;
        setPlayState('stopped');
    }, []);

    const onChangeTrack = useCallback((nextTrack: string) => {
        if (!audio) {
            return;
        }
        if (audio.src?.endsWith(nextTrack)) {
            return audio.paused
                ? play()
                : pause();
        }
        stop();
        audio.src = nextTrack;
        play(() => {
            setTrack({
                src: nextTrack,
                volume: audio.volume,
                time: 0,
                duration: Math.floor(audio.duration),
            });
        });
    }, []);

    const onChangeVolume = useCallback((volume: number) => {
        if (!audio) {
            return;
        }
        audio.volume = volume / 100;
        setTrack(track => ({ ...track, volume }));
    }, []);

    const onChangeTime = useCallback((time: number) => {
        if (!audio) {
            return;
        }
        audio.currentTime = time;
        setTrack(track => ({ ...track, time }));
    }, []);

    useEffect(() => {
        if (!audio) {
            return;
        }

        const onTimeUpdate = () => {
            setTrack(track => {
                return track?.time === Math.round(audio?.currentTime)
                    ? track
                    : ({ ...track, time: Math.round(audio?.currentTime) });
            });
        };
        audio.addEventListener('timeupdate', onTimeUpdate);

        const onLoadedData = () => {
            setTrack(track => ({ ...track, duration: Math.floor(audio?.duration) }));
        };
        audio.addEventListener('loadeddata', onLoadedData);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadeddata', onLoadedData);
            stop();
            audio.srcObject = null;
        };
    }, []);

    return {
        audio: track,
        setTrack: onChangeTrack,
        setVolume: onChangeVolume,
        setTime: onChangeTime,
        playState,
        play,
        pause,
        stop,
    };
};
