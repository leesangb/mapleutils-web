import { buildFamily, familyMapping } from '@/data/farm/treeBuilder';

describe('buildFamily', () => {
    it('각성한 락 스피릿', () => {
        const family = buildFamily('각성한 락 스피릿');

        expect(family).toMatchObject(
            {
                current: {
                    name: '각성한 락 스피릿',
                },
                father: {
                    current: {
                        name: '락 스피릿',
                    },
                    height: 1,
                },
                mother: {
                    current: {
                        name: '부조화의 정령',
                    },
                    height: 1,
                },
                height: 2,
            },
        );
    });

    it('강화형 베릴', () => {
        const family = familyMapping['강화형 베릴'][0];
        expect(family).toMatchObject({
            current: {
                name: '쁘띠 메르세데스',
            },
            father: {
                current: {
                    name: '강화형 베릴',
                },
                father: {
                    current: {
                        name: '베릴',
                    },
                    height: 1,
                },
                mother: {
                    current: {
                        name: '아우프헤벤',
                    },
                    father: {
                        current: {
                            name: '머신 MT-09',
                        },
                        height: 1,
                    },
                    mother: {
                        current: {
                            name: '이루워터',
                        },
                        height: 1,
                    },
                    height: 2,
                },
                height: 3,
            },
        });
    });
});
