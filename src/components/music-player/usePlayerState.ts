import { useReducer } from 'react';
import { TrackInfo } from '@components/music-player/TrackInfo';


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


export const usePlayerState = () => {
    const [playerState, dispatchPlayer] = useReducer(playerReducer, buildPlayerState());

    const setVolume = (volume: number) => {
        if (volume < 0 || volume > 100) {
            return;
        }
        dispatchPlayer({ key: 'volume', value: volume });
    };

    const setTime = (time: number) => {
        if (playerState.audio) {
            playerState.audio.currentTime = time;
        }
        dispatchPlayer({ key: 'time', value: time });
    };

    const setState = (state: 'playing' | 'paused' | 'stopped') => {
        dispatchPlayer({ key: 'state', value: state });
    };

    const setTrack = (track: TrackInfo) => dispatchPlayer({ key: 'track', value: track });

    const setDuration = (duration: number) => {
        dispatchPlayer({ key: 'duration', value: duration });
    };

    const setAudio = (audio: HTMLAudioElement) => {
        dispatchPlayer({ key: 'audio', value: audio });
    };

    return {
        playerState,
        setVolume,
        setTime,
        setState,
        setTrack,
        setDuration,
        setAudio,
    };
};