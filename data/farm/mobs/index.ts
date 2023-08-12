import ai from './ai.json';
import bird from './bird.json';
import cat from './cat.json';
import cow from './cow.json';
import demihuman from './demihuman.json';
import demon from './demon.json';
import dog from './dog.json';
import dragon from './dragon.json';
import erdas from './erdas.json';
import fairy from './fairy.json';
import ghost from './ghost.json';
import golem from './golem.json';
import monkey_bear from './monkey_bear.json';
import mushroom from './mushroom.json';
import pig from './pig.json';
import plant from './plant.json';
import reptile from './reptile.json';
import slime_snail from './slime_snail.json';
import soldier from './soldier.json';
import spirit from './spirit.json';
import toy from './toy.json';
import undead from './undead.json';
import yeti_pepe from './yeti_pepe.json';
import special from './special.json';

const normalMobs = {
    ai,
    bird,
    cat,
    cow,
    demihuman,
    demon,
    dog,
    dragon,
    erdas,
    fairy,
    ghost,
    golem,
    monkey_bear,
    mushroom,
    pig,
    plant,
    reptile,
    slime_snail,
    soldier,
    spirit,
    toy,
    undead,
    yeti_pepe,
} as const;

const categoryEffectMap = {
    dog: { value: 1, text: '힘, 행운' },
    cat: { value: 2, text: '행운' },
    golem: { value: 15, text: '방어력' },
    pig: { value: 50, text: '최대 HP' },
    mushroom: { value: 1, text: '몬스터라이프 상점', suffix: '% 할인' },
    cow: { value: 2, text: '힘' },
    soldier: { value: 1, text: '힘, 지능' },
    slime_snail: { value: 30, text: '10초마다 MP', suffix: ' 회복' },
    plant: { value: 30, text: '10초마다 HP', suffix: ' 회복' },
    demihuman: { value: 2, text: '지능' },
    demon: { value: 1, text: '행운, 민첩' },
    undead: { value: 1, text: '사망 패널티 지속 시간', suffix: '% 감소' },
    erdas: { value: 1, text: '아케인 리버 몬스터 처치 시\n아이템 드롭률', suffix: '%' },
    yeti_pepe: { value: 1, text: '소환수 지속시간', suffix: '%' },
    fairy: { value: 50, text: '최대 MP' },
    dragon: { value: 10, text: '몬스터 처치 시 10% 확률로 HP', suffix: ' 회복' },
    monkey_bear: { value: 2, text: '민첩' },
    ghost: { value: 10, text: '몬스터 처치 시 10% 확률로 MP', suffix: ' 회복' },
    ai: { value: 1, text: '스킬의 MP 소비량', suffix: '% 감소' },
    toy: { value: 1, text: '메소 획득량', suffix: '%' },
    spirit: { value: 1, text: '지능, 행운' },
    bird: { value: 2, text: '민첩' },
    reptile: { value: 1, text: '민첩, 지능' },
} as const;

const gradeMultiplier = {
    C: 1,
    B: 2,
    'B+': 3,
    A: 4,
    'A+': 5,
    S: 6,
    SS: 7,
} as const;

type MobGrade = keyof typeof gradeMultiplier;

type MobCategory = keyof typeof categoryEffectMap | 'special';

export type Mob = {
    name: string;
    grade: MobGrade;
    category: MobCategory;
    effect: string;
    other?: string;
    img: string;
}

const NORMAL_MOBS: Mob[] = Object.entries(normalMobs).flatMap(([c, mobs]) =>
    mobs.map(mob => {
        const category = c as keyof typeof normalMobs;
        const categoryEffect = categoryEffectMap[category];
        const { text, value } = categoryEffect;
        const suffix = 'suffix' in categoryEffect ? categoryEffect.suffix : '';
        const multiplier = gradeMultiplier[mob.grade as keyof typeof gradeMultiplier];
        const effect = `${text} ${suffix ? '' : '+'}${value * multiplier}${suffix}`;
        return {
            name: mob.name,
            grade: mob.grade as MobGrade,
            category: category,
            effect,
            img: encodeURI(`/images/monster-life/${category}/${mob.name}.png`),
        } satisfies Mob;
    }),
) satisfies Mob[];

const SPECIAL_MOBS: Mob[] = special.map(mob => ({
    name: mob.name,
    grade: mob.grade as MobGrade,
    category: 'special',
    effect: mob.effect,
    other: mob.other,
    img: encodeURI(`/images/monster-life/special/${mob.name}.png`),
})) satisfies Mob[];

export const monsterLifeMobs = [...NORMAL_MOBS, ...SPECIAL_MOBS];
const monsterLifeMobsMap = new Map(monsterLifeMobs.map(mob => [mob.name, mob]));
export const getMonsterLifeMob = (name: string): Mob | undefined => monsterLifeMobsMap.get(name);

export const mobsByEffect = {
    all: {
        normals: NORMAL_MOBS,
        specials: SPECIAL_MOBS,
    },
    allStat: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('올스탯')),
    },
    str: {
        normals: NORMAL_MOBS.filter(m => ['dog', 'cow', 'soldier'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('힘')),
    },
    dex: {
        normals: NORMAL_MOBS.filter(m => ['bird', 'monkey_bear', 'reptile', 'demon'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('민첩')),
    },
    luk: {
        normals: NORMAL_MOBS.filter(m => ['cat', 'dog', 'demon', 'spirit'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('행운')),
    },
    int: {
        normals: NORMAL_MOBS.filter(m => ['soldier', 'demihuman', 'spirit', 'reptile'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('지능')),
    },
    hp: {
        normals: NORMAL_MOBS.filter(m => ['pig'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('최대 HP')),
    },
    attack: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => ['공격력', '마력'].some(e => m.effect.includes(e))),
    },
    boss: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => ['보스', '방어율', '파이널'].some(e => m.effect.includes(e))),
    },
    damage: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => !['보스', '크리', '파이널'].some(e => m.effect.includes(e)) && ['데미지'].some(e => m.effect.includes(e))),
    },
    critical: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('크리티컬')),
    },
    buffDuration: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('버프')),
    },
    reuse: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('재사용')),
    },
    summon: {
        normals: NORMAL_MOBS.filter(m => ['yeti_pepe'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('소환수')),
    },
    status: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('상태이상')),
    },
    hit: {
        normals: [],
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('피격')),
    },
    exp: {
        normals: NORMAL_MOBS.filter(m => ['erdas', 'toy'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => ['메소', '캐릭터의', '드롭'].some(e => m.effect.includes(e))),
    },
    farm: {
        normals: NORMAL_MOBS.filter(m => ['mushroom'].includes(m.category)),
        specials: SPECIAL_MOBS.filter(m => m.effect.includes('농장')),
    },
} as const;

export type MobEffectGroup = keyof typeof mobsByEffect;
