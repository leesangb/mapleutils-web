import { MonsterLifeMob } from '@/data/farm/mobs';
import { Card } from '@/ds/surfaces';
import styled from 'styled-components';
import { Tooltip, Typography } from '@/ds/displays';
import GradeChip from './GradeChip';
import { RiStarFill, RiStarLine } from 'react-icons/ri';
import { Button } from '@/ds/inputs';
import { useFarmBookmarkStore } from '@/store/useFarmBookbarkStore';
import { getMesoKrUrl } from '@/utils/string';
import { useWindowPopupContext } from '@/components/popup/useWindowPopupContext';

interface MobMiniCardProps {
    mob: MonsterLifeMob;
    active?: boolean;
}

export const MobMiniCard = ({ mob, active }: MobMiniCardProps) => {
    const { isBookmarked, toggleBookmark } = useFarmBookmarkStore();
    const { openPopup } = useWindowPopupContext();

    return (
        <Container $active={!!active}>
            <Tooltip title={mob.category} placement={'right'} size={'small'}
                style={{ position: 'absolute', top: 2, left: 4, cursor: 'pointer' }}>
                <GradeChip grade={mob.grade} />
            </Tooltip>
            <Image src={`/images/monster-life/${mob.name}.png`} alt={mob.name} />
            <Tooltip title={'meso.kr에서 검색'} placement={'top'} size={'small'}>
                <Button variant={'ghost'} size={'large'} onClick={e => {
                    if (window.matchMedia('(width <= 600px)').matches) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    openPopup(getMesoKrUrl(mob.name));
                }} target={'_blank'} href={getMesoKrUrl(mob.name)}>
                    {mob.name}
                </Button>
            </Tooltip>
            <Typography as={'span'} fontSize={11} style={{ whiteSpace: 'pre-wrap' }}>{mob.effect}</Typography>
            <FavoriteButton variant={'ghost'} onClick={() => toggleBookmark(mob.name)}>
                {
                    isBookmarked(mob.name)
                        ? <RiStarFill color={'orange'} />
                        : <RiStarLine color={'orange'} />
                }
            </FavoriteButton>
        </Container>
    );
};

const Image = styled.img.attrs({ draggable: false })`
  object-fit: scale-down;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.contour};
  background-color: ${({ theme }) => theme.surface.default};
`;

const Container = styled(Card)<TransientProps<{ active: boolean }>>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 8px;
  background-color: ${({ theme, $active }) => $active ? theme.primary.background : theme.surface.default};

  transition: transform 0.125s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  z-index: 1;
`;

const FavoriteButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  padding: 2px;
  z-index: 1;
  background-color: ${({ theme }) => theme.surface.default};
`;
