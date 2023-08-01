import { Card } from '@/ds/surfaces';
import { seed24AudioData, seed24AudioDataGMS, seed24AudioDataTMS } from '@/data/seed/24';
import { I18nPageProps } from '@/i18n/settings';
import { Typography } from '@/ds/displays';

const data = {
    ko: seed24AudioData,
    en: seed24AudioDataGMS,
    ['zh-TW']: seed24AudioDataTMS,
};

const Seed24SimulatorPage = async ({ params }: I18nPageProps) => {
    const trackData = data[params.lng];
    return (
        <Card>
            <Typography as={'h1'}>
                🚧 under construction 🚧
            </Typography>
            {/*<Simulator data={trackData} />*/}
        </Card>
    );
};

export default Seed24SimulatorPage;
