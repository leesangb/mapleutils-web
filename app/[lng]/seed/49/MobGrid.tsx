'use client';

import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { useTranslation } from '@/i18n/client';
import { ReactElement, useState } from 'react';
import { useSeed49Store } from '@/store/useSeed49Store';
import { seed49Locations, SeedMobData } from '@/data/seed/49';
import { englishToHangul, isHangulMatching, isMatching } from '@/utils/string';
import { Tooltip, Typography } from '@/ds/displays';
import { Button, SearchInput } from '@/ds/inputs';
import {
    RiCheckboxBlankLine,
    RiCheckboxFill,
    RiCheckboxMultipleFill,
    RiEyeFill,
    RiEyeOffFill,
    RiFileCopyFill,
    RiSettings2Fill,
    RiStarFill,
    RiStarLine,
    RiSwapBoxFill,
} from 'react-icons/ri';
import styled from 'styled-components';
import { theme } from '@/ds';
import { Collapse } from '@/ds/surfaces';
import VirtualizedMasonry, {
    VirtualizedMasonryDataProps,
    VirtualizedMasonryProps,
} from '@/components/virtualized/VirtualizedMasonry';
import { copy } from '@/utils/clipboard';
import { toast } from 'react-toastify';
import { rotateGrowOutLeft } from '@/ds/css';

interface MobGridProps {
    mobs: SeedMobData[];
}

const MobGrid = ({ mobs: seed49Mobs }: MobGridProps) => {
    const { locale } = useLocalizedPathname();
    const { t } = useTranslation({ ns: 'seed49' });
    const [input, setInput] = useState<string>('');
    const [silhouette, setSilhouette] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const {
        showOnlyFavorite, setShowOnlyFavorite,
        favorites,
        locations, toggleLocation,
        setLocations, reverseLocations,
    } = useSeed49Store();

    const mobs = seed49Mobs
        .filter(({ location, name }) => !locations[location] && (showOnlyFavorite ? favorites.includes(name) : true))
        .map(m => ({ ...m, name: t(m.name), location: t(m.location) }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(({ name, location }) => locale === 'ko'
            ? isHangulMatching(input, name, location)
            : isMatching(input, name, location));

    const allLocations = seed49Locations.sort((a, b) => t(a).localeCompare(t(b)));

    return (
        <>
            <Tooltip title={locale === 'ko' ? englishToHangul(input) : ''} placement={'top'}>
                <SearchInput fullWidth
                    placeholder={t('searchPlaceholder')}
                    value={input}
                    onFocus={(e) => e.target.select()}
                    onChange={e => setInput(e.target.value)} />
            </Tooltip>
            <Toolbar style={{ margin: '8px 0' }}>
                <Tooltip title={`${t('silhouette')} ${silhouette ? 'OFF' : 'ON'}`}>
                    <Button onClick={() => setSilhouette(!silhouette)}>
                        {silhouette ? <RiEyeFill /> : <RiEyeOffFill />}
                    </Button>
                </Tooltip>
                <Tooltip title={t('showOnlyFavorite')}>
                    <Button onClick={() => setShowOnlyFavorite(!showOnlyFavorite)}>
                        {
                            showOnlyFavorite
                                ? <RiStarFill color={'orange'} />
                                : <RiStarLine color={'orange'} />
                        }
                    </Button>
                </Tooltip>
                <Button styles={[{ marginLeft: 'auto' }, rotateGrowOutLeft]} onClick={() => setOpenFilter(!openFilter)}>
                    <RiSettings2Fill /> {t('filters')}
                </Button>
            </Toolbar>
            <Collapse open={openFilter}>
                <Toolbar style={{ marginBottom: '8px' }}>
                    <Button onClick={() => setLocations({})}>
                        <RiCheckboxMultipleFill /> {t('selectAll')}
                    </Button>
                    <Button onClick={() => reverseLocations()}>
                        <RiSwapBoxFill /> {t('invert')}
                    </Button>
                </Toolbar>
                <Toolbar style={{ marginBottom: '8px' }}>
                    {allLocations.map(location =>
                        <Button key={location} onClick={() => toggleLocation(location)}>
                            {
                                locations[location] ? <RiCheckboxBlankLine /> :
                                    <RiCheckboxFill color={theme.primary.default} />
                            }
                            {t(location)}
                        </Button>)}
                </Toolbar>
            </Collapse>

            <Masonry data={mobs}
                getLanes={(width) => Math.max(1, Math.floor(width / 200))}
                height={'calc(100vh - var(--appBar_height) * 4.5)'}
                estimatedHeight={mob => mob.height + OFFSET}
                overScan={10}
                EmptyComponent={EmptyComponent}
                Component={Component}
                $silhouette={silhouette} />
        </>
    );
};

const Component = ({ data }: VirtualizedMasonryDataProps<SeedMobData>) => {
    const { t } = useTranslation({ ns: 'seed49' });
    const { favorites, toggleFavorite } = useSeed49Store();

    return (
        <Container>
            <MobButton onClick={() => {
                copy(t(data.name)).then(() => {
                    toast.success(t('copyMessage', { text: t(data.name) }));
                });
            }}>
                <LocationChip>{t(data.location)}</LocationChip>
                <ImageBackground>
                    <picture>
                        <source srcSet={data.img.replace('.png', '.webp')} type={'image/webp'}/>
                        <Image src={data.img} alt={t(data.name)} style={{ height: data.height + IMAGE_PADDING * 2 }} />
                    </picture>
                </ImageBackground>
                <Typography>{t(data.name)}</Typography>
                <Tooltip style={{ position: 'absolute', bottom: '8px', right: '8px' }} placement={'left'}
                    title={t('clickToCopy')}>
                    <RiFileCopyFill color={theme.text.secondary} />
                </Tooltip>
            </MobButton>
            <FavoriteButton variant={'ghost'} onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(data.name);
            }}>
                {
                    favorites.includes(data.name)
                        ? <RiStarFill color={'orange'} />
                        : <RiStarLine color={'orange'} />
                }
            </FavoriteButton>
        </Container>
    );
};

