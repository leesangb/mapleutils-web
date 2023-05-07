'use client';

import NextImage from 'next/image';
import cloud from '@/assets/images/seed/22/cloud.png';
import { Box } from '@/ds/displays';
import { CSSProperties } from 'react';
import beginner from '@/assets/images/seed/22/beginner.png';
import expert from '@/assets/images/seed/22/expert.png';
import platform from '@/assets/images/seed/22/platform.png';
import { useSeed22Store } from '@/store/useSeed22Store';
import { RadioGroup } from '@/ds/inputs';
import { useTranslation } from '@/i18n/client';

const layerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    objectFit: 'scale-down',
    height: 'auto',
};

const backgroundStyle: CSSProperties = {
    ...layerStyle,
    position: 'relative',
};

export const PlatformMap = () => {
    const { route, setRoute } = useSeed22Store();
    const { t } = useTranslation({ ns: 'seed22' });
    return <>
        <Box styles={{
            position: 'relative',
            width: 'min(2000px, 100%)',
        }}>
            <NextImage style={backgroundStyle} src={cloud} draggable={false} alt={'seed 22 cloud'} />
            {route === 'beginner' &&
                <NextImage style={layerStyle} src={beginner} draggable={false} alt={'beginner layer'} />}
            {route === 'expert' &&
                <NextImage style={layerStyle} src={expert} draggable={false} alt={'expert layer'} />}
            <NextImage style={layerStyle} src={platform} draggable={false} alt={'platform layer'} />
        </Box>
        <RadioGroup name={'platform'}
            title={t('path') as string}
            options={['none', 'beginner', 'expert']}
            value={route}
            direction={'row'}
            align={'center'}
            legendAlign={'center'}
            getRender={route => t(route)}
            onChange={setRoute}
        />
    </>;
};
