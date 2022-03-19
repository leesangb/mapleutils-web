import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useCallback } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import VirtualizedFixedList from '@components/virtualized-list/VirtualizedFixedList';
import { QuestionAnswer, seed39Data } from '@data/seed/39';
import { isHangulMatching } from '@tools/string';
import { Seo, SeoProps } from '@components/seo';
import { TitleCard } from '@components/card';
import { Comments } from '@components/comments';

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

const seoProps: SeoProps = {
    title: '더 시드 39층',
    keywords: ['39층', '족보', '문제 풀이', '문제', '정답', '퀴즈', '2급', '리레', '웨펖', '웨폰', '시린이'],
    description: '더 시드 39층 문제 풀이, 족보',
    image: '/images/39.png',
};

const Seed39 = (props: Seed39Props) => {
    const { height } = useWindowDimensions();
    const theme = useTheme();
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const rowRenderer = useCallback(
        (item: QuestionAnswer) => <QuestionAnswerItem {...item} />,
        [],
    );

    const searchFilter = useCallback((item: QuestionAnswer, pattern: string) => {
        return isHangulMatching(pattern, item.question, ...item.choices);
    }, []);

    return (
        <>
            <Seo {...seoProps} />
            <TitleCard title={'시드 39층'} showAnalytics />
            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>
                    <VirtualizedFixedList height={height - 330}
                                          width={'100%'}
                                          items={props.data}
                                          rowSize={mdDown ? 280 : lgDown ? 100 : 70}
                                          divider
                                          searchFilter={searchFilter}
                                          placeholder={'문제 또는 답 검색 (예: 골드비치, ㄱㄷㅂㅊ, ...) [Ctrl] + [F] 또는 [F3]으로 포커싱, 초성 검색 ✅'}
                                          rowRenderer={rowRenderer} />
                </CardContent>
            </Card>
            <Comments pageKey={'seed39'} />
        </>
    );
};

export const getStaticProps = () => {
    return {
        props: {
            data: seed39Data.sort((a, b) => a.question.localeCompare(b.question)),
        },
    };
};

export default Seed39;