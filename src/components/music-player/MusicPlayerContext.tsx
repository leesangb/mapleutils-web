import { PropsWithChildren, useEffect, useReducer } from 'react';
import { createGenericContext } from '@hooks/contextHelper';
import { useStore } from '@stores/StoreContext';
import { TrackInfo } from '@components/music-player';
import useCopy from '@hooks/useCopy';

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
}

const [useMusicPlayerContext, MusicPlayerContextProvider] = createGenericContext<MusicPlayerContext>();

interface PlayerState {
    track: TrackInfo | null;
    audio: HTMLAudioElement | null;
    state: 'playing' | 'paused' | 'stopped';
    volume: number;
    time: number;
    duration: number;
}

const buildPlayerState = (volume: number = 0): PlayerState => ({
    track: null,
    audio: null,
    state: 'stopped',
    volume,
    time: 0,
    duration: 0,
});

const playerReducer = (state: PlayerState, action: { key: keyof PlayerState, value: any }): PlayerState => {
    return {
        ...state,
        [action.key]: action.value,
    };
};

interface MusicPlayerProviderProps {
    tracks: TrackInfo[];
}


const MusicPlayerProvider = ({ tracks, children }: PropsWithChildren<MusicPlayerProviderProps>) => {
    const { app } = useStore();
    const [playerState, dispatchPlayer] = useReducer(playerReducer, buildPlayerState());
    const { copy, CopySnackbar } = useCopy();

    const setVolume = (volume: number) => dispatchPlayer({ key: 'volume', value: volume });
    const setTime = (time: number) => {
        if (playerState.audio) {
            playerState.audio.currentTime = time;
            dispatchPlayer({ key: 'time', value: time });
        }
    };

    const setState = (state: 'playing' | 'paused' | 'stopped') => {
        dispatchPlayer({ key: 'state', value: state });
    };

    const setTrack = (track: TrackInfo) => dispatchPlayer({ key: 'track', value: track });

    useEffect(() => {
        // need to refresh the value client side; localstorage is not accessible in server
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
        if (playerState.track) {
            if (playerState.audio) {
                playerState.audio.currentTime = 0;
                playerState.audio.pause();
            }

            const audio = new Audio(playerState.track.src);
            audio.volume = playerState.volume / 100;
            audio.loop = true;
            const onLoadedData = () => dispatchPlayer({ key: 'duration', value: audio.duration });
            const onTimeUpdate = () => dispatchPlayer({ key: 'time', value: audio.currentTime });
            const onPlay = () => dispatchPlayer({ key: 'state', value: 'playing' });
            const onPause = () => dispatchPlayer({ key: 'state', value: 'paused' });
            audio.addEventListener('loadeddata', onLoadedData);
            audio.addEventListener('timeupdate', onTimeUpdate);
            audio.addEventListener('play', onPlay);
            audio.addEventListener('pause', onPause);
            dispatchPlayer({ key: 'audio', value: audio });
            audio.play();

            return () => {
                audio.pause();
                audio.removeEventListener('loadeddata', onLoadedData);
                audio.removeEventListener('timeupdate', onTimeUpdate);
                audio.removeEventListener('play', onPlay);
                audio.removeEventListener('pause', onPause);
            };

        }
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
            tracks,
            setVolume,
            setTime,
            setState,
            setTrack,
            onClip,
        }}>
            <>
                {children}
            </>
            <CopySnackbar />
        </MusicPlayerContextProvider>
    );
};

export { useMusicPlayerContext, MusicPlayerProvider };