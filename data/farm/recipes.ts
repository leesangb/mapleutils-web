import recipes from '@data/farm/recipes.json';
import { getMonsterLifeMob, MonsterLifeMob, monsterLifeMobs } from '@data/farm/mobs';

export interface MonsterLifeRecipe {
    parents: [MonsterLifeMob, MonsterLifeMob];
    mob: MonsterLifeMob;
}


export interface MonsterLifeRecipeLite {
    parents: [string, string];
    name: string;
}


export interface MonsterLifeFamily {
    child: MonsterLifeMob;
    father?: MonsterLifeFamily;
    mother?: MonsterLifeFamily;
}


export interface MonsterLifeFamilyRoot extends MonsterLifeFamily {
    level: number;
}

const MONSTER_LIFE_RECIPES_LITE: MonsterLifeRecipeLite[] = recipes as MonsterLifeRecipeLite[];


export const MONSTER_LIFE_RECIPES: MonsterLifeRecipe[] = MONSTER_LIFE_RECIPES_LITE.map((r) => ({
    parents: r.parents.map((p) => monsterLifeMobs.find((mob) => mob.name === p)!) as [MonsterLifeMob, MonsterLifeMob],
    mob: monsterLifeMobs.find((mob) => mob.name === r.name)!,
}));


export const MONSTER_LIFE_INGREDIENTS: MonsterLifeMob[] = MONSTER_LIFE_RECIPES.flatMap((r) => r.parents).filter(
    (mob, index, arr) => index === arr.findIndex((m) => m.name === mob.name),
);

export const MONSTER_LIFE_RESULTS: MonsterLifeMob[] = monsterLifeMobs.filter(
    (mob) => MONSTER_LIFE_INGREDIENTS.findIndex((m) => m.name === mob.name) === -1,
);


const buildFamilyRec = (name: string, level: number): { family: MonsterLifeFamily; level: number } => {
    const recipe = MONSTER_LIFE_RECIPES.find((r) => r.mob.name === name);
    if (!recipe)
        return {
            family: {
                child: getMonsterLifeMob(name)!,
            },
            level: level + 1,
        };
    const { family: father, level: fatherLevel } = buildFamilyRec(recipe.parents[0].name, level + 1);
    const { family: mother, level: motherLevel } = buildFamilyRec(recipe.parents[1].name, level + 1);
    return {
        family: {
            child: recipe.mob,
            father,
            mother,
        },
        level: level + Math.max(fatherLevel, motherLevel),
    };
};

const buildFamily = (name: string): MonsterLifeFamilyRoot => {
    const recipe = MONSTER_LIFE_RECIPES.find((r) => r.mob.name === name)!;
    const { family: father, level: fatherLevel } = buildFamilyRec(recipe.parents[0].name, 0);
    const { family: mother, level: motherLevel } = buildFamilyRec(recipe.parents[1].name, 0);

    return {
        child: recipe.mob,
        father,
        mother,
        level: Math.max(fatherLevel, motherLevel),
    };
};

export const MONSTER_LIFE_FAMILIES: MonsterLifeFamilyRoot[] = MONSTER_LIFE_RECIPES.map((r) =>
    buildFamily(r.mob.name),
).sort((a, b) => b.level - a.level);


const buildFamilyMapping = (): { [mobName: string]: MonsterLifeFamilyRoot[] } => {
    const familyMapping: { [mobName: string]: MonsterLifeFamilyRoot[] } = {};
    const alreadyAdded: string[] = [];

    MONSTER_LIFE_FAMILIES.forEach((f, i) => {
        const queue: MonsterLifeFamily[] = [f];
        while (queue.length > 0) {
            const { child, father, mother } = queue.shift()!;
            if (father) {
                queue.push(father);
                alreadyAdded.push(father.child.name);
            }
            if (mother && father?.child.name !== mother.child.name) {
                queue.push(mother);
                alreadyAdded.push(mother.child.name);
            }
            if (!familyMapping[child.name]) {
                familyMapping[child.name] = [f];
            } else if (
                !alreadyAdded.includes(f.child.name) &&
                !familyMapping[child.name].some((r) => r.child.name === f.child.name)
            ) {
                familyMapping[child.name].push(f);
            }
        }
    });

    return familyMapping;
};


export const monsterLifeFamilyMapping: { [mobName: string]: MonsterLifeFamilyRoot[] } = buildFamilyMapping();
