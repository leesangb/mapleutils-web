import 'server-only';
import { I18nPageProps } from '@/i18n/settings';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';
import { Card } from '@/ds/surfaces';
import { Steps } from './Steps';

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/36',
        lang: params.lng,
        i18nNs: 'seed36',
        images: [
            { url: '/images/36.png' },
        ],
    });
};

const Seed36Page = () => {
    return (
        <Card>
            <Steps />
        </Card>
    );
};

export default Seed36Page;
