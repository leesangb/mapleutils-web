import 'server-only';

import { Card } from '@/ds/surfaces';
import VideoCapture from './VideoCapture';
import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import { Typography } from '@/ds/displays';
import NextImage from 'next/image';
import ok from '@/assets/images/seed/48/ok.png';
import ko from '@/assets/images/seed/48/ko.png';
import seed48 from '@/assets/images/seed/48.png';
import styles from './index.module.css';
import { RiArrowLeftRightLine } from 'react-icons/ri';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/48',
        lang: params.lng,
        i18nNs: 'seed48',
        images: [
            { url: '/images/48.png' },
        ],
    });
};

const Seed48Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed48');
    return (
        <Card>
            <Typography as={'h2'} style={{ textAlign: 'center' }}>
                {t('helpNew.title')}
            </Typography>
            <ol>
                {[1, 2, 3, 4].map((i) => (<li key={i}>{t(`helpNew.${i}`)}</li>))}
            </ol>
            <div className={styles.description}>
                <div>
                    <NextImage className={styles.image} placeholder={'blur'} quality={100} src={ok}
                        alt={t('helpNew.ok')} />
                    {t('helpNew.ok')}
                </div>
                <RiArrowLeftRightLine size={'36px'} />
                <div>
                    <NextImage className={styles.image} placeholder={'blur'} quality={100} src={ko}
                        alt={t('helpNew.ko')} />
                    {t('helpNew.ko')}
                </div>
            </div>

            <VideoCapture />
            <hr />
            <Typography as={'h2'}>
                {t('mapGuide')}
            </Typography>
            <NextImage className={styles.image} placeholder={'blur'} src={seed48} alt={t('mapGuide')} />
        </Card>
    );
};

export default Seed48Page;
