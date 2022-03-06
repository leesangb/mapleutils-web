import { Preference } from '@stores/app/Preference';
import { isServerSide } from './helper';
import { MusicPlayerPreference } from '@components/music-player/MusicPlayerPreference';


export enum LocalStorageKey {
    PREFERENCE = 'PREFERENCE',
    MUSIC_PLAYER = 'MUSIC_PLAYER'
}

const parsePreference = (): Preference => {
    if (isServerSide) {
        return new Preference();
    }

    const json = localStorage.getItem(LocalStorageKey.PREFERENCE);
    let preference: Preference = new Preference();
    if (json) {
        const value = JSON.parse(json) as any;
        preference.fix(value);
    }
    if (preference?.version !== '0.3') {
        preference = new Preference();
    }
    localStorage.removeItem(LocalStorageKey.PREFERENCE);
    LocalStorageHelper.save(LocalStorageKey.PREFERENCE, preference);
    return preference;
};

const fixMusicPlayerPreference = (obj: any | undefined, defaultPreference: MusicPlayerPreference): MusicPlayerPreference => {
    const preference = {
        ...defaultPreference,
    };
    if (!obj)
        return preference;
    if (obj.volume !== undefined)
        preference.volume = obj.volume as number;
    if (obj.autoClip !== undefined)
        preference.autoClip = obj.autoClip as boolean;
    if (obj.order !== undefined)
        preference.order = obj.order as 'default' | 'nameAsc' | 'nameDesc';
    if (obj.check !== undefined)
        preference.check = obj.check as boolean;

    return preference;
};

const parseMusicPlayer = (): MusicPlayerPreference => {
    const defaultPreference: MusicPlayerPreference = { volume: 50, autoClip: true, order: 'default', check: false };
    if (isServerSide) {
        return defaultPreference;
    }

    const musicPlayerPreference = localStorage.getItem(LocalStorageKey.MUSIC_PLAYER);
    if (musicPlayerPreference) {
        const obj = JSON.parse(musicPlayerPreference) as any;
        const preference = fixMusicPlayerPreference(obj, defaultPreference);
        LocalStorageHelper.save(LocalStorageKey.MUSIC_PLAYER, preference);
        return preference;
    }

    const old = localStorage.getItem(LocalStorageKey.PREFERENCE);
    if (old) {
        const oldObj = JSON.parse(old) as any;
        const preference = fixMusicPlayerPreference(oldObj.seed['24'], defaultPreference);
        LocalStorageHelper.save(LocalStorageKey.MUSIC_PLAYER, preference);
    }

    return defaultPreference;
};

const parsers: Partial<Record<LocalStorageKey, any>> = {
    [LocalStorageKey.PREFERENCE]: parsePreference,
    [LocalStorageKey.MUSIC_PLAYER]: parseMusicPlayer,
};

export class LocalStorageHelper {
    static save(key: LocalStorageKey, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static load<T extends unknown>(key: LocalStorageKey): T {
        const parser = parsers[key];
        if (parser) {
            return parser();
        }
        const json = localStorage.getItem(key) || '';
        const value = JSON.parse(json) as T;
        return value;
    }
}
