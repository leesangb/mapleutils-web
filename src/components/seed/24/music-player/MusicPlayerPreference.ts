import { useEffect, useReducer } from 'react';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';

export interface MusicPlayerPreference {
    volume: number;
    autoClip?: boolean;
    order: 'default' | 'nameAsc' | 'nameDesc';
    check?: boolean;
}

export interface MusicPlayerPreferenceAction {
    onChangeVolume: (volume: number) => void;
    onChangeAutoClip: (autoClip: boolean) => void;
    onChangeOrder: (order: 'default' | 'nameAsc' | 'nameDesc') => void;
    onChangeCheck: (check: boolean) => void;
}

const preferenceReducer = (state: MusicPlayerPreference, action: { key: keyof MusicPlayerPreference, value: any }): MusicPlayerPreference => {
    const newState = {
        ...state,
        [action.key]: action.value,
    };
    LocalStorageHelper.save(LocalStorageKey.MUSIC_PLAYER, newState);
    return newState;
};

export const useMusicPlayerPreference = (): MusicPlayerPreference & MusicPlayerPreferenceAction => {
    const [preference, dispatch] = useReducer(preferenceReducer, { volume: 50, order: 'default' });

    useEffect(() => {
        // need to refresh state because localStorage is not available server side
        // this makes first rendered page falsy
        const preference = LocalStorageHelper.load<MusicPlayerPreference>(LocalStorageKey.MUSIC_PLAYER);
        onChangeVolume(preference.volume);
        onChangeOrder(preference.order);
        onChangeAutoClip(!!preference.autoClip);
        onChangeCheck(!!preference.check);
    }, []);

    const onChangeVolume = (volume: number) => dispatch({ key: 'volume', value: volume });

    const onChangeAutoClip = (autoClip: boolean) => dispatch({ key: 'autoClip', value: autoClip });

    const onChangeOrder = (order: 'default' | 'nameAsc' | 'nameDesc') =>
        dispatch({ key: 'order', value: order });

    const onChangeCheck = (check: boolean) => dispatch({ key: 'check', value: check });

    return {
        ...preference,
        onChangeCheck,
        onChangeVolume,
        onChangeOrder,
        onChangeAutoClip,
    };
};