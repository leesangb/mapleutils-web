'use client';

import { MonsterLifeMob } from '@/data/farm/mobs';
import styled from 'styled-components';
import { Button } from '@/ds/inputs';
import { Typography } from '@/ds/displays';
import { media, theme } from '@/ds';
import { RiGiftLine, RiNodeTree, RiSearch2Line, RiStarFill, RiStarLine } from 'react-icons/ri';
import { getExtendCost } from '@/data/farm/monsterLifeCost';
import GradeChip from './GradeChip';
import CostChip from './CostChip';
import useModals from '@/ds/hooks/useModals';
import { MobFamilyTreeModal } from './MobFamilyTreeModal';
import { monsterLifeFamilyMapping } from '@/data/farm/recipes';
import { MobBoxModal } from './MobBoxModal';
import { MobFarmModal } from './MobFarmModal';
import { useFarmBookmarkStore } from '@/store/useFarmBookbarkStore';
import { getMesoKrUrl } from '@/utils/string';
import { useWindowPopupContext } from '@/components/popup/useWindowPopupContext';

interface MobCardProps {
    mob: MonsterLifeMob;
}

const MobCard = ({ mob }: MobCardProps) => {
    const cost = getExtendCost(mob);
    const { isBookmarked, toggleBookmark } = useFarmBookmarkStore();
    const { openPopup } = useWindowPopupContext();

    const { open, close } = useModals();

    const openMobFamilyModal = () => {
        open({
            Component: MobFamilyTreeModal,
            props: {
                onClose: () => close({ Component: MobFamilyTreeModal }),
                mob: mob,
            },
        });
    };

    const openMobBoxModal = () => {
        open({
            Component: MobBoxModal,
            props: {
                onClose: () => close({ Component: MobBoxModal }),
                mob: mob,
            },
        });
    };

    const openMobFarmModal = () => {
        open({
            Component: MobFarmModal,
            props: {
                onClose: () => close({ Component: MobFarmModal }),
                mob: mob,
            },
        });
    };

    return (
        <Container>
            <LabelList>
                <LabelItem>
                    <GradeChip grade={mob.grade} category={mob.category} />
                </LabelItem>
                {
                    cost > 0 &&
                    <LabelItem>
                        <CostChip cost={cost} />
                    </LabelItem>
                }
            </LabelList>
            <MobButton onClick={() => openMobFarmModal()}>
                <ImageBackground>
                    <Image src={mob.img} alt={mob.name} />
                </ImageBackground>
                <MobName>{mob.name}</MobName>
                <MobEffect as={'span'} color={theme.text.secondary}>{mob.effect}</MobEffect>
            </MobButton>
            <FavoriteButton variant={'ghost'} onClick={() => toggleBookmark(mob.name)}>
                {
                    isBookmarked(mob.name)
                        ? <RiStarFill color={'orange'} />
                        : <RiStarLine color={'orange'} />
                }
            </FavoriteButton>
            <ButtonGroup>
                <Button variant={'ghost'} size={'small'} style={{ marginRight: 'auto' }}
                    target={'_blank'}
                    onClick={e => {
                        if (window.matchMedia('(width <= 600px)').matches) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        openPopup((e.target as HTMLAnchorElement).href);
                    }}
                    href={getMesoKrUrl(mob.name)}>
                    <RiSearch2Line /> meso.kr
                </Button>
                {
                    (mob.other === '상자' || mob.name === '쁘띠 루미너스(빛)')
                    && (
                        <Button variant={'ghost'} size={'small'} onClick={() => openMobBoxModal()}>
                            <RiGiftLine />
                            상자
                        </Button>
                    )
                }
                {
                    monsterLifeFamilyMapping[mob.name]
                    && (
                        <Button variant={'ghost'} size={'small'} onClick={() => openMobFamilyModal()}>
                            <RiNodeTree />
                            전체 조합식
                        </Button>
                    )
                }
            </ButtonGroup>
        </Container>
    );
};
const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const Image = styled.img.attrs({ draggable: false })`
  object-fit: scale-down;
  width: auto;
  height: 80px;

  box-sizing: border-box;
  padding: 8px;
  user-select: none;
  pointer-events: none;

  ${media.max('sm')} {
    height: 64px;
  }
`;

const ImageBackground = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.background};
  text-align: center;
  transition: background-color 0.125s ease-in-out;
`;

const MobButton = styled.button`
  position: relative;
  width: 100%;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px 8px 40px 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: background-color 0.125s ease-in-out;

  &:hover {

    cursor: pointer;
    background-color: ${({ theme }) => theme.surface.default};

    & > ${ImageBackground} {
      background-color: ${({ theme }) => theme.surface.hover};
    }
  }

  &:active:not(:has(button:active)) {
    & > ${ImageBackground} {
      background-color: ${({ theme }) => theme.surface.active};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const MobName = styled(Typography)`
  width: 100%;
  text-align: left;
  line-height: 1;
  font-weight: 500;
`;

const MobEffect = styled(Typography)`
  width: 100%;
  text-align: left;
  font-size: 12px;
  line-height: 1;
  display: flex;
  align-items: center;
  height: 24px;
`;

const FavoriteButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  z-index: 1;
`;

const LabelList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;

  & > li:not(:first-child) {
    margin-top: 4px;
  }
`;

const LabelItem = styled.li`
  width: fit-content;
  font-size: 10px;
  border-radius: 8px;
  padding: 2px 4px;
  background-color: ${({ theme }) => theme.surface.default};
  transition: box-shadow 0.125s ease-in-out;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  &:hover {
    z-index: 1;
    box-shadow: 0 0 4px 2px ${({ theme }) => theme.contour};
  }
`;

export default MobCard;
