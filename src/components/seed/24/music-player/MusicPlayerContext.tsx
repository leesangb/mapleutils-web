import { PropsWithChildren, useEffect, useMemo } from 'react';
import { createGenericContext } from '@hooks/contextHelper';
import { TrackInfo } from '@components/seed/24/music-player/index';
import useCopy from '@hooks/useCopy';
import { usePlayerState } from '@components/seed/24/music-player/usePlayerState';
import {
    MusicPlayerPreference,
    MusicPlayerPreferenceAction,
    useMusicPlayerPreference,
} from '@components/seed/24/music-player/MusicPlayerPreference';
import { TFunction, useTranslation } from 'next-i18next';


interface MusicPlayerContext {
    tracks: TrackInfo[];
    track: TrackInfo | null;
    audio: HTMLAudioElement | null;
    state: 'playing' | 'paused' | 'stopped';
    time: number;
    setTime: (time: number) => void;
    setTrack: (track: TrackInfo | null) => void;
    setState: (state: 'playing' | 'paused' | 'stopped') => void;
    duration: number;
    onClip: (trackName?: string) => void;
    preference: MusicPlayerPreference & MusicPlayerPreferenceAction;
}

const [useMusicPlayerContext, MusicPlayerContextProvider] = createGenericContext<MusicPlayerContext>();

interface MusicPlayerProviderProps {
    tracks: TrackInfo[];
}

type OrderType = 'default' | 'nameAsc' | 'nameDesc';

const orderFunctions: Record<OrderType, (tracks: TrackInfo[], t: TFunction) => TrackInfo[]> = {
    ['default']: tracks => tracks,
    ['nameAsc']: (tracks, t) => tracks.sort((t1, t2) => t(t1.name, { ns: 'seed24' }).localeCompare(t(t2.name, { ns: 'seed24' }))),
    ['nameDesc']: (tracks, t) => tracks.sort((t1, t2) => t(t2.name, { ns: 'seed24' }).localeCompare(t(t1.name, { ns: 'seed24' }))),
};

const MusicPlayerProvider = ({ tracks, children }: PropsWithChildren<MusicPlayerProviderProps>) => {
    const { t } = useTranslation();
    const { playerState, setTime, setState, setTrack, setDuration, setAudio } = usePlayerState();
    const preference = useMusicPlayerPreference();
    const { copy, CopySnackbar } = useCopy();

    const orderedTrackList = useMemo(() => {
        return orderFunctions[preference.order]([...tracks], t);
    }, [preference.order, tracks]);

    useEffect(() => {
        if (playerState.audio) {
            if (playerState.state === 'playing') {
                playerState.audio.play();
            } else if (playerState.state === 'paused') {
                playerState.audio.pause();
            } else if (playerState.state === 'stopped') {
                playerState.audio.pause();
                playerState.audio.currentTime = 0;
            }
        }

    }, [playerState.state]);

    useEffect(() => {
        if (!playerState.track) {
            return;
        }

        if (playerState.audio) {
            playerState.audio.currentTime = 0;
            playerState.audio.pause();
        }

        const audio = new Audio(playerState.track.src);
        audio.volume = preference.volume / 100;
        audio.loop = true;
        const onLoadedData = () => setDuration(audio.duration);
        const onTimeUpdate = () => setTime(audio.currentTime);
        const onPlay = () => setState('playing');
        const onPause = () => setState('paused');
        audio.addEventListener('loadeddata', onLoadedData);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        setAudio(audio);
        audio.play();

        return () => {
            setAudio(null);
            audio.pause();
            audio.removeEventListener('loadeddata', onLoadedData);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
        };
    }, [playerState.track]);

    useEffect(() => {
        if (playerState.audio) {
            playerState.audio.volume = preference.volume / 100;
        }
    }, [preference.volume]);

    const onClip = (trackName?: string) => {
        if (!trackName) return;
        copy(trackName);
    };

    return (
        <MusicPlayerContextProvider value={{
            ...playerState,
            tracks: orderedTrackList,
            setTime,
            setState,
            setTrack,
            onClip,
            preference,
        }}>
            <>
                {children}
            </>
            <CopySnackbar />
        </MusicPlayerContextProvider>
    );
};

export { useMusicPlayerContext, MusicPlayerProvider };