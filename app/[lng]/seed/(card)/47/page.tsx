import { Typography } from '@/ds/displays';
import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import seed47 from '@/assets/images/seed/47.png';
import NextImage from 'next/image';

const Seed47Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed47');
    return (
        <>
            <Typography as={'h2'} style={{ marginBottom: '8px' }}>{t('map')}</Typography>
            <Typography>{t('switchDescription')}</Typography>

            <NextImage style={{
                objectFit: 'scale-down',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '8px auto',
            }} src={seed47} alt={'seed 47'} />
        </>
    );
};

export default Seed47Page;
