import 'server-only';

import { Card } from '@/ds/surfaces';
import { Metadata } from 'next';
import { BookmarkedRecipes } from './BookmarkedRecipes';

export const metadata: Metadata = {
    title: '몬스터 라이프 즐겨찾기',
    description: '몬스터 라이프 즐겨찾기',
    keywords: ['몬스터 라이프', '몬라', '와르', '젬', '조합', '레시피', '농장', '농린이', '몬스터', '라이프'],
    openGraph: {
        title: '몬스터 라이프 즐겨찾기',
        description: '몬스터 라이프 즐겨찾기',
        images: [
            { url: 'images/combine.png' },
        ],
    },
};

const FarmBookmarkPage = () => {
    return (
        <Card>
            <BookmarkedRecipes />
        </Card>
    );
};

export default FarmBookmarkPage;
