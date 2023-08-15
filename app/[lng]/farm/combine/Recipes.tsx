'use client';

import { MonsterLifeRecipe } from '@/data/farm/recipes';
import VirtualizedTable, { VirtualizedRowProps } from '@/components/virtualized/VirtualizedTable';
import styled from 'styled-components';
import { useState } from 'react';
import { englishToHangul, isHangulMatching } from '@/utils/string';
import { Button, RadioGroup, SearchInput } from '@/ds/inputs';
import { Tooltip, Typography } from '@/ds/displays';
import { useFarmDirectionStore } from '@/store/useFarmDirectionStore';
import { rotateGrowOutLeft } from '@/ds/css';
import { RiSettings2Fill } from 'react-icons/ri';
import { Popover } from '@/ds/surfaces/popover/Popover';
import { useTranslation } from '@/i18n/client';
import { RecipeRow } from '../components/RecipeRow';

interface RecipesProps {
    recipes: Required<MonsterLifeRecipe>[];
}

const Recipes = ({ recipes }: RecipesProps) => {
    const [input, setInput] = useState<string>('');
    const { direction, setDirection } = useFarmDirectionStore();
    const { t } = useTranslation({ ns: 'farmCombine' });

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
            <SearchBarContainer>
                <Tooltip style={{ width: '100%' }} title={englishToHangul(input)} placement={'top'}>
                    <SearchInput fullWidth
                        value={input}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={'몬스터 이름, 카테고리, 효과 검색 (예: 각성한 락 스피릿, ㄳㅎㄽㅍㄹ, 악마, frvf...), 영어, 초성 검색 ✅'} />
                </Tooltip>
                <Popover>
                    <Popover.Trigger>
                        {({toggle}) =>
                            <Tooltip title={t('settings')}>
                                <Button styles={[{ marginLeft: 'auto' }, rotateGrowOutLeft]}
                                    onClick={() => toggle()}>
                                    <RiSettings2Fill />
                                </Button>
                            </Tooltip>
                        }
                    </Popover.Trigger>
                    <Popover.Content>
                        <Settings>
                            <Typography style={{ padding: '4px' }}>
                                순서
                            </Typography>
                            <RadioGroup name={'direction'}
                                getRender={(v) => <Typography as={'span'} fontSize={14}>{t(v)}</Typography>}
                                value={direction}
                                onChange={setDirection}
                                options={['LEFT_TO_RIGHT', 'RIGHT_TO_LEFT']} />
                        </Settings>
                    </Popover.Content>
                </Popover>
            </SearchBarContainer>
            <VirtualizedTable data={data}
                height={'calc(100vh - var(--appBar_height) * 3.5)'}
                estimatedRowHeight={() => 205}
                overScan={5}
                RowComponent={RowComponent} />
        </>
    );
};

const RowComponent = ({ rowData, measureRef, ...props }: VirtualizedRowProps<Required<MonsterLifeRecipe>>) => {
    const { direction } = useFarmDirectionStore();
    return (
        <RecipeRow recipe={rowData} direction={direction} ref={measureRef} {...props} />
    );
};

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
`;

export default Recipes;
