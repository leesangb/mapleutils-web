import data from './data.json';

export interface SeedMobData {
    name: string;
    width: number;
    height: number;
}

export interface SeedLocation {
    location: string;
    mobs: SeedMobData[];
}

export const seed49Data: SeedLocation[] = data;