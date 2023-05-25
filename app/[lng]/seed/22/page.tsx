import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import { Typography } from '@/ds/displays';
import NextImage from 'next/image';
import map1 from '@/assets/images/seed/22/1.png';
import map2 from '@/assets/images/seed/22/2.png';
import tip1 from '@/assets/images/seed/22/tip1.gif';
import tip2 from '@/assets/images/seed/22/tip2.gif';
import tip3 from '@/assets/images/seed/22/tip3.gif';
import tip4 from '@/assets/images/seed/22/tip4.1.gif';

import { CSSProperties } from 'react';
import { Accordion, AccordionContent, AccordionSummary, Card } from '@/ds/surfaces';
import { PlatformMap } from './components/PlatformMap';
import { RiLightbulbLine } from 'react-icons/ri';

const imageStyle: CSSProperties = {
    objectFit: 'scale-down',
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '8px auto',
};

const Seed22Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed22');

    return (
        <Card>
            <Typography as={'h2'}>{t('map1')}</Typography>
            <NextImage style={imageStyle} src={map1} placeholder={'blur'} alt={'seed 22 1'} />
            <Accordion>
                <AccordionSummary>
                    <RiLightbulbLine />
                    {t('gifTip')}
                </AccordionSummary>
                <AccordionContent>
                    <NextImage style={imageStyle} src={tip1} alt={'seed 22 tip1'} />
                </AccordionContent>
            </Accordion>

            <hr />

            <Typography as={'h2'}>{t('map2')}</Typography>
            <NextImage src={map2} style={imageStyle} placeholder={'blur'} alt={'seed 22 2'} />
            <Accordion>
                <AccordionSummary>
                    <RiLightbulbLine />
                    {t('gifTip')}
                </AccordionSummary>
                <AccordionContent
                    styles={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr 1fr', justifyItems: 'center' }}>
                    <NextImage style={imageStyle} src={tip2} alt={'seed 22 tip2'} />
                    <NextImage style={imageStyle} src={tip3} alt={'seed 22 tip3'} />
                </AccordionContent>
            </Accordion>

            <hr />

            <Typography as={'h2'}>{t('map3')}</Typography>
            <PlatformMap />
            <Accordion>
                <AccordionSummary>
                    <RiLightbulbLine />
                    {t('gifTip')}
                </AccordionSummary>
                <AccordionContent
                    styles={{
                        display: 'grid',
                        gap: '8px',
                        gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center',
                        justifyItems: 'center',
                    }}>
                    <video style={{ maxWidth: '100%' }} src={'/images/seed/22/tip4.mp4'} controls loop />
                    <NextImage style={imageStyle} src={tip4} alt={'seed 22 tip4'} />
                </AccordionContent>
            </Accordion>
        </Card>
    );
};

export default Seed22Page;
