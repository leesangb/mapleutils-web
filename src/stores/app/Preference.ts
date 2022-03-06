import { PaletteMode } from '@mui/material';
import { makeAutoObservable } from 'mobx';

const defaultPreference: { theme: PaletteMode, version: string } = {
    theme: 'light',
    version: '0.3',
};

class Preference {
    theme: PaletteMode;
    version: string;

    constructor(theme: PaletteMode = defaultPreference.theme,
                version: string = defaultPreference.version) {
        makeAutoObservable(this);
        this.theme = theme;
        this.version = version;
    }

    fix(obj: any) {
        this.theme = obj?.theme || this.theme || defaultPreference.theme;
        this.version = obj?.version || this.version || defaultPreference.version;
    }
}

export { Preference };
