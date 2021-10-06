import { PaletteMode } from '@mui/material';

export class Preference {
    theme: PaletteMode;
    version: string;
    animation: boolean;

    constructor(theme: PaletteMode = 'light', version: string = '0.1', animation: boolean = true) {
        this.theme = theme;
        this.version = version;
        this.animation = animation;
    }
}
