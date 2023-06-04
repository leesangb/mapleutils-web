import 'server-only';

import { Card } from '@/ds/surfaces';
import { MobsByEffect } from './MobsByEffect';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '몬스터 라이프 몬스터 정리',
    description: '옵션별로 몬스터를 찾아보세요!',
    keywords: [
        '몬스터 라이프',
        '몬라',
        '와르',
        '젬',
        '조합',
        '레시피',
        '농장',
        '농린이',
        '몬스터',
        '라이프',
        '추천',
        '검색',
        'SS급',
        '스페셜',
    ],
    openGraph: {
        title: '몬스터 라이프 조합식',
        description: '몬스터라이프 모든 스페셜 몬스터의 조합식 정리',
        images: [
            { url: 'images/information.png' },
        ],
    },
};

const InfoPage = () => {
    return (
        <Card>
            <MobsByEffect />
        </Card>
    );
};

export default InfoPage;
