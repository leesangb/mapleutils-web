import { PaletteMode } from '@mui/material';
import { LocalStorageHelper, LocalStorageKey } from '@/tools/localStorageHelper';
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

    changeAnimation(animation: boolean) {
        this.preference.animation = animation;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, this.preference);
    }
}