const LocationChip = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  border-radius: 4px;
  padding: 2px 4px;
  background-color: ${({ theme }) => theme.surface.default};
  transition: box-shadow 0.125s ease-in-out;
  
  @media (hover: hover) {
    &:hover {
      z-index: 1;
      box-shadow: 0 0 4px 2px ${({ theme }) => theme.contour};
    }
  }
`;

const FavoriteButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 8px;
  border-radius: 50%;
  z-index: 1;
`;

const EmptyComponent = () => {
    const { t } = useTranslation();
    return (
        <Typography variant={'h3'}
            style={{
                color: theme.text.disabled,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {t('noResultsFound')}
        </Typography>
    );
};

const Toolbar = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  align-items: center;
`;

const IMAGE_PADDING = 8;
const Image = styled.img.attrs({ draggable: false })`
  object-fit: scale-down;
  width: 100%;
  box-sizing: border-box;
  padding: ${IMAGE_PADDING}px;
  filter: brightness(0%) drop-shadow(0 0 1px white);
  user-select: none;
  pointer-events: none;

  transition: filter 0.125s ease-in-out;
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

const Container = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
`;

const MOB_BUTTON_PADDING = 8;
const MOB_BUTTON_MARGIN = 4;
const MobButton = styled.button`
  position: relative;
  width: calc(100% - 8px);
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: ${MOB_BUTTON_MARGIN}px;
  padding: ${MOB_BUTTON_PADDING}px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: background-color 0.125s ease-in-out;

  @media (hover: hover) {
    &:hover {
      & > ${ImageBackground} > picture > ${Image} {
        filter: brightness(100%);
      }

      cursor: pointer;
      background-color: ${({ theme }) => theme.surface.default};

      & > ${ImageBackground} {
        background-color: ${({ theme }) => theme.surface.hover};
      }
    }
  }

  &:active:not(:has(button:active)) {
    & > ${ImageBackground} {
      background-color: ${({ theme }) => theme.surface.active};
    }
  }
`;

const Masonry = styled(VirtualizedMasonry)`
  ${({ $silhouette }) => $silhouette && `
        && img {
            filter: none;
        }
    `})}
` as <T>(props: VirtualizedMasonryProps<T> & { $silhouette: boolean }) => ReactElement;

const OFFSET = IMAGE_PADDING * 2
    + MOB_BUTTON_PADDING * 2
    + MOB_BUTTON_MARGIN * 2
    + 2 // container border
    + 8 // container gap
    + 16 * 1.5 // font size
    + 4; // font padding

export default MobGrid;
