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
        img: encodeURI(`/images/seed/49/${m.name}.png`),
    })),
}));

export const seed49GmsFilter: Set<string> = new Set(
    [],
);

export const seed49KmsFilter: Set<string> = new Set(
    [
        '게비알',
        '로얄 카투스',
        '아이언보어',
        '이상한 돼지',
        '히죽대는 고스텀프',
    ],
);
