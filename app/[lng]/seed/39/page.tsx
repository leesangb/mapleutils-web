import 'server-only';

import { I18nPageProps } from '@/i18n/settings';
import QuestionAnswers from './components/QuestionAnswers';

const data = {
    ko: () => import('@/data/seed/39/data.json').then((module) => module.default),
    en: () => import('@/data/seed/39/data.gms.json').then((module) => module.default),
    ['zh-TW']: () => import('@/data/seed/39/data.tms.json').then((module) => module.default),
};

const Seed39Page = async ({ params }: I18nPageProps) => {
    const seedData = await data[params.lng]();
    return (
        <>
            <QuestionAnswers data={seedData} />
        </>
    );
};

export default Seed39Page;
