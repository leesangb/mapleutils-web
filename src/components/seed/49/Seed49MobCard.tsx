import { useTranslation } from 'next-i18next';
import { Theme, Tooltip, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import useCopy from '@hooks/useCopy';
import { MonsterCard } from '@components/card';
import { SeedMobData } from '@data/seed/49';
import { styled } from '@mui/system';
import NextImage from 'next/image';
import { TOptions } from 'i18next';

interface Seed49MobCardProps {
    mob: SeedMobData & { location: string };
    silhouette: boolean;
}

interface StyledImgProps {
    // maybe fix with transient props with styled component
    silhouette: number;
    filter: string;
}

const StyledImg = styled(NextImage)((props: StyledImgProps) => ({
    filter: props.silhouette ? props.filter : 'none',
    transition: '0.2s',
    pointerEvents: 'none',
}));

const seed49I18nOptions: TOptions = { ns: 'seed49' };

const getFilterCss = (theme: Theme): string => {
    return theme.palette.mode === 'light'
        ? 'brightness(0%)'
        : 'brightness(0%) drop-shadow(0 0 1px white)';
};

const Seed49MobCard = (props: Seed49MobCardProps) => {
    const { t } = useTranslation(['common', 'seed49']);
    const { mob } = props;
    const theme = useTheme();
    const [silhouette, setSilhouette] = useState(true);
    const filterCss = useMemo(() => getFilterCss(theme), [theme]);
    const { copy, CopySnackbar } = useCopy();

    return (
        <>
            <Tooltip title={t('clickToCopy')} arrow placement={'top'}>
                <MonsterCard tags={[t(mob.location, seed49I18nOptions)]}
                             name={t(mob.name, seed49I18nOptions)}
                             onClick={() => copy(t(mob.name, seed49I18nOptions))}
                             onMouseEnter={() => setSilhouette(false)}
                             onMouseLeave={() => setSilhouette(true)}>
                    <StyledImg width={mob.width}
                               height={mob.height}
                               src={mob.img}
                               silhouette={props.silhouette && silhouette ? 1 : 0}
                               filter={filterCss}
                               alt={t(mob.name, seed49I18nOptions)} />
                </MonsterCard>
            </Tooltip>
            <CopySnackbar />
        </>
    );
};

export default Seed49MobCard;