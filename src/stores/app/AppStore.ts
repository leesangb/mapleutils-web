import { PaletteMode } from '@mui/material';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';
import { makeAutoObservable } from 'mobx';
import { Preference } from './Preference';

export class AppStore {
    preference: Preference;

    constructor() {
        makeAutoObservable(this);
        this.preference = LocalStorageHelper.load(LocalStorageKey.PREFERENCE);
    }

    changeTheme(theme: PaletteMode) {
        this.preference.theme = theme;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, this.preference);
    }

    changeSeed24Volume(volume: number) {
        this.preference.seed['24'].volume = volume;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, this.preference);
    }

    changeSeed24AutoClip(autoClip: boolean) {
        this.preference.seed['24'].autoClip = autoClip;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, this.preference);
    }
}
