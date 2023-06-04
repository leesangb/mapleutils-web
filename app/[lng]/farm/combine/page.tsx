import 'server-only';

import { Card } from '@/ds/surfaces';
import { monsterLifeRecipes } from '@/data/farm/recipes';
import Recipes from './Recipes';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '몬스터 라이프 조합식',
    description: '몬스터라이프 모든 스페셜 몬스터의 조합식 정리',
    keywords: ['몬스터 라이프', '몬라', '와르', '젬', '조합', '레시피', '농장', '농린이', '몬스터', '라이프'],
    openGraph: {
        title: '몬스터 라이프 조합식',
        description: '몬스터라이프 모든 스페셜 몬스터의 조합식 정리',
        images: [
            { url: 'images/combine.png' },
        ],
    },
};

const FarmCombinePage = () => {
    return (
        <Card>
            <Recipes recipes={monsterLifeRecipes} />
        </Card>
    );
};

export default FarmCombinePage;
