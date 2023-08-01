import 'server-only';

import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import { Typography } from '@/ds/displays';
import NextImage from 'next/image';
import full from '@/assets/images/seed/23/full.png';
import map1 from '@/assets/images/seed/23/1.png';
import map2 from '@/assets/images/seed/23/2.png';
import map3 from '@/assets/images/seed/23/3.png';
import { CSSProperties } from 'react';
import { Card } from '@/ds/surfaces';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/23',
        lang: params.lng,
        i18nNs: 'seed23',
        images: [
            { url: '/images/23.png' },
        ],
    });
};

const imageStyle: CSSProperties = {
    objectFit: 'scale-down',
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '8px auto',
};

const Seed23Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed23');

    return (
        <Card>
            <Typography as={'h2'}>{t('mapFull')}</Typography>
            <NextImage style={imageStyle} src={full} placeholder={'blur'} alt={'seed 23 full'} />

            <hr />

            <Typography as={'h2'}>{t('map1')}</Typography>
            <NextImage src={map1} style={imageStyle} placeholder={'blur'} alt={'seed 23 1'} />

            <hr />

            <Typography as={'h2'}>{t('map2')}</Typography>
            <NextImage src={map2} style={imageStyle} placeholder={'blur'} alt={'seed 23 2'} />

            <hr />

            <Typography as={'h2'}>{t('map3')}</Typography>
            <NextImage src={map3} style={imageStyle} placeholder={'blur'} alt={'seed 23 3'} />
        </Card>
    );
};

export default Seed23Page;
