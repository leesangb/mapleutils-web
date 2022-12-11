import useBookmarkStore from '@store/useBookmarkStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { monsterLifeFullRecipes, MonsterLifeRecipe } from '@data/farm/recipes';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { TitleCard } from '@components/card';
import { MobCard } from '@components/card/monster-life';
import { getMonsterBox } from '@data/farm/monsterLifeBox';
import { useMemo } from 'react';
import { Link } from '@components/link';
import { Seo, SeoProps } from '@components/seo';
import { LocalStorageKey } from '@tools/localStorageHelper';
import { Comments } from '@components/comments';

interface BookmarkPageProps {
    recipes: MonsterLifeRecipe[];
}

const seoProps: SeoProps = {
    title: '몬스터 라이프 - 즐겨찾기',
    keywords: ['몬스터 라이프', '몬라', '와르', '젬', '조합', '레시피', '농장', '농린이', '몬스터', '라이프'],
    description: '몬스터 라이프 즐겨찾기',
    image: '/images/combine.png',
};


const RecipeItem = (props: MonsterLifeRecipe) => {
    const { mob, parents } = props;

    return (
        <>
            <Seo {...seoProps} />
            <Grid item xs={12} container spacing={2} alignItems={'center'}>
                <Grid item xs={4}>
                    <MobCard mob={mob} variant={'compact'} />
                </Grid>
                {
                    parents ? (
                        <>
                            <Grid item xs={4}>
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    <Typography variant={'h4'} component={'div'} align={'center'}>=</Typography>
                                    <MobCard mob={parents[0]} variant={'compact'} />
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                    <Typography variant={'h4'} component={'div'} align={'center'}>+</Typography>
                                    <MobCard mob={parents[1]} variant={'compact'} />
                                </Stack>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={8}>
                            <Typography textAlign={'center'}>
                                {
                                    mob.category === '스페셜'
                                        ? `${getMonsterBox(mob).map(b => `<${b.name}>`).join(' 또는 ')}에서 나옵니다`
                                        : `<${mob.category}> 또는 <스페셜>몬스터를 조합하면 일정 확률로 나옵니다`
                                }
                            </Typography>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
};

const BookmarkPage = ({ recipes }: BookmarkPageProps) => {
    const bookmarks = useBookmarkStore[LocalStorageKey.BOOKMARKS](state => state.bookmarks);
    const mobs = useMemo(() => recipes.filter(({ mob }) => bookmarks.has(mob.name)), [bookmarks]);

    return (
        <>
            <TitleCard title={'즐겨찾기'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Grid container spacing={2} alignItems={'center'}>
                        {
                            mobs.length
                                ? mobs.map((recipe) => <RecipeItem key={recipe.mob.name} {...recipe} />)
                                : (
                                    <Grid item xs={12}>
                                        <Typography alignItems={'center'} textAlign={'center'}>즐겨찾기가
                                            비었습니다. <Link href={'/farm/combine'}>스페셜 조합</Link> 또는 <Link href={'/farm/info'}>몬스터
                                                정리</Link>에서 ★를
                                            클릭해 등록해 주세요!</Typography>
                                    </Grid>
                                )
                        }
                    </Grid>
                </CardContent>
            </Card>
            <Comments pageKey={'monster-life_bookmark'} />
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            recipes: monsterLifeFullRecipes,
        },
    };
};

export default BookmarkPage;