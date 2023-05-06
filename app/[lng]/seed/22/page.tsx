import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import { Typography } from '@/ds/displays';
import NextImage from 'next/image';
import map1 from '@/assets/images/seed/22/1.png';
import map2 from '@/assets/images/seed/22/2.png';
import { CSSProperties } from 'react';

const imageStyle: CSSProperties = {
    objectFit: 'scale-down',
    maxWidth: '100%',
    height: 'auto',
};

const Seed22Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed22');

    return (
        <>
            <Typography as={'h2'}>{t('map1')}</Typography>
            <NextImage style={imageStyle} src={map1} placeholder={'blur'} alt={'seed 22 1'} />

            <Typography as={'h2'}>{t('map2')}</Typography>
            <NextImage src={map2} style={imageStyle} placeholder={'blur'} alt={'seed 22 2'} />

            <Typography as={'h2'}>{t('map3')}</Typography>

        </>
    );
};

export default Seed22Page;
