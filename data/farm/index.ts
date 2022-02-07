import { MonsterLifeMob } from '@data/farm/mobs';

export type OptionName =
    | '전체'
    | '올스탯'
    | 'STR'
    | 'DEX'
    | 'LUK'
    | 'INT'
    | 'HP'
    | '공/마'
    | '사냥'
    | '농장'
    | '특수'
    | '보스'
    | '데미지'
    | '버프 지속'
    | '소환수'
    | '상태이상'
    | '재사용'
    | '피격'
    | '크리티컬';

export interface MonsterLifeInformation {
    name: OptionName;
    mobs: MonsterLifeMob[];
    normals: MonsterLifeMob[];
}

