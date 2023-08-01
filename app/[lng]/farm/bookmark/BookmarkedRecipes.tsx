'use client';

import { useFarmBookmarkStore } from '@/store/useFarmBookbarkStore';
import { monsterLifeFullRecipes } from '@/data/farm/recipes';
import MobCard from '../components/MobCard';
import { getMonsterBox } from '@/data/farm/monsterLifeBox';
import { Avatar, Link, Typography } from '@/ds/displays';
import styled from 'styled-components';

export const BookmarkedRecipes = () => {
    const { bookmark } = useFarmBookmarkStore();

    const recipes = monsterLifeFullRecipes.filter(m => bookmark.includes(m.mob.name));

    return (
        <>
            {
                recipes.length
                    ? (
                        <Table>
                            <tbody>
                                {recipes.map(({ mob, parents }) => <Row key={mob.name}>
                                    <td>
                                        <MobCard mob={mob} />
                                    </td>
                                    <td>
                                        <Avatar name={'='} />
                                    </td>
                                    {parents?.length
                                        ? (
                                            <Parent>
                                                <MobCard mob={parents[0]} />
                                                <Avatar name={'+'} />
                                                <MobCard mob={parents[1]} />
                                            </Parent>
                                        ) : (
                                            <Hint>
                                                {
                                                    mob.category === '스페셜'
                                                        ? `${getMonsterBox(mob).map(b => `<${b.name}>`).join(' 또는 ')}에서 나옵니다`
                                                        : `<${mob.category}> 또는 <스페셜>몬스터를 조합하면 일정 확률로 나옵니다`
                                                }
                                            </Hint>
                                        )}
                                </Row>)}
                            </tbody>
                        </Table>
                    )
                    : <Typography style={{ textAlign: 'center' }}>
                        즐겨찾기가 비었습니다. <Link href={'/farm/combine'} lang={'ko'}>스페셜 조합</Link>
                        또는 <Link href={'/farm/info'} lang={'ko'}>몬스터 정리</Link>에서 ★를
                        클릭해 등록해 주세요!
                    </Typography>
            }
        </>
    );
};

const Table = styled.table`
  width: 100%;
`;

const Row = styled.tr`
  display: grid;
  align-items: center;
  gap: 8px;
  grid-template-columns: 1fr auto 2fr;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.contour};
`;

const Parent = styled.td`
  display: grid;
  align-items: center;
  gap: 8px;
  grid-template-columns: 1fr auto 1fr;
`;

const Hint = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
`;
