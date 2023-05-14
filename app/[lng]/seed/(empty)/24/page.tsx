import { Tabs } from '@/ds/surfaces';
import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import { seed24AudioData, seed24AudioDataGMS, seed24AudioDataTMS } from '@/data/seed/24';
import { HintContent } from './components/HintContent';
import { BgmContent } from './components/BgmContent';

const data = {
    ko: seed24AudioData,
    en: seed24AudioDataGMS,
    ['zh-TW']: seed24AudioDataTMS,
};

const Seed24Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed24');
    const trackData = data[params.lng];
    return (
        <>
            <Tabs name={'seed24'}
                fadeMs={0}
                tabs={[
                    {
                        name: t('bgm'),
                        content: <BgmContent data={trackData} />,
                    },
                    {
                        name: t('hint'),
                        content: <HintContent data={trackData} />,
                    },
                ]} />
        </>
    );
};

export default Seed24Page;
