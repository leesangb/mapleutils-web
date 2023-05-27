import { I18nPageProps } from '@/i18n/settings';
import { seed24AudioData, seed24AudioDataGMS, seed24AudioDataTMS } from '@/data/seed/24';
import Seed24Tabs from './components/Seed24Tabs';

const data = {
    ko: seed24AudioData,
    en: seed24AudioDataGMS,
    ['zh-TW']: seed24AudioDataTMS,
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
