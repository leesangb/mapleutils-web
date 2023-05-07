import { isServerSide } from './helper';

// import { MusicPlayerPreference } from '../components/seed/24/music-player/MusicPlayerPreference';

export enum LocalStorageKey {
    PREFERENCE = 'PREFERENCE',
    MUSIC_PLAYER = 'MUSIC_PLAYER',
    SEED_24_TAB = 'SEED_24_TAB',
    SEED_49_LOCATIONS = 'SEED_49_LOCATIONS',
    VIDEO_CAPTURE_SETTINGS = 'VIDEO_CAPTURE_SETTINGS',
    BOOKMARKS = 'BOOKMARKS',
    SEED_49_BOOKMARKS = 'SEED_49_BOOKMARKS',
    SEED_49_SHOW_FILTER = 'SEED_49_SHOW_FILTER',
    SEED_36 = 'SEED_36',
    SEED_39 = 'SEED_39',
    SEED_42 = 'SEED_42',
    SEED_22 = 'SEED_22',
}

//
// const fixMusicPlayerPreference = (obj: any | undefined, defaultPreference: MusicPlayerPreference): MusicPlayerPreference => {
//     const preference = {
//         ...defaultPreference,
//     };
//     if (!obj)
//         return preference;
//     if (obj.volume !== undefined)
//         preference.volume = obj.volume as number;
//     if (obj.autoClip !== undefined)
//         preference.autoClip = obj.autoClip as boolean;
//     if (obj.order !== undefined)
//         preference.order = obj.order as 'default' | 'nameAsc' | 'nameDesc';
//     if (obj.check !== undefined)
//         preference.check = obj.check as boolean;
//
//     return preference;
// };
//
// const parseMusicPlayer = (): MusicPlayerPreference => {
//     const defaultPreference: MusicPlayerPreference = { volume: 50, autoClip: true, order: 'default', check: false };
//     if (isServerSide) {
//         return defaultPreference;
//     }
//
//     const musicPlayerPreference = localStorage.getItem(LocalStorageKey.MUSIC_PLAYER);
//     if (musicPlayerPreference) {
//         const obj = JSON.parse(musicPlayerPreference) as any;
//         const preference = fixMusicPlayerPreference(obj, defaultPreference);
//         LocalStorageHelper.save(LocalStorageKey.MUSIC_PLAYER, preference);
//         return preference;
//     }
//
//     const old = localStorage.getItem(LocalStorageKey.PREFERENCE);
//     if (old) {
//         const oldObj = JSON.parse(old) as any;
//         if (oldObj && oldObj.seed && oldObj.seed['24']) {
//             const preference = fixMusicPlayerPreference(oldObj.seed['24'], defaultPreference);
//             LocalStorageHelper.save(LocalStorageKey.MUSIC_PLAYER, preference);
//         }
//     }
//
//     return defaultPreference;
// };

const parseTab = (): string => {
    const defaultTab = 'bgm';
    if (isServerSide) {
        return defaultTab;
    }

    const tab = localStorage.getItem(LocalStorageKey.SEED_24_TAB);
    if (tab && ['bgm', 'hint'].includes(tab)) {
        return tab;
    }
    localStorage.setItem(LocalStorageKey.SEED_24_TAB, defaultTab);
    return defaultTab;
};

const parseLocations = (): string[] | null => {
    const defaultLocations: string[] | null = null;
    if (isServerSide) {
        return defaultLocations;
    }

    const locations = localStorage.getItem(LocalStorageKey.SEED_49_LOCATIONS);
    if (locations) {
        const jsonObj = JSON.parse(locations) as any;
        if (jsonObj instanceof Array && jsonObj.every(item => typeof item === 'string')) {
            return jsonObj as string[];
        }
    }

    return defaultLocations;
};

const parseSeed48Settings = (): Partial<{ x: number, y: number, ratio: number, showJump: boolean }> | null => {
    const defaultSettings = null;
    if (isServerSide) {
        return defaultSettings;
    }

    const settings = localStorage.getItem(LocalStorageKey.VIDEO_CAPTURE_SETTINGS);
    if (settings) {
        const settingObj = JSON.parse(settings) as any;
        const obj: Partial<{ x: number, y: number, ratio: number, showJump: boolean }> = {};
        if (settingObj.x && typeof settingObj.x === 'number') {
            obj.x = settingObj.x;
        }
        if (settingObj.y && typeof settingObj.y === 'number') {
            obj.y = settingObj.y;
        }
        if (settingObj.ratio && typeof settingObj.ratio === 'number') {
            obj.ratio = settingObj.ratio;
        }
        if (settingObj.showJump && typeof settingObj.showJump === 'boolean') {
            obj.showJump = settingObj.showJump;
        }
        return obj;
    }

    return defaultSettings;
};

const parseBookmarks = (key: LocalStorageKey) => (): Set<string> => {
    if (isServerSide) {
        return new Set<string>();
    }
    const bookmarks = localStorage.getItem(key);
    if (!bookmarks) {
        return new Set<string>();
    }
    const bookmarksObj = JSON.parse(bookmarks) as any;
    if (bookmarksObj instanceof Array) {
        return new Set<string>(bookmarksObj);
    }
    return new Set<string>();
};

const parseSeed49ShowFilter = (): boolean => {
    if (isServerSide) {
        return false;
    }
    const show = localStorage.getItem(LocalStorageKey.SEED_49_SHOW_FILTER);
    return show === 'true';
};

const parsers: Partial<Record<LocalStorageKey, () => any>> = {
    // [LocalStorageKey.PREFERENCE]: parsePreference,
    // [LocalStorageKey.MUSIC_PLAYER]: parseMusicPlayer,
    [LocalStorageKey.SEED_24_TAB]: parseTab,
    [LocalStorageKey.SEED_49_LOCATIONS]: parseLocations,
    [LocalStorageKey.VIDEO_CAPTURE_SETTINGS]: parseSeed48Settings,
    [LocalStorageKey.BOOKMARKS]: parseBookmarks(LocalStorageKey.BOOKMARKS),
    [LocalStorageKey.SEED_49_BOOKMARKS]: parseBookmarks(LocalStorageKey.SEED_49_BOOKMARKS),
    [LocalStorageKey.SEED_49_SHOW_FILTER]: parseSeed49ShowFilter,
};

/**
 * @deprecated prefer using zustand persist
 */
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
