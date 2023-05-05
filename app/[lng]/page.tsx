import { Card } from '@/ds/surfaces';
import { useTranslation } from '@/i18n/server';
import { I18nPageProps } from '@/i18n/settings';

const HomePage = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'common');
    return (
        <Card>
            {t('welcome')}
            <h1>Hello, Next.js!</h1>
        </Card>
    );
};

export default HomePage;
