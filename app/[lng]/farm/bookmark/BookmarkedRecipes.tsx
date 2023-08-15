'use client';

import { useFarmBookmarkStore } from '@/store/useFarmBookbarkStore';
import { monsterLifeFullRecipes } from '@/data/farm/recipes';
import MobCard from '../components/MobCard';
import { getMonsterBox } from '@/data/farm/monsterLifeBox';
import { Avatar, Link, Tooltip, Typography } from '@/ds/displays';
import styled from 'styled-components';
import { useFarmDirectionStore } from '@/store/useFarmDirectionStore';
import { Popover } from '@/ds/surfaces/popover/Popover';
import { Button, RadioGroup } from '@/ds/inputs';
import { rotateGrowOutLeft } from '@/ds/css';
import { RiSettings2Fill } from 'react-icons/ri';
import { useTranslation } from '@/i18n/client';
import { RecipeRow } from '../components/RecipeRow';
import { media } from '@/ds';

export const BookmarkedRecipes = () => {
    const { bookmark } = useFarmBookmarkStore();
    const { direction, setDirection } = useFarmDirectionStore();
    const { t } = useTranslation({ ns: 'farmCombine' });

    const recipes = monsterLifeFullRecipes.filter(m => bookmark.includes(m.mob.name));

    return (
        <>
            <Popover>
                <Popover.Trigger>
                    {({ toggle }) =>
                        <Tooltip style={{ width: 'fit-content' }} title={t('settings')}>
                            <Button styles={[rotateGrowOutLeft]}
                                onClick={() => toggle()}>
                                <RiSettings2Fill />
                            </Button>
                        </Tooltip>
                    }
                </Popover.Trigger>
                <Popover.Content alignment={'bottom-left'}>
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
            {
                recipes.length
                    ? (
                        <Table>
                            <tbody>
                                {recipes.map(({ mob, parents }) => parents?.length
                                    ? <RecipeRow key={mob.name} recipe={{ mob, parents }} direction={direction} />
                                    : <Row key={mob.name} $direction={direction}>
                                        <td style={{ gridArea: 'mob' }}>
                                            <MobCard mob={mob} />
                                        </td>
                                        <td style={{ gridArea: 'equal' }}>
                                            <Avatar name={'='} />
                                        </td>
                                        <Hint>
                                            {
                                                mob.category === '스페셜'
                                                    ? `${getMonsterBox(mob).map(b => `<${b.name}>`).join(' 또는 ')}에서 나옵니다`
                                                    : `<${mob.category}> 또는 <스페셜>몬스터를 조합하면 일정 확률로 나옵니다`
                                            }
                                        </Hint>
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

const Row = styled.tr<TransientProps<{ direction: 'LEFT_TO_RIGHT' | 'RIGHT_TO_LEFT' }>>`
  display: grid;
  align-items: center;
  gap: 8px;
  grid-template-columns: ${({ $direction }) => $direction === 'LEFT_TO_RIGHT' ? '2fr auto 1fr' : '1fr auto 2fr'};
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.contour};
  grid-template-areas: ${({ $direction }) => $direction === 'LEFT_TO_RIGHT' ? '"hint equal mob"' : '"mob equal hint"'};

  ${media.max('md')} {
    grid-template-columns: 1fr auto 1fr;
  }
`;

const Hint = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
`;
