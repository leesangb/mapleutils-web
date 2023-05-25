import data from './data.json';

export interface SeedMobData {
    name: string;
    width: number;
    height: number;
    img: string;
    location: SeedLocation;
}

export const seed49GmsFilter: Set<string> = new Set(
    [
        '강화된 아이언 뮤테',
        '마스터 로보',
        '머신 MT-09',
        '레츠',
        '비급',
        '원로 그레이',
        '월묘',
        '짜증내는 좀비버섯',
        '포이즌 푸퍼',
    ],
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

export const seed49Mobs: SeedMobData[] = data.reduce((acc, cur) => {
    acc.push(...cur.mobs.map(mob =>
        ({
            ...mob,
            location: cur.location,
            img: encodeURI(`/images/seed/49/${mob.name}.png`),
        })));
    return acc;
}, [] as SeedMobData[]);

export const seedLocations = [
    '에레브',
    '에델슈타인',
    '오르비스',
    '아쿠아리움',
    '루디브리엄',
    '지구방위본부',
    '아랫마을',
    '무릉',
    '아리안트',
    '리엔',
    '마가티아',
    '헤네시스',
    '엘리니아',
    '페리온',
    '커닝시티',
] as const;
export type SeedLocation = typeof seedLocations[number]
    | string;

export const seed49Locations: SeedLocation[] = data.map(l => l.location);
