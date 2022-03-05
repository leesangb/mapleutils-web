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
            changeSeed24Volume: action,
            changeSeed24AutoClip: action,
            changeSeed24Order: action,
        });
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

    changeSeed24Order(order: 'default' | 'nameAsc' | 'nameDesc') {
        this.preference.seed['24'].order = order;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, this.preference);
    }

    changeSeed24Check(check: boolean) {
        this.preference.seed['24'].check = check;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, this.preference);
    }
}
