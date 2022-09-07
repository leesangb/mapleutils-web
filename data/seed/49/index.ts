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
    [
        '강화된 아이언 뮤테',
        '마스터 로보',
        '머신 MT-09',
        '비급',
        '원로 그레이',
        '월묘',
        '장난감 목마',
        '짜증내는 좀비버섯',
        '포이즌 푸퍼',
    ],
);

export const seed49KmsFilter: Set<string> = new Set(
    [
        '게비알',
        '로얄 카투스',
        '스쿠버 페페',
        '아이언보어',
        '이상한 돼지',
    ],
);