import { Preference } from '@/stores/app/Preference';
import { isServerSide } from './helper';

export enum LocalStorageKey {
    PREFERENCE = 'PREFERENCE',
}

const parsePreference = (): Preference => {
    if (isServerSide) {
        return new Preference();
    }

    const json = localStorage.getItem(LocalStorageKey.PREFERENCE);
    const preference: Preference = new Preference();
    if (json) {
        const value = JSON.parse(json) as any;
        preference.theme = value.theme || preference.theme;
        preference.version = value.version || preference.version;
        preference.animation = !(value.animation === false);
    }
    localStorage.clear();
    LocalStorageHelper.save(LocalStorageKey.PREFERENCE, preference);
    return preference;
};

const parsers: Partial<Record<LocalStorageKey, any>> = {
    [LocalStorageKey.PREFERENCE]: parsePreference,
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
