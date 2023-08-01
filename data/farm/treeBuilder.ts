import recipes from './recipes.json';
import { getMonsterLifeMob, MonsterLifeMob } from '@/data/farm/mobs';

export type FamilyNode = {
    current: MonsterLifeMob;
    height: number;
    father?: FamilyNode;
    mother?: FamilyNode;
}

export const buildFamily = (name: string): FamilyNode => {
    const recipe = recipes.find((r) => r.name === name)!;
    if (!recipe || recipe.parents.length !== 2) {
        return {
            current: getMonsterLifeMob(name)!,
            height: 1,
        };
    }

    const [father, mother] = recipe.parents.map(buildFamily);

    return {
        current: getMonsterLifeMob(name)!,
        father,
        mother,
        height: 1 + Math.max(father.height, mother.height),
    };
};

export const familyMapping: Record<FamilyNode['current']['name'], FamilyNode[]> = (() => {
    const families = recipes.map(({ name }) => buildFamily(name)).sort((a, b) => b.height - a.height);
    const mapping: Record<FamilyNode['current']['name'], FamilyNode[]> = {};
    const added: string[] = [];
    families.forEach((family) => {
        const queue: FamilyNode[] = [family];
        while (queue.length > 0) {
            const { current, father, mother } = queue.shift()!;
            if (father) {
                queue.push(father);
                added.push(father.current.name);
            }
            if (mother && father?.current.name !== mother.current.name) {
                queue.push(mother);
                added.push(mother.current.name);
            }
            if (!mapping[current.name]) {
                mapping[current.name] = [family];
            } else if (
                !added.includes(family.current.name) &&
                !mapping[current.name].some((r) => r.current.name === family.current.name)
            ) {
                mapping[current.name].push(family);
            }
        }
    });
    return mapping;
})();
