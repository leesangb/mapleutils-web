'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { isKeyboardTargetInput } from '@/utils/keyboardEventHelper';
import { useAudioStore } from '@/store/useAudioStore';
import { minmax } from '@/utils/number';

interface UseAudioOptions {
    loop?: boolean;
}

interface AudioInfo {
    src: string;
    time: number;
    duration: number;
}

const newAudio = ({ loop = true }: UseAudioOptions) => {
    if (typeof window === 'undefined') {
        return null;
    }
    const audio = document.createElement('audio');
    audio.loop = loop;
    audio.currentTime = 0;
    return audio;
};

export const useAudio = ({
    loop = true,
}: UseAudioOptions = {}) => {
    const { volume, setVolume } = useAudioStore();
    const { current: audio } = useRef<HTMLAudioElement>(newAudio({ loop }));
    const [track, setTrack] = useState<AudioInfo>(() => ({
        src: '',
        time: 0,
        duration: 0,
    }));
    const [playState, setPlayState] = useState<'playing' | 'paused' | 'stopped'>('stopped');

    const play = useCallback((callback?: () => void) => {
        if (!audio?.src)
            return;
        audio.play().then(() => {
            setPlayState('playing');
            callback?.();
        });
    }, []);

    const pause = useCallback(() => {
        if (!audio?.src) {
            return;
        }
        audio.pause();
        setPlayState('paused');
    }, []);

    const stop = useCallback(() => {
        if (!audio?.src) {
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
        audio.src = nextTrack;
        audio.currentTime = 0;
        play(() => {
            setTrack({
                src: nextTrack,
                time: 0,
                duration: Math.floor(audio.duration),
            });
        });
    }, []);

    const onChangeVolume = useCallback((volume: number) => {
        if (!audio) {
            return;
        }
        setVolume(minmax(0, 100, volume));
    }, [setVolume]);

    useEffect(() => {
        if (!audio) {
            return;
        }
        audio.volume = volume / 100;
    }, [volume]);

    const onChangeTime = useCallback((time: number) => {
        if (!audio?.src) {
            return;
        }
        audio.currentTime = minmax(0, audio.duration, time);
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

        const KeyEvents: Record<string, () => void> = {
            [' ']: () => audio?.paused ? play() : pause(),
            ['ArrowLeft']: () => onChangeTime((audio?.currentTime || 0) - 5),
            ['ArrowRight']: () => onChangeTime((audio?.currentTime || 0) + 5),
            ['ArrowUp']: () => onChangeVolume(Math.round((audio?.volume || 0) * 100) + 5),
            ['ArrowDown']: () => onChangeVolume(Math.round((audio?.volume || 0) * 100) - 5),
        };

        const keyHandler = (e: KeyboardEvent) => {
            if (isKeyboardTargetInput(e))
                return;

            const handler = KeyEvents[e.key];
            if (handler) {
                e.preventDefault();
                handler();
            }
        };
        window.addEventListener('keydown', keyHandler);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadeddata', onLoadedData);
            stop();
            audio.srcObject = null;
            window.removeEventListener('keydown', keyHandler);
        };
    }, [onChangeVolume]);

    return {
        audio: track,
        setTrack: onChangeTrack,
        setVolume: onChangeVolume,
        setTime: onChangeTime,
        playState,
        play,
        pause,
        stop,
        volume,
    };
};
