import { PaletteMode } from '@mui/material';

interface SeedPreference {
    24: {
        volume: number,
        autoClip?: boolean,
        order: 'default' | 'nameAsc' | 'nameDesc',
        check?: boolean,
    };
}

const defaultSeedPreference = (): SeedPreference => ({
    24: {
        volume: 50,
        autoClip: true,
        order: 'default',
        check: false,
    },
});

const defaultPreference: { theme: PaletteMode, version: string, seed: SeedPreference } = {
    theme: 'light',
    version: '0.3',
    seed: defaultSeedPreference(),
};

class Preference {
    theme: PaletteMode;
    version: string;
    seed: SeedPreference;

    constructor(theme: PaletteMode = defaultPreference.theme,
                version: string = defaultPreference.version,
                seed: SeedPreference = defaultPreference.seed) {
        this.theme = theme;
        this.version = version;
        this.seed = seed;
    }

    fix(obj: any) {
        this.theme = obj?.theme || this.theme || defaultPreference.theme;
        this.version = obj?.version || this.version || defaultPreference.version;
        this.seed = {
            ['24']: {
                volume: obj?.seed['24']?.volume || this.seed['24'].volume,
                autoClip: obj?.seed['24']?.autoClip !== undefined ? obj.seed['24'].autoClip : this.seed['24'].autoClip,
                order: obj?.seed['24']?.order || this.seed['24'].order,
                check: obj?.seed['24']?.check || this.seed['24'].check,
            },
        };
    }
}

export { Preference };
