import { MonsterLifeInformation } from '.';
import { includesOneOf } from '@/utils/string';
import { getGradeMultiplier } from './monsterLifeGrade';
import { MonsterLifeMob, monsterLifeMobs } from './mobs';

const MONSTER_LIFE_NORMAL_MOBS: MonsterLifeMob[] = monsterLifeMobs.filter((m) => m.category !== '스페셜').sort(
    (a, b) => getGradeMultiplier(b.grade) - getGradeMultiplier(a.grade),
);

const MONSTER_LIFE_SPECIAL_MOBS: MonsterLifeMob[] = monsterLifeMobs.filter((m) => m.category === '스페셜').sort(
    (a, b) => getGradeMultiplier(b.grade) - getGradeMultiplier(a.grade),
);

export const mobsByEffect: MonsterLifeInformation[] = [
    {
        name: '전체',
        mobs: MONSTER_LIFE_SPECIAL_MOBS,
        normals: MONSTER_LIFE_NORMAL_MOBS,
    },
    {
        name: '올스탯',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('올스탯')),
        normals: [],
    },
    {
        name: 'STR',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('힘')),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) => includesOneOf(m.category, ['개', '소', '솔져'])),
    },
    {
        name: 'DEX',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('민첩')),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) =>
            includesOneOf(m.category, ['악마', '원숭이와 곰', '조류', '파충류']),
        ),
    },
    {
        name: 'LUK',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('행운')),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) => includesOneOf(m.category, ['개', '고양이', '악마', '정령'])),
    },
    {
        name: 'INT',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('지능')),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) =>
            includesOneOf(m.category, ['솔져', '아인종', '정령', '파충류']),
        ),
    },
    {
        name: 'HP',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('최대 HP')),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) => includesOneOf(m.category, ['돼지'])),
    },
    {
        name: '공/마',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => includesOneOf(m.effect, ['공격력', '마력'])),
        normals: [],
    },
    {
        name: '보스',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => includesOneOf(m.effect, ['보스', '방어율', '파이널'])),
        normals: [],
    },
    {
        name: '데미지',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter(
            (m) => !includesOneOf(m.effect, ['보스', '크리', '파이널']) && m.effect.includes('데미지'),
        ),
        normals: [],
    },
    {
        name: '크리티컬',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('크리티컬')),
        normals: [],
    },
    {
        name: '버프 지속',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('버프')),
        normals: [],
    },
    {
        name: '재사용',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('재사용')),
        normals: [],
    },
    {
        name: '소환수',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('소환수')),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) => includesOneOf(m.category, ['예티와 페페'])),
    },
    {
        name: '상태이상',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('상태이상')),
        normals: [],
    },
    {
        name: '피격',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('피격')),
        normals: [],
    },
    {
        name: '사냥',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => includesOneOf(m.effect, ['메소', '캐릭터의', '드롭'])),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) => includesOneOf(m.category, ['에르다스', '장난감'])),
    },
    {
        name: '농장',
        mobs: MONSTER_LIFE_SPECIAL_MOBS.filter((m) => m.effect.includes('농장')),
        normals: MONSTER_LIFE_NORMAL_MOBS.filter((m) => includesOneOf(m.category, ['버섯'])),
    },
];
