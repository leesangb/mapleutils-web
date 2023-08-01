'use client';

import { BgmContent } from './BgmContent';
import { HintContent } from './HintContent';
import { Tabs } from '@/ds/surfaces';
import { TrackInfo } from '@/data/seed/24';
import { useTranslation } from '@/i18n/client';
import { useSeed24Store } from '@/store/useSeed24Store';

interface Seed24TabsProps {
    trackData: TrackInfo[];
}

const tabs = ['bgm', 'hint'] as const;

const Seed24Tabs = ({ trackData }: Seed24TabsProps) => {
    const { t } = useTranslation({ ns: 'seed24' });
    const { tab, setTab } = useSeed24Store();

    return <Tabs name={'seed24'}
        fadeMs={0}
        activeTab={tab === 'bgm' ? 0 : 1}
        onChangeTab={tab => setTab(tabs[tab])}
        tabs={[
            {
                name: t('bgm'),
                content: <BgmContent data={trackData} />,
            },
            {
                name: t('hint'),
                content: <HintContent data={trackData} />,
            },
        ]} />;
};

export default Seed24Tabs;
