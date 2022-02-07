export type MonsterLifeGrade = 'C' | 'B' | 'B+' | 'A' | 'A+' | 'S' | 'SS';

const GradeMultiplier: Record<MonsterLifeGrade, number> = {
    ['C']: 1,
    ['B']: 2,
    ['B+']: 3,
    ['A']: 4,
    ['A+']: 5,
    ['S']: 6,
    ['SS']: 7,
};

export const getGradeMultiplier = (grade: MonsterLifeGrade): number => GradeMultiplier[grade];