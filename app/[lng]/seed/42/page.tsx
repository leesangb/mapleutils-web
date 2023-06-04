import 'server-only';

import NextImage from 'next/image';
import end from '@/assets/images/seed/42/end.png';
import { CSSProperties } from 'react';
import { useTranslation } from '@/i18n/server';
import { Typography } from '@/ds/displays';
import { Card } from '@/ds/surfaces';
import { Routes } from './Routes';
import { I18nPageProps } from '@/i18n/settings';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/42',
        lang: params.lng,
        i18nNs: 'seed42',
        images: [
            { url: '/images/42.png' },
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

const Seed42Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed42');

    return (
        <Card>
            <Routes />

            <Typography as={'h2'}>
                {t('lastPart')}
            </Typography>
            <NextImage src={end} alt={'end'} style={imageStyle} placeholder={'blur'} />
        </Card>
    );
};

export default Seed42Page;
