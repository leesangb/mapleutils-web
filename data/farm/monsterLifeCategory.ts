export type MonsterLifeCategory =
    | '개'
    | '고양이'
    | '골렘'
    | '돼지'
    | '버섯'
    | '소'
    | '솔져'
    | '스페셜'
    | '슬라임과 달팽이'
    | '식물'
    | '아인종'
    | '악마'
    | '언데드'
    | '에르다스'
    | '예티와 페페'
    | '요정'
    | '용'
    | '원숭이와 곰'
    | '유령'
    | '인공생명체'
    | '장난감'
    | '정령'
    | '조류'
    | '파충류';

interface MonsterLifeCategoryEffect {
    value: number;
    text: string;
    suffix?: string;
}

export const CategoryEffect: Record<MonsterLifeCategory, MonsterLifeCategoryEffect> = {
    ['개']: { value: 1, text: '힘, 행운' },
    ['고양이']: { value: 2, text: '행운' },
    ['골렘']: { value: 15, text: '방어력' },
    ['돼지']: { value: 50, text: '최대 HP' },
    ['버섯']: { value: 1, text: '몬스터라이프 상점', suffix: '% 할인' },
    ['소']: { value: 2, text: '힘' },
    ['솔져']: { value: 1, text: '힘, 지능' },
    ['스페셜']: { value: 0, text: '' },
    ['슬라임과 달팽이']: { value: 30, text: '10초마다 MP', suffix: ' 회복' },
    ['식물']: { value: 30, text: '10초마다 HP', suffix: ' 회복' },
    ['아인종']: { value: 2, text: '지능' },
    ['악마']: { value: 1, text: '행운, 민첩' },
    ['언데드']: { value: 1, text: '사망 패널티 지속 시간', suffix: '% 감소' },
    ['에르다스']: { value: 1, text: '아케인 리버 몬스터 처치 시\n아이템 드롭률', suffix: '%' },
    ['예티와 페페']: { value: 1, text: '소환수 지속시간', suffix: '%' },
    ['요정']: { value: 50, text: '최대 MP' },
    ['용']: { value: 10, text: '몬스터 처치 시 10% 확률로 HP', suffix: ' 회복' },
    ['원숭이와 곰']: { value: 2, text: '민첩' },
    ['유령']: { value: 10, text: '몬스터 처치 시 10% 확률로 MP', suffix: ' 회복' },
    ['인공생명체']: { value: 1, text: '스킬의 MP 소비량', suffix: '% 감소' },
    ['장난감']: { value: 1, text: '메소 획득량', suffix: '%' },
    ['정령']: { value: 1, text: '지능, 행운' },
    ['조류']: { value: 2, text: '민첩' },
    ['파충류']: { value: 1, text: '민첩, 지능' },
};

export const getFarmCategoryEffect = (category: MonsterLifeCategory): MonsterLifeCategoryEffect => CategoryEffect[category];