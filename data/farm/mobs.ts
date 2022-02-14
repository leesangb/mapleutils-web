import mobs from '@data/farm/mobs.json';
import { getFarmCategoryEffect, MonsterLifeCategory } from '@data/farm/monsterLifeCategory';
import { getGradeMultiplier, MonsterLifeGrade } from '@data/farm/monsterLifeGrade';

export interface MonsterLifeMob {
    name: string;
    category: MonsterLifeCategory;
    effect: string;
    grade: MonsterLifeGrade;
    other?: string;
    img: string;
}

const fixMob = (mob: MonsterLifeMob): MonsterLifeMob => {
    if (mob.category === '스페셜') {
        return { ...mob, img: encodeURI(`/images/monster-life/${mob.name}.png`) };
    }
    const ce = getFarmCategoryEffect(mob.category);
    const multiplier = getGradeMultiplier(mob.grade);
    const effect = `${ce.text} ${ce.suffix && ce.suffix.length > 1 ? '' : '+'}${ce.value * multiplier}${
        ce.suffix || ''
    }`;
    return { ...mob, effect, img: encodeURI(`/images/monster-life/${mob.name}.png`) };
};


const MobData: MonsterLifeMob[] = mobs as MonsterLifeMob[];

export const monsterLifeMobs = MobData.map((mob) => fixMob(mob));

export const getMonsterLifeMob = (name: string): MonsterLifeMob | undefined => monsterLifeMobs.find((m) => m.name === name);
