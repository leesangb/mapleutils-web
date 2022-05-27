import { Card, CardContent, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useCallback } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import VirtualizedFixedList from '@components/virtualized-list/VirtualizedFixedList';
import { QuestionAnswer, seed39Data, seed39DataGMS } from '@data/seed/39';
import { isHangulMatching, isMatching } from '@tools/string';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { Comments } from '@components/comments';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { QuestionAnswerItem } from '@components/seed/39';

interface Seed39Props {
    data: QuestionAnswer[];
}

const Seed39 = (props: Seed39Props) => {
    const { t, i18n } = useTranslation();
    const seoProps = useI18nSeoProps('seed39');
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
            <Seo {...seoProps} image={'/images/39.png'} />
            <I18nTitleCard ns={'seed39'} />
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