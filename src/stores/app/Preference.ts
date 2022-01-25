import { PaletteMode } from '@mui/material';

interface SeedPreference {
    24: {
        volume: number
    };
}

const defaultSeedPreference = () => ({
    24: {
        volume: 50,
    },
});

export class Preference {
    theme: PaletteMode;
    version: string;
    seed: SeedPreference;

    constructor(theme: PaletteMode = 'light',
                version: string = '0.1',
                seed: SeedPreference = defaultSeedPreference()) {
        this.theme = theme;
        this.version = version;
        this.seed = seed;
    }
}
