import { MonsterLifeMob } from '@data/farm/mobs';

const COST = {
    special: {
        ['C']: 1,
        ['B']: 1,
        ['B+']: 1,
        ['A']: 2,
        ['A+']: 3,
    },
    normal: {
        ['C']: 500,
        ['B']: 5_000,
        ['B+']: 30_000,
        ['A']: 60_000,
        ['A+']: 130_000,
    },
};

export const getExtendCost = (mob: MonsterLifeMob): number => {
    if (mob.grade === 'SS') return 0;
    if (mob.grade === 'S') return 4;
    return mob.category === '스페셜' ? COST.special[mob.grade] : COST.normal[mob.grade];
};

