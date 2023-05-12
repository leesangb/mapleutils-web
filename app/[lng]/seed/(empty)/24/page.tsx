import { Tabs } from '@/ds/surfaces';
import { I18nPageProps } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';

const Seed24Page = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'seed24');
    return (
        <>
            <Tabs tabs={[
                {
                    name: t('bgm'),
                    content: <>bgm</>,
                },
                {
                    name: t('hint'),
                    content: <>hint</>,
                },
            ]} />
        </>
    );
};

export default Seed24Page;
