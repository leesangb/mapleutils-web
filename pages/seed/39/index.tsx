import {
    Button,
    Card,
    CardContent,
    Checkbox,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useCallback } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import VirtualizedFixedList from '@components/virtualized-list/VirtualizedFixedList';
import { QuestionAnswer, seed39Data, seed39DataGMS } from '@data/seed/39';
import { isHangulMatching, isMatching } from '@tools/string';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { QuestionAnswerItem } from '@components/seed/39';
import { Locales } from '@tools/locales';
import NextLink from 'next/link';
import { Comments } from '@components/comments';
import { useSeed39Store } from '@store/useSeed39Store';

interface Seed39Props {
    data: QuestionAnswer[];
}

const SCREEN_HEIGHT_OFFSET = 330; // magic number ?
const SMALL_SCREEN_ROW_SIZE = 280;
const MEDIUM_SCREEN_ROW_SIZE = 100;
const LARGE_SCREEN_ROW_SIZE = 70;

const Seed39 = (props: Seed39Props) => {
    const { t, i18n } = useTranslation();
    const seoProps = useI18nSeoProps('seed39');
    const { height } = useWindowDimensions();
    const theme = useTheme();
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const { filter, setFilter } = useSeed39Store(state => state);

    const rowRenderer = useCallback(
        (item: QuestionAnswer) => <QuestionAnswerItem {...item} />,
        [],
    );

    const searchFilter = useCallback((item: QuestionAnswer, pattern: string) => {
        const choices = [item.question, ...item.choices].filter((_, i) => filter[i]);
        return i18n.resolvedLanguage === Locales.Korean
            ? isHangulMatching(pattern, ...choices)
            : isMatching(pattern, ...choices);
    }, [i18n.resolvedLanguage, ...filter]);

    return (
        <>
            <Seo {...seoProps} image={'/images/39.png'} />
            <I18nTitleCard ns={'seed39'}>
                <NextLink href={'/seed/39/simulator'} passHref>
                    <Button component={'a'}>
                        {t('goToSeed39Simulator')}
                    </Button>
                </NextLink>
            </I18nTitleCard>

            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>
                    <VirtualizedFixedList height={height - SCREEN_HEIGHT_OFFSET}
                                          width={'100%'}
                                          items={props.data}
                                          rowSize={
                                              mdDown
                                                  ? SMALL_SCREEN_ROW_SIZE
                                                  : lgDown
                                                      ? MEDIUM_SCREEN_ROW_SIZE
                                                      : LARGE_SCREEN_ROW_SIZE
                                          }
                                          divider
                                          searchFilter={searchFilter}
                                          placeholder={t('searchPlaceholder', { ns: 'seed39' })}
                                          rowRenderer={rowRenderer}
                                          optionMenu={
                                              <>
                                                  <Typography
                                                      padding={0.5}>{t('searchFilter', { ns: 'seed39' })}</Typography>
                                                  <List dense sx={{ minWidth: '120px' }}>
                                                      <ListItemButton sx={{ padding: 0 }}
                                                                      onClick={() => setFilter(!filter.every(v => v), 0, 1, 2, 3, 4)}>
                                                          <ListItemIcon>
                                                              <Checkbox checked={filter.every(value => value)}
                                                                        indeterminate={filter.some(value => value) && !filter.every(value => value)}
                                                              />
                                                          </ListItemIcon>
                                                          <ListItemText>
                                                              {t('all', { ns: 'seed39' })}
                                                          </ListItemText>
                                                      </ListItemButton>
                                                      {filter.slice(0).map((value, index) =>
                                                          <ListItemButton key={index} sx={{ padding: 0 }}
                                                                          onClick={() => setFilter(!value, index as 0 | 1 | 2 | 3 | 4)}>
                                                              <ListItemIcon>
                                                                  <Checkbox checked={value} />
                                                              </ListItemIcon>
                                                              <ListItemText>
                                                                  {index === 0 ? t('question', { ns: 'seed39' }) : `${index}`}
                                                              </ListItemText>
                                                          </ListItemButton>,
                                                      )}
                                                  </List>
                                              </>
                                          } />
                </CardContent>
            </Card>
            <Comments pageKey={'seed39'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            data: locale === Locales.Korean
                ? seed39Data.sort((a, b) => a.question.localeCompare(b.question))
                : seed39DataGMS.sort((a, b) => (`${a.question}${a.choices[0]}`).localeCompare(`${b.question}${b.choices[0]}`)),
            ...(await serverSideTranslations(locale, ['common', 'seed39'])),
        },
    };
};

export default Seed39;
