import { Typography } from '@/ds/displays';
import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import seed47 from '@/assets/images/seed/47.png';
import NextImage from 'next/image';
import { Card } from '@/ds/surfaces';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/47',
        lang: params.lng,
        i18nNs: 'seed47',
        images: [
            { url: '/images/47.png' },
        ],
    });
};

const Seed47Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed47');
    return (
        <Card>
            <Typography as={'h2'} style={{ marginBottom: '8px' }}>{t('map')}</Typography>
            <Typography>{t('switchDescription')}</Typography>

            <NextImage style={{
                objectFit: 'scale-down',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '8px auto',
            }} src={seed47} alt={'seed 47'} width={576} placeholder={'blur'} />
        </Card>
    );
};

export default Seed47Page;
