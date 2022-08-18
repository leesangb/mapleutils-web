import { useReducer } from 'react';
import { TrackInfo } from '@components/seed/24/music-player/TrackInfo';


interface PlayerState {
    track: TrackInfo | null;
    audio: HTMLAudioElement | null;
    state: 'playing' | 'paused' | 'stopped';
    time: number;
    duration: number;
}

const buildPlayerState = (volume: number = 0): PlayerState => ({
    track: null,
    audio: null,
    state: 'stopped',
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

    const setTime = (time: number) => {
        if (playerState.audio) {
            playerState.audio.currentTime = time;
        }
        dispatchPlayer({ key: 'time', value: time });
    };

    const setState = (state: 'playing' | 'paused' | 'stopped') => {
        dispatchPlayer({ key: 'state', value: state });
    };

    const setTrack = (track: TrackInfo | null) => dispatchPlayer({ key: 'track', value: track });

    const setDuration = (duration: number) => {
        dispatchPlayer({ key: 'duration', value: duration });
    };

    const setAudio = (audio: HTMLAudioElement | null) => {
        dispatchPlayer({ key: 'audio', value: audio });
    };

    return {
        playerState,
        setTime,
        setState,
        setTrack,
        setDuration,
        setAudio,
    };
};