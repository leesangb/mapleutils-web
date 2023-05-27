import 'server-only';
import { Card } from '@/ds/surfaces';
import MobGrid from './components/MobGrid';
import { seed49GmsFilter, seed49KmsFilter, seed49Mobs } from '@/data/seed/49';
import { I18nPageProps } from '@/i18n/settings';

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
