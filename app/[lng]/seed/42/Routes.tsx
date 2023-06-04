'use client';

import NextImage from 'next/image';
import background from '@/assets/images/seed/42/background.png';
import help from '@/assets/images/seed/42/help.png';
import { RadioGroup, Slider } from '@/ds/inputs';
import styled from 'styled-components';
import { media } from '@/ds';
import { Typography } from '@/ds/displays';
import { CSSProperties } from 'react';
import { useTranslation } from '@/i18n/client';
import { useSeed42Store } from '@/store/useSeed42Store';

const imageStyle: CSSProperties = {
    objectFit: 'scale-down',
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '8px auto',
};

export const Routes = () => {
    const { t } = useTranslation({ ns: 'seed42' });
    const { route, setRoute, opacity, setOpacity } = useSeed42Store(state => state);

    return (
        <>
            <Container>
                <NextImage style={{ ...imageStyle, position: 'relative', top: 0, left: 0 }} src={background}
                    alt={'background'} draggable={false} placeholder={'blur'} />
                <LayerImage src={'/images/seed/42/route.png'} draggable={false} />
                <LayerImage src={'/images/seed/42/trap.png'} style={{ opacity: opacity / 100 }}
                    draggable={false} />
                {route === 'route1' && <LayerImage src={'/images/seed/42/path1.png'} draggable={false} />}
                {route === 'route2' && <LayerImage src={'/images/seed/42/path2.png'} draggable={false} />}
            </Container>

            <OptionContainer>
                <NextImage style={{ maxWidth: 200, height: 'auto', gridArea: 'help' }} src={help} alt={'help'}
                    draggable={false} />
                <Label as={'label'}>
                    {t('fakePlatformsOpacity')}
                    <Slider value={opacity}
                        onChange={(e) => setOpacity(Number(e.target.value))} />
                </Label>
                <RadioGroup name={'config'}
                    style={{ gridArea: 'path' }}
                    options={['none', 'route1', 'route2']}
                    direction={'row'}
                    align={'center'}
                    title={t('path')}
                    value={route}
                    legendAlign={'center'}
                    getRender={route => t(route)}
                    onChange={r => setRoute(r as typeof route)} />
            </OptionContainer>

        </>
    );
};

const Container = styled.div`
  position: relative;
  width: min(1704px, 100%);
`;

const LayerImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const OptionContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: auto 1fr max-content;
  gap: 8px;
  align-items: center;
  grid-template-areas: "help opacity path";
  margin: 16px 0;

  ${media.max('md')} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
            "help opacity"
            "path path";
  }
`;

const Label = styled(Typography)`
  grid-area: opacity;
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
`;
