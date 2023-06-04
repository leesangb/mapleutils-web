import 'server-only';
import { Card } from '@/ds/surfaces';
import MobGrid from './MobGrid';
import { seed49GmsFilter, seed49KmsFilter, seed49Mobs } from '@/data/seed/49';
import { I18nPageProps } from '@/i18n/settings';
import { Metadata } from 'next';
import { generateI18nSeoMetadata } from '@/utils/seo';

export const generateMetadata = async ({ params }: I18nPageProps): Promise<Metadata> => {
    return await generateI18nSeoMetadata({
        url: '/seed/49',
        lang: params.lng,
        i18nNs: 'seed49',
        images: [
            { url: '/images/49.png' },
        ],
    });
};

const Seed49Page = ({ params }: I18nPageProps) => {
    return (
        <Card>
            <MobGrid mobs={params.lng === 'ko'
                ? seed49Mobs.filter(mob => !seed49KmsFilter.has(mob.name))
                : seed49Mobs.filter(mob => !seed49GmsFilter.has(mob.name))
            } />
        </Card>
    );
};

export default Seed49Page;
