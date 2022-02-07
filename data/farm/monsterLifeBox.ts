import { MonsterLifeGrade } from '@data/farm/monsterLifeGrade';
import { MonsterLifeMob } from '@data/farm/mobs';

export interface MonsterLifeBox {
    name: string;
    img: string;
    price: number[];
}


const normal: MonsterLifeBox = {
    name: '평범한 상자',
    img: '/images/monster-life/상자1.png',
    price: [100_000],
};

const good1: MonsterLifeBox = {
    name: '조금 좋은 상자 A+',
    img: '/images/monster-life/상자2.png',
    price: [250_000],
};

const good2: MonsterLifeBox = {
    name: '조금 좋은 상자 S',
    img: '/images/monster-life/상자2.png',
    price: [250_000],
};

const great: MonsterLifeBox = {
    name: '많이 좋은 상자',
    img: '/images/monster-life/상자2.png',
    price: [250_000, 8],
};

const petitLuminous: MonsterLifeBox = {
    name: '루미너스(빛) 상자',
    img: '/images/monster-life/상자2.png',
    price: [582_000],
};


const GRADE_BOX: Record<MonsterLifeGrade, MonsterLifeBox[]> = {
    ['C']: [normal],
    ['B']: [normal],
    ['B+']: [normal],
    ['A']: [normal, great],
    ['A+']: [good1, great],
    ['S']: [good2, great],
    ['SS']: [great],
};

export const getMonsterBox = (mob: MonsterLifeMob): MonsterLifeBox[] => {
    return mob.category !== '스페셜' ? [] : mob.name === '쁘띠 루미너스(빛)' ? [petitLuminous] : GRADE_BOX[mob.grade];
};
