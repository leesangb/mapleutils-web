import data from './data.json';

export interface SeedMobData {
    name: string;
    width: number;
    height: number;
    img: string;
}

export interface SeedLocation {
    location: string;
    mobs: SeedMobData[];
}

export const seed49Data: SeedLocation[] = data.map(l => ({
    ...l,
    mobs: l.mobs.map(m => ({
        ...m,
        img: encodeURI(`/images/seed/49/${m.name}.png`)
    })),
}));