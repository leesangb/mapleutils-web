import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useCallback } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import VirtualizedFixedList from '@components/virtualized-list/VirtualizedFixedList';
import { QuestionAnswer, seed39Data, seed39DataGMS } from '@data/seed/39';
import { isHangulMatching, isMatching } from '@tools/string';
import { Seo, SeoProps } from '@components/seo';
import { TitleCard } from '@components/card';
import { Comments } from '@components/comments';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { TFunction } from 'i18next';

interface Seed39Props {
    data: QuestionAnswer[];
}

interface QuestionAnswerItemProps extends QuestionAnswer {
}

const QuestionAnswerItem = (props: QuestionAnswerItemProps) => {
    const { question, answer, choices } = props;
    return (
        <Grid container alignItems='center' spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={4}>
                <Typography variant={'body1'}>{question}</Typography>
            </Grid>
            {
                choices.map((choice, i) => (
                    <Grid item xs={12} sm={12} md={3} lg={2} key={`${choice}-${answer}`}>
                        <Card sx={theme => ({
                            bgcolor: answer === i
                                ? theme.palette.primary.light
                                : theme.palette.background.default,
                            color: answer === i
                                ? theme.palette.getContrastText(theme.palette.primary.light)
                                : theme.palette.getContrastText(theme.palette.background.default),
                        })}
                              elevation={0}>
                            <CardContent sx={(theme) => ({ padding: theme.spacing(1.5) })}>
                                <Typography variant={'subtitle2'}>{i + 1}. {choice}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

const seoProps = (t: TFunction): SeoProps => ({
    title: t('seo.title', { ns: 'seed39' }),
    keywords: t('seo.keywords', { ns: 'seed39' }),
    description: t('seo.description', { ns: 'seed39' }),
    image: '/images/39.png',
});

const Seed39 = (props: Seed39Props) => {
    const { t, i18n } = useTranslation();
    const { height } = useWindowDimensions();
    const theme = useTheme();
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const rowRenderer = useCallback(
        (item: QuestionAnswer) => <QuestionAnswerItem {...item} />,
        [],
    );

    const searchFilter = useCallback((item: QuestionAnswer, pattern: string) => {
        return i18n.resolvedLanguage === 'kr'
            ? isHangulMatching(pattern, item.question, ...item.choices)
            : isMatching(pattern, item.question, ...item.choices);
    }, [i18n.resolvedLanguage]);

    return (
        <>
            <Seo {...seoProps(t)} />
            <TitleCard title={t('title', { ns: 'seed39' })} />
            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>
                    <VirtualizedFixedList height={height - 330}
                                          width={'100%'}
                                          items={props.data}
                                          rowSize={mdDown ? 280 : lgDown ? 100 : 70}
                                          divider
                                          searchFilter={searchFilter}
                                          placeholder={t('searchPlaceholder', { ns: 'seed39' })}
                                          rowRenderer={rowRenderer} />
                </CardContent>
            </Card>
            <Comments pageKey={'seed39'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            data: locale === 'kr'
                ? seed39Data.sort((a, b) => a.question.localeCompare(b.question))
                : seed39DataGMS.sort((a, b) => (`${a.question}${a.choices[0]}`).localeCompare(`${b.question}${b.choices[0]}`)),
            ...(await serverSideTranslations(locale, ['common', 'seed39'])),
        },
    };
};

export default Seed39;