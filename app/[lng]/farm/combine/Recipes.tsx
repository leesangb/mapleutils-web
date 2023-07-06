'use client';

import { MonsterLifeRecipe } from '@/data/farm/recipes';
import VirtualizedTable, { VirtualizedRowProps } from '@/components/virtualized/VirtualizedTable';
import styled from 'styled-components';
import MobCard from '../components/MobCard';
import { media } from '@/ds';
import { useState } from 'react';
import { englishToHangul, isHangulMatching } from '@/utils/string';
import { SearchInput } from '@/ds/inputs';
import { Tooltip } from '@/ds/displays';

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
            <td style={{ gridArea: 'mob' }}>
                <MobCard mob={mob} />
            </td>
            <Equal>
                =
            </Equal>
            <td style={{ gridArea: 'left' }}>
                <MobCard mob={left} />
            </td>
            <Plus>
                +
            </Plus>
            <td style={{ gridArea: 'right' }}>
                <MobCard mob={right} />
            </td>
        </Row>
    );
};

const Equal = styled.td`
  grid-area: equal;
  font-size: 16px;
  display: grid;
  place-items: center;
  padding: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.contour};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text.secondary};
  user-select: none;
`;

const Plus = styled(Equal)`
  grid-area: plus;
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
    grid-template-columns: 1fr 20px 1fr;
    grid-template-areas: "mob equal left"
      "mob equal plus"
      "mob equal right";
    gap: 2px;
    padding: 4px 0;
  }
`;

export default Recipes;
