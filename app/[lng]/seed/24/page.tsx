import { I18nPageProps } from '@/i18n/settings';
import { seed24AudioData, seed24AudioDataGMS, seed24AudioDataTMS } from '@/data/seed/24';
import Seed24Tabs from './Seed24Tabs';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';

const data = {
    ko: seed24AudioData,
    en: seed24AudioDataGMS,
    ['zh-TW']: seed24AudioDataTMS,
};

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/24',
        lang: params.lng,
        i18nNs: 'seed24',
        images: [
            { url: '/images/24.png' },
        ],
    });
};

const Seed24Page = async ({ params }: I18nPageProps) => {
    const trackData = data[params.lng];
    return (
        <>
            <Seed24Tabs trackData={trackData} />
        </>
    );
};

export default Seed24Page;
