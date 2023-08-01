import 'server-only';

import { I18nPageProps } from '@/i18n/settings';
import QuestionAnswers from './QuestionAnswers';
import { Card } from '@/ds/surfaces';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/39',
        lang: params.lng,
        i18nNs: 'seed39',
        images: [
            { url: '/images/39.png' },
        ],
    });
};

const data = {
    ko: () => import('@/data/seed/39/data.json').then((module) => module.default),
    en: () => import('@/data/seed/39/data.gms.json').then((module) => module.default),
    ['zh-TW']: () => import('@/data/seed/39/data.tms.json').then((module) => module.default),
};

const Seed39Page = async ({ params }: I18nPageProps) => {
    const seedData = await data[params.lng]();
    return (
        <Card>
            <QuestionAnswers data={seedData} />
        </Card>
    );
};

export default Seed39Page;
