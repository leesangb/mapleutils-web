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
                version: string = '0.2',
                seed: SeedPreference = defaultSeedPreference()) {
        this.theme = theme;
        this.version = version;
        this.seed = seed;
    }

    fix(obj: any) {
        this.theme = obj?.theme || this.theme;
        this.version = obj?.version || this.version;
        this.seed = {
            ['24']: {
                volume: obj?.seed['24']?.volume || this.seed['24'].volume,
                autoClip: obj?.seed['24']?.autoClip || this.seed['24'].autoClip,
                order: obj?.seed['24']?.order || this.seed['24'].order,
            },
        };
    }
}

export { Preference };
