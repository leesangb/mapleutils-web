import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { createGenericContext } from '@hooks/contextHelper';
import { useStore } from '@stores/StoreContext';
import { TrackInfo } from '@components/music-player';
import useCopy from '@hooks/useCopy';
import { usePlayerState } from '@components/music-player/usePlayerState';

interface MusicPlayerContext {
    tracks: TrackInfo[];
    track: TrackInfo | null;
    audio: HTMLAudioElement | null;
    state: 'playing' | 'paused' | 'stopped';
    volume: number;
    time: number;
    setTime: (time: number) => void;
    setVolume: (volume: number) => void;
    setTrack: (track: TrackInfo) => void;
    setState: (state: 'playing' | 'paused' | 'stopped') => void;
    duration: number;
    onClip: (trackName?: string) => void;
    trackOrder: OrderType;
    onChangeOrder: (order: OrderType) => void;
}

const [useMusicPlayerContext, MusicPlayerContextProvider] = createGenericContext<MusicPlayerContext>();

interface MusicPlayerProviderProps {
    tracks: TrackInfo[];
}

type OrderType = 'default' | 'nameAsc' | 'nameDesc';

const orderFunctions: Record<OrderType, (tracks: TrackInfo[]) => TrackInfo[]> = {
    ['default']: tracks => tracks,
    ['nameAsc']: tracks => tracks.sort((t1, t2) => t1.name.localeCompare(t2.name)),
    ['nameDesc']: tracks => tracks.sort((t1, t2) => t2.name.localeCompare((t1.name))),
};

const MusicPlayerProvider = ({ tracks, children }: PropsWithChildren<MusicPlayerProviderProps>) => {
    const { app } = useStore();
    const { playerState, setVolume, setTime, setState, setTrack, setDuration, setAudio } = usePlayerState();
    const { copy, CopySnackbar } = useCopy();

    const [order, setOrder] = useState<OrderType>('default');
    const trackList = useMemo(() => {
        return orderFunctions[order]([...tracks]);
    }, [order, tracks]);

    const onChangeOrder = (order: OrderType) => {
        app.changeSeed24Order(order);
        setOrder(order);
    };

    useEffect(() => {
        // need to refresh the value client side; localstorage is not accessible in server
        setOrder(app.preference.seed['24'].order);
        setVolume(app.preference.seed['24'].volume);
    }, []);

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
        audio.volume = playerState.volume / 100;
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
            audio.pause();
            audio.removeEventListener('loadeddata', onLoadedData);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
        };
    }, [playerState.track]);

    useEffect(() => {
        if (playerState.audio) {
            playerState.audio.volume = playerState.volume / 100;
        }
    }, [playerState.volume]);

    const onClip = (trackName?: string) => {
        if (!trackName) return;
        copy(trackName);
    };


    return (
        <MusicPlayerContextProvider value={{
            ...playerState,
            tracks: trackList,
            setVolume,
            setTime,
            setState,
            setTrack,
            onClip,
            trackOrder: order,
            onChangeOrder,
        }}>
            <>
                {children}
            </>
            <CopySnackbar />
        </MusicPlayerContextProvider>
    );
};

export { useMusicPlayerContext, MusicPlayerProvider };