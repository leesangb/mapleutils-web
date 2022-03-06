import { PaletteMode } from '@mui/material';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';
import { action, makeObservable, observable } from 'mobx';
import { Preference } from './Preference';

export class AppStore {
    preference: Preference;

    constructor() {
        this.preference = LocalStorageHelper.load(LocalStorageKey.PREFERENCE);
        makeObservable(this, {
            preference: observable.deep,
            changeTheme: action,
        });
    }

    changeTheme(theme: PaletteMode) {
        this.preference.theme = theme;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, this.preference);
    }
}
