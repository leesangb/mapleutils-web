'use client';

import { MonsterLifeRecipe } from '@/data/farm/recipes';
import VirtualizedTable, { VirtualizedRowProps } from '@/components/virtualized/VirtualizedTable';
import styled from 'styled-components';
import MobCard from '../components/MobCard';
import { media } from '@/ds';
import { useState } from 'react';
import { englishToHangul, isHangulMatching } from '@/utils/string';
import { SearchInput } from '@/ds/inputs';
import { Avatar, Tooltip } from '@/ds/displays';

interface RecipesProps {
    recipes: Required<MonsterLifeRecipe>[];
}

const Recipes = ({ recipes }: RecipesProps) => {
    const [input, setInput] = useState<string>('');

    const data = recipes.filter((recipe) =>
        isHangulMatching(input,
            recipe.mob.name,
            recipe.mob.effect,
            recipe.mob.category,
            ...recipe.parents.flatMap(({
                name,
                effect,
                category,
            }) => [name, category, effect])));

    return (
        <>
            <Tooltip title={englishToHangul(input)} placement={'top'}>
                <SearchInput fullWidth
                    value={input}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={'몬스터 이름, 카테고리, 효과 검색 (예: 각성한 락 스피릿, ㄳㅎㄽㅍㄹ, 악마, frvf...), 영어, 초성 검색 ✅'} />
            </Tooltip>
            <VirtualizedTable data={data}
                height={'calc(100vh - var(--appBar_height) * 3.5)'}
                estimatedRowHeight={() => 205}
                overScan={5}
                RowComponent={RowComponent} />
        </>
    );
};

const RowComponent = ({ rowData, measureRef, ...props }: VirtualizedRowProps<Required<MonsterLifeRecipe>>) => {
    const { mob, parents: [left, right] } = rowData;
    return (
        <Row ref={measureRef} {...props}>
            <Mob>
                <MobCard mob={mob} />
            </Mob>
            <Equal>
                <Avatar name={'='} />
            </Equal>
            <Left>
                <MobCard mob={left} />
            </Left>
            <Plus>
                <Avatar name={'+'} />
            </Plus>
            <Right>
                <MobCard mob={right} />
            </Right>
        </Row>
    );
};

const Mob = styled.td`
  grid-area: mob;
`;

const Plus = styled.td`
  grid-area: plus;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Equal = styled.td`
  grid-area: equal;
`;

const Left = styled.td`
  grid-area: left;
`;

const Right = styled.td`
  grid-area: right;
`;

const Row = styled.tr`
  padding: 8px 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  grid-template-areas: "mob equal left plus right";
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.contour};

  & > td {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  ${media.max('md')} {
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: "mob equal left"
      "mob equal plus"
      "mob equal right";
    gap: 4px;
    padding: 4px 0;
  }
`;

export default Recipes;
