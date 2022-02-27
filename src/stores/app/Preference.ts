import { PaletteMode } from '@mui/material';

interface SeedPreference {
    24: {
        volume: number,
        autoClip: boolean,
        order: 'default' | 'nameAsc' | 'nameDesc',
    };
}

const defaultSeedPreference = (): SeedPreference => ({
    24: {
        volume: 50,
        autoClip: true,
        order: 'default',
    },
});

class Preference {
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

export { Preference };
