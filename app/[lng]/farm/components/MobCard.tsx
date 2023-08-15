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
import { monsterLifeFamilyMapping } from '@/data/farm/recipes';
import { MobBoxModal } from './MobBoxModal';
import { MobFarmModal } from './MobFarmModal';
import { useFarmBookmarkStore } from '@/store/useFarmBookbarkStore';
import { getMesoKrUrl } from '@/utils/string';
import { useWindowPopupContext } from '@/components/popup/useWindowPopupContext';
import { MobFamilyTreeModal } from './MobFamilyTreeModal';

interface MobCardProps {
    mob: MonsterLifeMob;
    showTree?: boolean;
    active?: boolean;
    width?: string;
}

const MobCard = ({ mob, showTree = true, active, width }: MobCardProps) => {
    const cost = getExtendCost(mob);
    const { isBookmarked, toggleBookmark } = useFarmBookmarkStore();
    const { openPopup } = useWindowPopupContext();

    const { open, close } = useModals();

    const openMobFamilyModal = () => {
        close({ Component: MobFamilyTreeModal });
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
        <Container $width={width}>
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
                <ImageBackground aria-selected={active}>
                    <Image src={mob.img} alt={mob.name} loading={'lazy'} />
                </ImageBackground>
                <MobContent>
                    <MobName>{mob.name}</MobName>
                    <MobEffect as={'span'} color={theme.text.secondary}>{mob.effect}</MobEffect>
                </MobContent>
            </MobButton>
            <FavoriteButton variant={'ghost'} onClick={() => toggleBookmark(mob.name)}
                aria-label={isBookmarked(mob.name) ? '즐겨찾기 해제' : '즐겨찾기 등록'}>
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
                        if (window.innerWidth <= 600) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        openPopup(getMesoKrUrl(mob.name));
                    }}
                    href={getMesoKrUrl(mob.name)}>
                    <RiSearch2Line /> <Typography as={'span'} fontSize={10}>meso.kr</Typography>
                </Button>
                {
                    (mob.other === '상자' || mob.name === '쁘띠 루미너스(빛)')
                    && (
                        <Button variant={'ghost'} size={'small'} onClick={() => openMobBoxModal()}>
                            <RiGiftLine />
                            <Typography as={'span'} fontSize={10}>
                                상자
                            </Typography>
                        </Button>
                    )
                }
                {
                    showTree && monsterLifeFamilyMapping[mob.name]
                    && (
                        <Button variant={'ghost'} size={'small'} onClick={() => openMobFamilyModal()}>
                            <RiNodeTree />
                            <Typography as={'span'} fontSize={10}>
                                전체 조합식
                            </Typography>
                        </Button>
                    )
                }
            </ButtonGroup>
        </Container>
    );
};

const Container = styled.div<TransientProps<{ width?: string }>>`
  ${({ $width }) => $width && `max-width: ${$width};`}
  ${({ $width }) => $width && `min-width: ${$width};`}
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.surface.default};
`;

const Image = styled.img.attrs({ draggable: false })`
  object-fit: scale-down;
  width: auto;
  height: 70px;

  box-sizing: border-box;
  padding: 8px;
  user-select: none;
  pointer-events: none;
  transition: transform 0.125s ease-in-out;

  ${media.max('sm')} {
    height: 64px;
  }
`;

const ImageBackground = styled.div`
  margin: 0;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.background};
  text-align: center;
  transition: background-color 0.125s ease-in-out;

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.info.background};
  }
`;

const MobContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  box-sizing: border-box;
  gap: 4px;
`;

const MobButton = styled.button`
  position: relative;
  width: 100%;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px 8px 32px 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  gap: 8px;
  align-items: center;
  flex-direction: row;
  transition: background-color 0.125s ease-in-out;
  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.surface.default};
    
      & > ${ImageBackground} {
        background-color: ${({ theme }) => theme.surface.hover};

        & > ${Image} {
          transform: scale(1.125);
        }
      }
    }
  }

  &:active:not(:has(button:active)) {
    & > ${ImageBackground} {
      background-color: ${({ theme }) => theme.surface.active};


      & > ${Image} {
        transform: scale(0.95);
      }
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
  text-wrap: balance;
`;

const MobEffect = styled(Typography)`
  width: 100%;
  text-align: left;
  font-size: 12px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  min-height: 30px;
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
`;

export default MobCard;
