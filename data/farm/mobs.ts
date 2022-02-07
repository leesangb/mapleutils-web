import mobs from '@data/farm/mobs.json';
import { getFarmCategoryEffect, MonsterLifeCategory } from '@data/farm/monsterLifeCategory';
import { getGradeMultiplier, MonsterLifeGrade } from '@data/farm/monsterLifeGrade';

export interface MonsterLifeMob {
    name: string;
    category: MonsterLifeCategory;
    effect: string;
    grade: MonsterLifeGrade;
    other?: string;
}

const fixMob = (mob: MonsterLifeMob): MonsterLifeMob => {
    const ce = getFarmCategoryEffect(mob.category);
    const multiplier = getGradeMultiplier(mob.grade);
    const effect = `${ce.text} ${ce.suffix && ce.suffix.length > 1 ? '' : '+'}${ce.value * multiplier}${
        ce.suffix || ''
    }`;
    return { ...mob, effect };
};


const MobData: MonsterLifeMob[] = mobs as MonsterLifeMob[];

export const monsterLifeMobs = MobData.map((mob) => (mob.category === '스페셜' ? mob : fixMob(mob)));

export const getMonsterLifeMob = (name: string): MonsterLifeMob | undefined => monsterLifeMobs.find((m) => m.name === name);
